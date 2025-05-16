export interface User {
  id: string;
  username: string;
  email: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
  games: Game[];
}

export interface Game {
  id: string;
  question: string;
  status: 'active' | 'completed';
  created_at: string;
  ends_at: string;
  advice: Advice[];
}

export interface Advice {
  id: string;
  game_id: string;
  user_id: string;
  content: string;
  created_at: string;
  ai_score?: number;
  ai_feedback?: string;
}

export interface BadAdviceHotlineState {
  currentGame: Game | null;
  advice: Advice[];
  isLoading: boolean;
  error: string | null;
  currentUser: User | null;
  token: string | null;
}

export interface CreateGameRequest {
  question: string;
}

export interface SubmitAdviceRequest {
  game_id: string;
  user_id: string;
  content: string;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
}

export interface CreateUserResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface AiScoreResponse {
  score: number;
  feedback: string;
}
