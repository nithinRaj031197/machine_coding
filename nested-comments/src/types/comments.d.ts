export interface IComment {
  id: number;
  content: string;
  votes: number;
  timestamp: string;
  replies: IComment[];
}
