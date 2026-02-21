import { useState } from "react";
import { useBookTicketMutation, useFetchBookedSeatsQuery } from "./bookticketApi";
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const rows = ["A","B","C","D","E","F","G","H","I","J"];
const seatsPerRow = 10;

export default function BookTicket() {
  const { id } = useParams();
  const showtimeId = Number(id);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [bookTicket, { isLoading: isBooking }] = useBookTicketMutation();
  const { data: bookedData } = useFetchBookedSeatsQuery(showtimeId);

  const bookedSeats = bookedData?.bookedSeats ?? [];

  const generateSeats = () => {
    const seats: {row: string; number: number}[] = [];
    rows.forEach((row) => {
      for (let i = 1; i <= seatsPerRow; i++) {
        seats.push({ row, number: i });
      }
    });
    return seats;
  };

  const [seats] = useState(generateSeats());

  const toggleSeat = (seatId: string) => {
    if (bookedSeats.includes(seatId)) return;
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  const handleBooking = async () => {
    setConfirmOpen(false);
    try {
      await bookTicket({
        showtimeId,
        seats: selectedSeats,
      }).unwrap();
      toast.success("Booking successful! Enjoy your movie");
      setSelectedSeats([]);
    } catch {
      toast.error("Booking failed. Please try again.");
    }
  };

  return (
    <Box sx={{
      p: 4,
      textAlign: 'center',
      maxWidth: 700,
      mx: 'auto',
      animation: 'fadeInUp 0.5s ease-out',
    }}>
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: 700,
          color: '#F59E0B',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        &#8377;183 ELITE
      </Typography>

      {/* Screen indicator */}
      <Box sx={{
        width: '60%',
        mx: 'auto',
        mb: 4,
        py: 1,
        borderRadius: '4px 4px 50% 50%',
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, rgba(168, 85, 247, 0.3), rgba(168, 85, 247, 0.05))'
            : 'linear-gradient(180deg, rgba(123, 47, 190, 0.2), rgba(123, 47, 190, 0.02))',
        border: (theme) =>
          theme.palette.mode === 'dark'
            ? '1px solid rgba(168, 85, 247, 0.4)'
            : '1px solid rgba(123, 47, 190, 0.3)',
        textAlign: 'center',
      }}>
        <Typography variant="caption" sx={{
          color: 'text.secondary',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontSize: '0.65rem',
        }}>
          Screen
        </Typography>
      </Box>

      <Grid container spacing={1} justifyContent="center">
        {rows.map(row => (
          <Grid key={row} display="flex" justifyContent="center">
            <Typography sx={{
              width: 24,
              mr: 1,
              fontWeight: 700,
              color: 'text.secondary',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
            }}>
              {row}
            </Typography>
            {seats
              .filter((s) => s.row === row)
              .map((seat) => {
                const seatId = `${seat.row}${seat.number}`;
                const isSelected = selectedSeats.includes(seatId);
                const isBooked = bookedSeats.includes(seatId);
                return (
                  <Button
                    key={seatId}
                    variant={isSelected ? "contained" : "outlined"}
                    size="small"
                    disabled={isBooked}
                    onClick={() => toggleSeat(seatId)}
                    sx={{
                      minWidth: 36,
                      height: 36,
                      m: 0.4,
                      borderRadius: '8px 8px 4px 4px',
                      fontWeight: 600,
                      fontSize: '0.7rem',
                      transition: 'all 0.2s ease',
                      ...(isBooked
                        ? {
                            background: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(239, 68, 68, 0.25)'
                                : 'rgba(239, 68, 68, 0.15)',
                            color: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(239, 68, 68, 0.6)'
                                : 'rgba(239, 68, 68, 0.5)',
                            border: '1.5px solid',
                            borderColor: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(239, 68, 68, 0.3)'
                                : 'rgba(239, 68, 68, 0.25)',
                            cursor: 'not-allowed',
                            '&.Mui-disabled': {
                              background: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? 'rgba(239, 68, 68, 0.25)'
                                  : 'rgba(239, 68, 68, 0.15)',
                              color: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? 'rgba(239, 68, 68, 0.6)'
                                  : 'rgba(239, 68, 68, 0.5)',
                              border: '1.5px solid',
                              borderColor: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? 'rgba(239, 68, 68, 0.3)'
                                  : 'rgba(239, 68, 68, 0.25)',
                            },
                          }
                        : isSelected
                        ? {
                            background: 'linear-gradient(135deg, #10B981, #059669)',
                            color: '#fff',
                            border: '1.5px solid #10B981',
                            boxShadow: '0 0 12px rgba(16, 185, 129, 0.4)',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #059669, #047857)',
                              boxShadow: '0 0 16px rgba(16, 185, 129, 0.6)',
                            },
                          }
                        : {
                            bgcolor: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(255, 255, 255, 0.04)'
                                : 'rgba(0, 0, 0, 0.03)',
                            color: 'text.secondary',
                            borderColor: (theme) =>
                              theme.palette.mode === 'dark'
                                ? 'rgba(255, 255, 255, 0.12)'
                                : 'rgba(0, 0, 0, 0.12)',
                            '&:hover': {
                              borderColor: 'primary.light',
                              bgcolor: 'rgba(123, 47, 190, 0.1)',
                              color: 'primary.light',
                            },
                          }
                      ),
                    }}
                  >
                    {seat.number}
                  </Button>
                );
              })}
          </Grid>
        ))}
      </Grid>

      {/* Seat Legend */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 3, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{
            width: 16, height: 16,
            borderRadius: '4px 4px 2px 2px',
            border: '1.5px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.12)'
                : 'rgba(0,0,0,0.12)',
            bgcolor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.04)'
                : 'rgba(0,0,0,0.03)',
          }} />
          <Typography variant="caption" color="text.secondary">Available</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{
            width: 16, height: 16,
            borderRadius: '4px 4px 2px 2px',
            background: 'linear-gradient(135deg, #10B981, #059669)',
          }} />
          <Typography variant="caption" color="text.secondary">Selected</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{
            width: 16, height: 16,
            borderRadius: '4px 4px 2px 2px',
            bgcolor: 'rgba(239, 68, 68, 0.25)',
            border: '1.5px solid rgba(239, 68, 68, 0.3)',
          }} />
          <Typography variant="caption" color="text.secondary">Booked</Typography>
        </Box>
      </Box>

      {/* Summary panel */}
      <Box sx={{
        mt: 3,
        p: 3,
        borderRadius: 3,
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(22, 25, 39, 0.8)'
            : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        border: (theme) =>
          `1px solid ${theme.palette.mode === 'dark'
            ? 'rgba(255,255,255,0.08)'
            : 'rgba(0,0,0,0.08)'}`,
      }}>
        <Typography sx={{ mb: 2, color: 'text.secondary' }}>
          Selected:{' '}
          <Box component="span" sx={{ color: 'primary.light', fontWeight: 600 }}>
            {selectedSeats.join(', ') || 'None'}
          </Box>
        </Typography>
        <Button
          variant="contained"
          disabled={selectedSeats.length === 0}
          onClick={() => setConfirmOpen(true)}
          fullWidth
          sx={{
            py: 1.5,
            fontWeight: 700,
            fontSize: '1rem',
            ...(selectedSeats.length > 0 && {
              background: 'linear-gradient(135deg, #7B2FBE, #A855F7)',
              boxShadow: '0 8px 24px rgba(123, 47, 190, 0.35)',
              '&:hover': {
                background: 'linear-gradient(135deg, #581C87, #7B2FBE)',
                boxShadow: '0 12px 32px rgba(123, 47, 190, 0.5)',
              },
            }),
          }}
        >
          Proceed to pay &#8377;{selectedSeats.length * 183}
        </Button>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        slotProps={{
          paper: {
            sx: { borderRadius: 3, minWidth: 360 },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Confirm Booking</DialogTitle>
        <DialogContent>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Are you sure you want to book the following seats?
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
            {selectedSeats.map((seat) => (
              <Chip
                key={seat}
                label={seat}
                size="small"
                sx={{
                  bgcolor: 'rgba(123, 47, 190, 0.15)',
                  color: 'primary.light',
                  fontWeight: 600,
                }}
              />
            ))}
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Total: &#8377;{selectedSeats.length * 183}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button
            onClick={() => setConfirmOpen(false)}
            variant="outlined"
            sx={{
              borderColor: 'text.secondary',
              color: 'text.secondary',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleBooking}
            variant="contained"
            disabled={isBooking}
            sx={{
              background: 'linear-gradient(135deg, #7B2FBE, #A855F7)',
              '&:hover': {
                background: 'linear-gradient(135deg, #581C87, #7B2FBE)',
              },
            }}
          >
            {isBooking ? 'Booking...' : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
