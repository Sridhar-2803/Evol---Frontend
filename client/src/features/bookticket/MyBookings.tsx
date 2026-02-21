import { Box, Button, Card, CardContent, Chip, Skeleton, Typography } from "@mui/material";
import { ConfirmationNumber, EventSeat } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useFetchUserBookingsQuery } from "./bookticketApi";

export default function MyBookings() {
  const { data: bookings, isLoading } = useFetchUserBookingsQuery();

  if (isLoading) return (
    <Box sx={{ maxWidth: 800, mx: 'auto', animation: 'fadeInUp 0.5s ease-out' }}>
      <Skeleton variant="text" width={240} height={48} sx={{ mb: 3, borderRadius: 2 }} animation="wave" />
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} variant="rectangular" height={140} sx={{ mb: 2, borderRadius: 3 }} animation="wave" />
      ))}
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', animation: 'fadeInUp 0.5s ease-out' }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 700,
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #F1F5F9, #A855F7)'
              : 'linear-gradient(135deg, #1E1B2E, #7B2FBE)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        My Bookings
      </Typography>

      {!bookings || bookings.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <ConfirmationNumber sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            No bookings yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Book your first movie and it will appear here
          </Typography>
          <Button
            component={Link}
            to="/home"
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #7B2FBE, #A855F7)',
              '&:hover': {
                background: 'linear-gradient(135deg, #581C87, #7B2FBE)',
              },
            }}
          >
            Browse Movies
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {bookings.map((booking) => (
            <Card
              key={booking.id}
              elevation={0}
              sx={{
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: (theme) =>
                    theme.palette.mode === 'dark'
                      ? '0 8px 24px rgba(123, 47, 190, 0.2)'
                      : '0 8px 24px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap={2}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {booking.movieTitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {booking.theatreName} &bull; {booking.showTime}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={0.5} flexWrap="wrap">
                      <EventSeat sx={{ fontSize: 16, color: 'primary.light' }} />
                      {booking.seats.map((seat) => (
                        <Chip
                          key={seat}
                          label={seat}
                          size="small"
                          sx={{
                            bgcolor: 'rgba(123, 47, 190, 0.12)',
                            color: 'primary.light',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#F59E0B' }}>
                      &#8377;{booking.totalPrice}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(booking.bookedAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}
