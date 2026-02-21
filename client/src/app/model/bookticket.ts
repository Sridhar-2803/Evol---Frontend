export type BookTicket = {
    id: number
    showtimeId: number
    seatnumber: string
}

export type UserBooking = {
    id: number
    movieTitle: string
    theatreName: string
    showTime: string
    seats: string[]
    totalPrice: number
    bookedAt: string
}