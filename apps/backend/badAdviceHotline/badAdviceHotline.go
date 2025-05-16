package badAdviceHotline

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"time"

	"encore.dev/storage/sqldb"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

// Database instance
var db = sqldb.NewDatabase("bad_advice_hotline", sqldb.DatabaseConfig{
	Migrations: "./migrations",
})

// User represents a user in the system
type User struct {
	ID        string    `json:"id"`
	Username  string    `json:"username"`
	Email     string    `json:"email"`
	AvatarURL string    `json:"avatar_url,omitempty"`
	CreatedAt time.Time `json:"created_at"`
}

// Game represents a bad advice game session
type Game struct {
	ID        string    `json:"id"`
	Question  string    `json:"question"`
	Status    string    `json:"status"` // active, completed
	CreatedAt time.Time `json:"created_at"`
	EndsAt    time.Time `json:"ends_at"`
}

// Advice represents a piece of bad advice submitted by a player
type Advice struct {
	ID        string    `json:"id"`
	GameID    string    `json:"game_id"`
	UserID    string    `json:"user_id"`
	Content   string    `json:"content"`
	Score     float64   `json:"score"`
	CreatedAt time.Time `json:"created_at"`
}

// CreateUserRequest represents the request to create a new user
type CreateUserRequest struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

// LoginRequest represents the request to login
type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// LoginResponse represents the response for login
type LoginResponse struct {
	User  *User  `json:"user"`
	Token string `json:"token"`
}

// CreateGameRequest represents the request to create a new game
type CreateGameRequest struct {
	Question string `json:"question"`
}

// SubmitAdviceRequest represents the request to submit advice
type SubmitAdviceRequest struct {
	GameID  string `json:"game_id"`
	UserID  string `json:"user_id"`
	Content string `json:"content"`
}

// ScoreAdviceRequest represents the request to score advice
type ScoreAdviceRequest struct {
	GameID   string `json:"game_id"`
	AdviceID string `json:"advice_id"`
}

// GetGameResponse represents the response for getting a game
type GetGameResponse struct {
	Game   *Game     `json:"game"`
	Advice []*Advice `json:"advice"`
}

// GetTopAdviceResponse represents the response for getting top advice
type GetTopAdviceResponse struct {
	Advice []*Advice `json:"advice"`
}

// AIScoreResponse represents the response from the AI scoring service
type AIScoreResponse struct {
	Score           float64 `json:"score"`
	Explanation     string  `json:"explanation"`
	HumorRating     float64 `json:"humor_rating"`
	BadAdviceRating float64 `json:"bad_advice_rating"`
}

// CreateUser creates a new user
//
//encore:api public method=POST path=/bad-advice-hotline/users
func CreateUser(ctx context.Context, req *CreateUserRequest) (*User, error) {
	if req.Username == "" || req.Email == "" || req.Password == "" {
		return nil, errors.New("username, email, and password are required")
	}

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, fmt.Errorf("failed to hash password: %v", err)
	}

	user := &User{
		ID:        uuid.New().String(),
		Username:  req.Username,
		Email:     req.Email,
		CreatedAt: time.Now(),
	}

	_, err = db.Exec(ctx, `
		INSERT INTO users (id, username, email, password_hash, created_at)
		VALUES ($1, $2, $3, $4, $5)
	`, user.ID, user.Username, user.Email, string(hashedPassword), user.CreatedAt)
	if err != nil {
		return nil, fmt.Errorf("failed to create user: %v", err)
	}

	return user, nil
}

// Login authenticates a user
//
//encore:api public method=POST path=/bad-advice-hotline/login
func Login(ctx context.Context, req *LoginRequest) (*LoginResponse, error) {
	if req.Email == "" || req.Password == "" {
		return nil, errors.New("email and password are required")
	}

	var user User
	var passwordHash string
	err := db.QueryRow(ctx, `
		SELECT id, username, email, password_hash, created_at
		FROM users
		WHERE email = $1
	`, req.Email).Scan(&user.ID, &user.Username, &user.Email, &passwordHash, &user.CreatedAt)
	if err != nil {
		return nil, errors.New("invalid email or password")
	}

	// Compare passwords
	err = bcrypt.CompareHashAndPassword([]byte(passwordHash), []byte(req.Password))
	if err != nil {
		return nil, errors.New("invalid email or password")
	}

	// Generate a simple token (in production, use a proper JWT)
	token := uuid.New().String()

	return &LoginResponse{
		User:  &user,
		Token: token,
	}, nil
}

