import type { ShowTime } from "./showtime"

export type Movie = {
  id: number
  title: string
  description: string
  language: string
  genre: string
  pictureUrl: string
  director: string
  cast: string
  status: string
  location: string
  rating?: number
  trailerUrl?: string
  showtime: ShowTime[]
}
