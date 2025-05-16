# Bad Advice Hotline Microservice

This is a Go microservice built with Encore for the Bad Advice Hotline application. It provides endpoints for managing games and advice submissions.

## Prerequisites

- Go 1.21 or later
- Encore CLI
- PostgreSQL database

## Setup

1. Install Encore CLI:

   ```bash
   curl -L https://encore.dev/install.sh | bash
   ```

2. Install dependencies:

   ```bash
   go mod tidy
   ```

3. Configure your database:
   - Create a PostgreSQL database
   - Update the database configuration in `encore.app` if needed

## API Endpoints

### Games

- `POST /games` - Create a new game

  ```json
  {
    "question": "How do I get my cat to stop scratching the furniture?"
  }
  ```

- `GET /games/:id` - Get a game and its advice
  - Returns the game details and all submitted advice

### Advice

- `POST /games/:gameID/advice` - Submit new advice

  ```json
  {
    "user_id": "user-1",
    "content": "Just let them scratch everything, it's their house now."
  }
  ```

- `POST /games/:gameID/advice/:adviceID/score` - Score advice
  - Generates a random score between 0 and 10

## Development

1. Start the development server:

   ```bash
   encore run
   ```

2. Run tests:

   ```bash
   encore test
   ```

3. Deploy:
   ```bash
   encore deploy
   ```

## Database Schema

### Games Table

- `id` (TEXT) - Primary key
- `question` (TEXT) - The game's question
- `status` (TEXT) - Game status (active/completed)
- `created_at` (TIMESTAMP) - Creation timestamp
- `ends_at` (TIMESTAMP) - Game end timestamp

### Advice Table

- `id` (TEXT) - Primary key
- `game_id` (TEXT) - Foreign key to games
- `user_id` (TEXT) - User identifier
- `content` (TEXT) - The advice content
- `score` (DOUBLE) - Advice score
- `created_at` (TIMESTAMP) - Creation timestamp

## License

MIT
