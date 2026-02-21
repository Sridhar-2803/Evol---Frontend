import { Box, Card, CardContent, CardMedia, Rating, Typography } from "@mui/material"
import { Star } from "@mui/icons-material"
import { Link } from "react-router-dom"
import type { Movie } from "../../app/model/movie"

type Props = {
  movies: Movie
}

export default function MovieCard({movies}: Props) {
  return (
    <Card
      elevation={0}
      sx={{
        width: 250,
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 20px 40px rgba(123, 47, 190, 0.25)'
              : '0 20px 40px rgba(0, 0, 0, 0.15)',
          '& .MuiCardMedia-root': {
            transform: 'scale(1.05)',
          },
          '& .movie-overlay': {
            opacity: 1,
          },
        },
      }}
    >
      <Box
        component={Link}
        to={`/home/${movies.id}`}
        sx={{ display: 'block', position: 'relative', overflow: 'hidden' }}
      >
        <CardMedia
          sx={{
            height: 340,
            backgroundSize: 'cover',
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          image={movies.pictureUrl}
        />
        <Box
          className="movie-overlay"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
            opacity: 0,
            transition: 'opacity 0.4s ease',
            display: 'flex',
            alignItems: 'flex-end',
            p: 2,
          }}
        >
          <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 600 }}>
            View Details
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ py: 1.5, px: 2 }}>
        <Typography
          variant="subtitle2"
          textAlign="center"
          sx={{
            fontWeight: 600,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {movies.title}
        </Typography>
        {movies.rating != null && (
          <Box display="flex" alignItems="center" justifyContent="center" gap={0.5} mt={0.5}>
            <Rating
              value={movies.rating / 2}
              precision={0.5}
              readOnly
              size="small"
              emptyIcon={<Star fontSize="inherit" sx={{ color: 'text.disabled' }} />}
              sx={{
                '& .MuiRating-iconFilled': { color: '#F59E0B' },
              }}
            />
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#F59E0B' }}>
              {movies.rating.toFixed(1)}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}
