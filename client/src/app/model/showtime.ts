import type { BookTicket } from "./bookticket"

export type ShowTime = {
  id: number
  time: string
  price: number
  status: string
  theatreId: number
  movieId: number
  bookticket: BookTicket[]
}
