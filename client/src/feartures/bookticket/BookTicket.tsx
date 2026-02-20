import { useState } from "react";
import { useBookTicketMutation } from "./bookticketApi";
import { Box, Button, Grid, Typography } from "@mui/material";

const rows = ["A","B","C","D","E","F","G","H","I","J"];
const seatsPerRow = 10;


export default function BookTicket() {
const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
const [bookTicket] = useBookTicketMutation();

const generateSeats = () => {
  const seats: {row: string; number: number; status: string} [] = [];
  rows.forEach((row) => {
    for (let i =1; i <= seatsPerRow; i++) {
      seats.push({
        row,
        number: i,
        status: "Available",
      });
    }
  });
  return seats;
};

const [seats] = useState(generateSeats());

const toggleSeat = (seatId: string) => {
  setSelectedSeats((prev) =>
   prev.includes(seatId)
    ? prev.filter((s) => s !== seatId)
    : [...prev, seatId]
  );
};

const handleBooking = async () => {
  if(selectedSeats.length === 0) return;
  try {
    await bookTicket({
      showtimeId: 1,
      seats: selectedSeats,
    }).unwrap();
    alert("Booking successful ✅");
    setSelectedSeats([]);
  } catch {
    alert("Booking failed ❌");
  }
};


  return (
    <Box sx={{p: 4, textAlign: "center"}}>
      <Typography variant="h5" mb={2}>
         ₹183 ELITE
      </Typography>

      <Grid container spacing={1} justifyContent="center">
        {rows.map(row => (
          <Grid key={row} display="flex" justifyContent="center">
            <Typography sx={{width: 20, mr: 1}}>{row}</Typography>
            {seats
            .filter((s) => s.row === row)
            .map((seat) => {
              const seatId = `${seat.row}${seat.number}`;
              const isSelected = selectedSeats.includes(seatId);
              return(
                <Button
                  key={seatId}
                  variant="outlined"
                  size="small"
                  onClick={() => toggleSeat(seatId)}
                  sx={{
                    minWidth: 36,
                    height: 36,
                    m: 0.5,
                    borderRadius: 1,
                    bgcolor: isSelected ? "green" : "white",
                    color: isSelected ? "white" : "black",
                  }}>
                  {seat.number}
                </Button>
              );
            })}
          </Grid>
        ))}
      </Grid>
      <Box mt={4}>
        <Typography>
          Selected Seats: {selectedSeats.join(",") || "None"}
        </Typography>
        <Button
           variant="contained"
           color="primary"
           disabled={selectedSeats.length === 0}
           onClick={handleBooking}
        >
          Proceed to pay ₹{selectedSeats.length * 183}
        </Button>
      </Box>
    </Box>
  );
}