import { useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Box, Button, Chip, Dialog, DialogContent, Divider, Grid, IconButton, Rating, Skeleton, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { Close, PlayArrow, Star } from "@mui/icons-material";
import { useFetchMovieDetailsQuery } from "./homeApi";

export default function MovieDetails() {
  const {id} = useParams();
  const {data: movie, isLoading} = useFetchMovieDetailsQuery(id ? +id : 0)
  const [trailerOpen, setTrailerOpen] = useState(false);

  if (!movie || isLoading) return (
    <Grid container spacing={6} maxWidth='lg' sx={{ mx: 'auto' }}>
      <Grid size={4}>
        <Skeleton variant="rectangular" height={450} sx={{ borderRadius: 4 }} animation="wave" />
      </Grid>
      <Grid size={6}>
        <Skeleton variant="text" width="60%" height={56} sx={{ mb: 2 }} animation="wave" />
        <Skeleton variant="text" width="100%" sx={{ mb: 1 }} animation="wave" />
        <Skeleton variant="text" width="100%" sx={{ mb: 1 }} animation="wave" />
        <Skeleton variant="text" width="100%" sx={{ mb: 1 }} animation="wave" />
        <Skeleton variant="text" width="100%" sx={{ mb: 1 }} animation="wave" />
        <Skeleton variant="text" width="100%" sx={{ mb: 1 }} animation="wave" />
        <Skeleton variant="text" width="80%" sx={{ mb: 3 }} animation="wave" />
        <Skeleton variant="rectangular" width="50%" height={55} sx={{ borderRadius: 3 }} animation="wave" />
      </Grid>
    </Grid>
  )

  const movieDetails = [
    {label: 'Cast', value: movie.cast},
    {label: 'Director', value: movie.director},
    {label: 'Genre', value: movie.genre},
    {label: 'Description', value: movie.description},
    {label: 'Language', value: movie.language},
    {label: 'Status', value: movie.status},
  ]

  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?/]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : url;
  };

  return (
    <>
      <Grid container spacing={6} maxWidth='lg' sx={{ mx: 'auto', animation: 'fadeInUp 0.5s ease-out' }}>
        <Grid size={4}>
          <img
            src={movie?.pictureUrl}
            alt={movie.title}
            style={{
              width: '100%',
              borderRadius: '16px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
            }}
          />
        </Grid>
        <Grid size={6}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 1,
              background: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, #F1F5F9, #A855F7)'
                  : 'linear-gradient(135deg, #1E1B2E, #7B2FBE)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {movie.title}
          </Typography>

          {/* Rating + Genre */}
          <Box display="flex" alignItems="center" gap={1.5} mb={1.5}>
            {movie.rating != null && (
              <Box display="flex" alignItems="center" gap={0.5}>
                <Rating
                  value={movie.rating / 2}
                  precision={0.5}
                  readOnly
                  emptyIcon={<Star fontSize="inherit" sx={{ color: 'text.disabled' }} />}
                  sx={{ '& .MuiRating-iconFilled': { color: '#F59E0B' } }}
                />
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#F59E0B' }}>
                  {movie.rating.toFixed(1)}
                </Typography>
              </Box>
            )}
            {movie.genre && (
              <Chip
                label={movie.genre}
                size="small"
                sx={{
                  bgcolor: 'rgba(123, 47, 190, 0.15)',
                  color: 'primary.light',
                  fontWeight: 600,
                }}
              />
            )}
          </Box>

          <Divider sx={{ mb: 2, borderImage: 'linear-gradient(90deg, #7B2FBE, transparent) 1' }} />
          <TableContainer sx={{ background: 'transparent', backdropFilter: 'none', border: 'none' }}>
            <Table>
              <TableBody>
                {movieDetails.map((detail, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{
                      fontWeight: 700,
                      color: 'primary.light',
                      borderColor: 'transparent',
                      whiteSpace: 'nowrap',
                      width: '120px',
                    }}>
                      {detail.label}
                    </TableCell>
                    <TableCell sx={{
                      color: 'text.secondary',
                      borderColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(255,255,255,0.04)'
                          : 'rgba(0,0,0,0.04)',
                    }}>
                      {detail.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container spacing={2} marginTop={3}>
            <Grid size={6}>
              <Box component={Link} to={`/home/${movie.id}/theatre`}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    height: '55px',
                    background: 'linear-gradient(135deg, #DC2626, #991B1B)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1rem',
                    letterSpacing: '0.05em',
                    borderRadius: 3,
                    boxShadow: '0 8px 24px rgba(220, 38, 38, 0.35)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #EF4444, #B91C1C)',
                      boxShadow: '0 12px 32px rgba(220, 38, 38, 0.5)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Book Ticket
                </Button>
              </Box>
            </Grid>
            {movie.trailerUrl && (
              <Grid size={6}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<PlayArrow />}
                  onClick={() => setTrailerOpen(true)}
                  sx={{
                    height: '55px',
                    background: 'linear-gradient(135deg, #7B2FBE, #A855F7)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1rem',
                    letterSpacing: '0.05em',
                    borderRadius: 3,
                    boxShadow: '0 8px 24px rgba(123, 47, 190, 0.35)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #581C87, #7B2FBE)',
                      boxShadow: '0 12px 32px rgba(123, 47, 190, 0.5)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Watch Trailer
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

      {/* Trailer Modal */}
      {movie.trailerUrl && (
        <Dialog
          open={trailerOpen}
          onClose={() => setTrailerOpen(false)}
          maxWidth="md"
          fullWidth
          slotProps={{
            paper: {
              sx: {
                bgcolor: '#000',
                borderRadius: 3,
                overflow: 'hidden',
              },
            },
          }}
        >
          <IconButton
            onClick={() => setTrailerOpen(false)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 1,
              color: '#fff',
              bgcolor: 'rgba(0,0,0,0.5)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
            }}
          >
            <Close />
          </IconButton>
          <DialogContent sx={{ p: 0 }}>
            <Box sx={{ position: 'relative', width: '100%', pt: '56.25%' }}>
              <iframe
                src={getYouTubeEmbedUrl(movie.trailerUrl)}
                title={`${movie.title} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
              />
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
