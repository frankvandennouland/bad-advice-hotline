CREATE TABLE games (
    id UUID PRIMARY KEY,
    question TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('active', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ends_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE advice (
    id UUID PRIMARY KEY,
    game_id UUID NOT NULL REFERENCES games(id),
    user_id TEXT NOT NULL,
    content TEXT NOT NULL,
    score FLOAT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE INDEX idx_advice_game_id ON advice(game_id);
CREATE INDEX idx_advice_user_id ON advice(user_id);
CREATE INDEX idx_games_status ON games(status); 