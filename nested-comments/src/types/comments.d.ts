export interface Comment {
  id: number;
  content: string;
  votes: number;
  timestamp: string;
  replies: Comment[];
}
