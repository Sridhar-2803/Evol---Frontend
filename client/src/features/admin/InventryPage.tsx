import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useFetchMoviesQuery } from "../home/homeApi";
import { Delete, Edit } from "@mui/icons-material";
import { useState } from "react";
import MovieForm from "./MovieForm";
import type { Movie } from "../../app/model/movie";
import { useDeleteMovieMutation } from "./adminApi";

export default function InventryPage() {
  const {data, refetch} = useFetchMoviesQuery();
  const [editMode, setEditMode] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [deleteMovie] = useDeleteMovieMutation();

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setEditMode(true);
  }

  const handleDeleteMovie = async (id: number) => {
    try {
      await deleteMovie(id);
      refetch();
    } catch {
      // error handled by baseQueryWithErrorHandling
    }
  }

  const shortDesc = (text: string) => text && text.length > 2 ? text.slice(0, 2) + "..." : text;

  if (editMode) return <MovieForm
    setEditMode={setEditMode}
    movie={selectedMovie}
    refetch={refetch}
    setSelectedMovie={setSelectedMovie}
  />

  return (
    <>
      <Box display='flex' justifyContent='space-between' alignItems='center' sx={{ mb: 3 }}>
        <Typography
          variant='h4'
          sx={{
            fontWeight: 700,
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #F1F5F9, #A855F7)'
                : 'linear-gradient(135deg, #1E1B2E, #7B2FBE)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Inventory
        </Typography>
        <Button
          onClick={() => setEditMode(true)}
          size='large'
          variant='contained'
          sx={{
            background: 'linear-gradient(135deg, #7B2FBE, #A855F7)',
            px: 4,
            '&:hover': {
              background: 'linear-gradient(135deg, #581C87, #7B2FBE)',
            },
          }}
        >
          Create
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{
              background: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(123, 47, 190, 0.15)'
                  : 'rgba(123, 47, 190, 0.06)',
            }}>
              <TableCell>#</TableCell>
              <TableCell align="left">Movie</TableCell>
              <TableCell align="right">Director</TableCell>
              <TableCell align="right">Language</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Cast</TableCell>
              <TableCell align="center">Genre</TableCell>
              <TableCell align="center">Location</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.map(movie => (
              <TableRow
                key={movie.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>{movie.id}</TableCell>
                <TableCell align="left">
                  <Box display='flex' alignItems='center'>
                    <img
                      src={movie.pictureUrl}
                      alt={movie.title}
                      style={{ height: 50, marginRight: 20, borderRadius: 6, objectFit: 'cover' }}
                    />
                    <span>{movie.title}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">{movie.director}</TableCell>
                <TableCell align="right">{movie.language}</TableCell>
                <TableCell align="center">{shortDesc(movie.description)}</TableCell>
                <TableCell align="center">{shortDesc(movie.cast)}</TableCell>
                <TableCell align="center">{shortDesc(movie.genre)}</TableCell>
                <TableCell align="center">{movie.location}</TableCell>
                <TableCell align="center">{movie.status}</TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => handleSelectMovie(movie)}
                    startIcon={<Edit />}
                    size="small"
                    sx={{
                      color: 'primary.light',
                      '&:hover': { backgroundColor: 'rgba(123, 47, 190, 0.1)' },
                    }}
                  />
                  <Button
                    onClick={() => handleDeleteMovie(movie.id)}
                    startIcon={<Delete />}
                    color="error"
                    size="small"
                    sx={{
                      '&:hover': { backgroundColor: 'rgba(239, 68, 68, 0.1)' },
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
