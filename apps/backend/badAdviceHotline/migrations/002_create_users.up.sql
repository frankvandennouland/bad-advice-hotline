-- First drop the existing user_id column if it exists
ALTER TABLE advice DROP COLUMN IF EXISTS user_id;

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add user_id to advice table with proper foreign key constraint
ALTER TABLE advice ADD COLUMN user_id UUID REFERENCES users(id);
CREATE INDEX idx_advice_user_id ON advice(user_id); 