import type { ShowTime } from "./showtime"

export type Theatre = {
  id: number
  name: string
  location: string
  showtime: ShowTime[]
}

