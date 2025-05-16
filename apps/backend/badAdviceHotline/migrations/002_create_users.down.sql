-- Drop the user_id column and its index
ALTER TABLE advice DROP COLUMN IF EXISTS user_id;
DROP INDEX IF EXISTS idx_advice_user_id;

-- Drop users table
DROP TABLE IF EXISTS users; 