import { Box } from "@mui/material"
import MovieCard from "./MovieCard"
import type { Movie } from "../../app/model/movie";

type Props = {
    movie : Movie[];
}

export default function Movielist({movie}: Props) {
  return (
    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center'}}>
        {movie.map(movies => (
           <MovieCard movies={movies} />
        ))}
    </Box>
  )
}