export interface Game {
  id: string;
  question: string;
  status: 'active' | 'completed';
  created_at: string;
  ends_at: string;
}

export interface Advice {
  id: string;
  game_id: string;
  user_id: string;
  content: string;
  score: number;
  created_at: string;
}

export interface BadAdviceHotlineState {
  currentGame: Game | null;
  advice: Advice[];
  isLoading: boolean;
  error: string | null;
}

export interface CreateGameRequest {
  question: string;
}

export interface SubmitAdviceRequest {
  game_id: string;
  user_id: string;
  content: string;
}
