CREATE TABLE games (
    id TEXT PRIMARY KEY,
    question TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    ends_at TIMESTAMP NOT NULL
);

CREATE TABLE advice (
    id TEXT PRIMARY KEY,
    game_id TEXT NOT NULL REFERENCES games(id),
    user_id TEXT NOT NULL,
    content TEXT NOT NULL,
    score FLOAT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL
);

CREATE INDEX idx_advice_game_id ON advice(game_id);
CREATE INDEX idx_advice_user_id ON advice(user_id); 