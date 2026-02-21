import { Box } from "@mui/material"
import MovieCard from "./MovieCard"
import type { Movie } from "../../app/model/movie";

type Props = {
  movie: Movie[];
}

export default function Movielist({movie}: Props) {
  return (
    <Box sx={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 3,
      justifyContent: 'center',
    }}>
      {movie.map((movies, index) => (
        <Box
          key={movies.id}
          sx={{
            animation: 'fadeInUp 0.5s ease-out both',
            animationDelay: `${index * 0.08}s`,
          }}
        >
          <MovieCard movies={movies} />
        </Box>
      ))}
    </Box>
  )
}
