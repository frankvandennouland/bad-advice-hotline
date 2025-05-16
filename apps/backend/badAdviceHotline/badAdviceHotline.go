package badAdviceHotline

import (
	"context"
	"errors"
	"math/rand"
	"time"

	"encore.dev/storage/sqldb"
	"github.com/google/uuid"
)

// Database instance
var db = sqldb.NewDatabase("bad_advice_hotline", sqldb.DatabaseConfig{
	Migrations: "./migrations",
})

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

// ScoreAdvice scores a piece of advice
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

	// Generate a random score between 0 and 10
	score := float64(rand.Intn(100)) / 10.0

	var advice Advice
	err = db.QueryRow(ctx, `
		UPDATE advice
		SET score = $1
		WHERE id = $2 AND game_id = $3
		RETURNING id, game_id, user_id, content, score, created_at
	`, score, adviceID, gameID).Scan(&advice.ID, &advice.GameID, &advice.UserID, &advice.Content, &advice.Score, &advice.CreatedAt)
	if err != nil {
		return nil, err
	}

	return &advice, nil
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