// CreateGame creates a new game session
//
//encore:api public method=POST path=/bad-advice-hotline/games
func CreateGame(ctx context.Context, req *CreateGameRequest) (*Game, error) {
	if req.Question == "" {
		return nil, errors.New("question is required")
	}

	game := &Game{
		ID:        uuid.New().String(),
		Question:  req.Question,
		Status:    "active",
		CreatedAt: time.Now(),
		EndsAt:    time.Now().Add(24 * time.Hour),
	}

	_, err := db.Exec(ctx, `
		INSERT INTO games (id, question, status, created_at, ends_at)
		VALUES ($1, $2, $3, $4, $5)
	`, game.ID, game.Question, game.Status, game.CreatedAt, game.EndsAt)
	if err != nil {
		return nil, err
	}

	return game, nil
}

// GetGame retrieves a game session and its associated advice
//
//encore:api public method=GET path=/bad-advice-hotline/games/:id
func GetGame(ctx context.Context, id string) (*GetGameResponse, error) {
	var game Game
	err := db.QueryRow(ctx, `
		SELECT id, question, status, created_at, ends_at
		FROM games
		WHERE id = $1
	`, id).Scan(&game.ID, &game.Question, &game.Status, &game.CreatedAt, &game.EndsAt)
	if err != nil {
		return nil, err
	}

	// Check if game has expired
	if game.Status == "active" && time.Now().After(game.EndsAt) {
		game.Status = "completed"
		_, err = db.Exec(ctx, `
			UPDATE games
			SET status = 'completed'
			WHERE id = $1
		`, game.ID)
		if err != nil {
			return nil, err
		}
	}

	rows, err := db.Query(ctx, `
		SELECT id, game_id, user_id, content, score, created_at
		FROM advice
		WHERE game_id = $1
		ORDER BY score DESC, created_at DESC
	`, id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var advice []*Advice
	for rows.Next() {
		var a Advice
		err := rows.Scan(&a.ID, &a.GameID, &a.UserID, &a.Content, &a.Score, &a.CreatedAt)
		if err != nil {
			return nil, err
		}
		advice = append(advice, &a)
	}

	return &GetGameResponse{
		Game:   &game,
		Advice: advice,
	}, nil
}

// SubmitAdvice submits a new piece of advice for a game
//
//encore:api public method=POST path=/bad-advice-hotline/games/:gameID/advice
func SubmitAdvice(ctx context.Context, gameID string, req *SubmitAdviceRequest) (*Advice, error) {
	// Check if game exists and is active
	var status string
	err := db.QueryRow(ctx, `
		SELECT status
		FROM games
		WHERE id = $1
	`, gameID).Scan(&status)
	if err != nil {
		return nil, errors.New("game not found")
	}
	if status != "active" {
		return nil, errors.New("game is not active")
	}

	advice := &Advice{
		ID:        uuid.New().String(),
		GameID:    gameID,
		UserID:    req.UserID,
		Content:   req.Content,
		Score:     0,
		CreatedAt: time.Now(),
	}

	_, err = db.Exec(ctx, `
		INSERT INTO advice (id, game_id, user_id, content, score, created_at)
		VALUES ($1, $2, $3, $4, $5, $6)
	`, advice.ID, advice.GameID, advice.UserID, advice.Content, advice.Score, advice.CreatedAt)
	if err != nil {
		return nil, err
	}

	return advice, nil
}

// ScoreAdvice scores a piece of advice using AI
//
//encore:api public method=POST path=/bad-advice-hotline/games/:gameID/advice/:adviceID/score
func ScoreAdvice(ctx context.Context, gameID string, adviceID string) (*Advice, error) {
	// Check if game exists and is active
	var status string
	err := db.QueryRow(ctx, `
		SELECT status
		FROM games
		WHERE id = $1
	`, gameID).Scan(&status)
	if err != nil {
		return nil, errors.New("game not found")
	}
	if status != "active" {
		return nil, errors.New("game is not active")
	}

	// Get the advice content and game question
	var advice Advice
	var question string
	err = db.QueryRow(ctx, `
		SELECT a.id, a.game_id, a.user_id, a.content, a.score, a.created_at, g.question
		FROM advice a
		JOIN games g ON a.game_id = g.id
		WHERE a.id = $1 AND a.game_id = $2
	`, adviceID, gameID).Scan(&advice.ID, &advice.GameID, &advice.UserID, &advice.Content, &advice.Score, &advice.CreatedAt, &question)
	if err != nil {
		return nil, err
	}

	// Get AI score
	score, err := getAIScore(advice.Content, question)
	if err != nil {
		return nil, fmt.Errorf("failed to get AI score: %v", err)
	}

	// Update the advice with the AI score
	err = db.QueryRow(ctx, `
		UPDATE advice
		SET score = $1
		WHERE id = $2 AND game_id = $3
		RETURNING id, game_id, user_id, content, score, created_at
	`, score.Score, adviceID, gameID).Scan(&advice.ID, &advice.GameID, &advice.UserID, &advice.Content, &advice.Score, &advice.CreatedAt)
	if err != nil {
		return nil, err
	}

	return &advice, nil
}

var secrets struct {
	OpenAIAPIKey string
}

// getAIScore gets a score from the AI service
func getAIScore(advice string, question string) (*AIScoreResponse, error) {
	apiKey := secrets.OpenAIAPIKey
	if apiKey == "" {
		return nil, errors.New("OPENAI_API_KEY environment variable not set")
	}

	// Create the prompt for the AI
	prompt := fmt.Sprintf(`Rate this bad advice on a scale of 0-10:

Question: %s
Advice: %s

Please provide:
1. A score from 0-10 (where 10 is the worst possible advice)
2. A brief explanation
3. A humor rating from 0-10
4. A "bad advice" rating from 0-10

Format the response as JSON with these fields:
- score (number)
- explanation (string)
- humor_rating (number)
- bad_advice_rating (number)`, question, advice)

	// Create the request to OpenAI
	reqBody := map[string]interface{}{
		"model": "gpt-4",
		"messages": []map[string]string{
			{
				"role":    "system",
				"content": "You are an expert at rating bad advice. You should be harsh but fair in your ratings. you are also sassy and fun you can roast them",
			},
			{
				"role":    "user",
				"content": prompt,
			},
		},
		"temperature": 0.7,
	}

	jsonData, err := json.Marshal(reqBody)
	if err != nil {
		return nil, err
	}

	// Make the request to OpenAI
	req, err := http.NewRequest("POST", "https://api.openai.com/v1/chat/completions", bytes.NewBuffer(jsonData))
	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+apiKey)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("OpenAI API returned status code %d", resp.StatusCode)
	}

	var result struct {
		Choices []struct {
			Message struct {
				Content string `json:"content"`
			} `json:"message"`
		} `json:"choices"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, err
	}

	if len(result.Choices) == 0 {
		return nil, errors.New("no response from OpenAI")
	}

	// Parse the AI's response
	var aiScore AIScoreResponse
	if err := json.Unmarshal([]byte(result.Choices[0].Message.Content), &aiScore); err != nil {
		return nil, fmt.Errorf("failed to parse AI response: %v", err)
	}

	return &aiScore, nil
}

// GetTopAdvice gets the top advice for a game
//
//encore:api public method=GET path=/bad-advice-hotline/games/:gameID/top-advice
func GetTopAdvice(ctx context.Context, gameID string) (*GetTopAdviceResponse, error) {
	rows, err := db.Query(ctx, `
		SELECT id, game_id, user_id, content, score, created_at
		FROM advice
		WHERE game_id = $1
		ORDER BY score DESC
		LIMIT 5
	`, gameID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var advice []*Advice
	for rows.Next() {
		var a Advice
		err := rows.Scan(&a.ID, &a.GameID, &a.UserID, &a.Content, &a.Score, &a.CreatedAt)
		if err != nil {
			return nil, err
		}
		advice = append(advice, &a)
	}

	return &GetTopAdviceResponse{
		Advice: advice,
	}, nil
}
