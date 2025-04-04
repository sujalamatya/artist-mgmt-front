export interface Event {
  id: number;
  artist_id: number;
  user_id: number;
  title: string;
  description?: string;
  event_date: string;
  location?: string;
}
