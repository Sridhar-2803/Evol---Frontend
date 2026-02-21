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

    const shortDesc = (text: string) => text && text.length > 2 ? text.slice(0,2) + "..." : text;

    if (editMode) return <MovieForm  
                        setEditMode={setEditMode} 
                        movie={selectedMovie}
                        refetch={refetch}
                        setSelectedMovie={setSelectedMovie}
                        />
    
  return (
    <>
        <Box display='flex' justifyContent='space-between'>
            <Typography sx={{p: 2}} variant='h4'>Inventory</Typography>
            <Button onClick={() => setEditMode(true)} sx={{m: 2}} size='large' variant='contained'>Create</Button>
        </Box>
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}}>
                <TableHead>
                    <TableRow>
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
                            sx={{
                                '&:last-child td, &:last-child th': {border: 0}
                            }}
                        >
                            <TableCell component='th' scope='row'>
                                {movie.id}
                            </TableCell>
                            <TableCell align="left">
                                <Box display='flex' alignItems='center'>
                                    <img
                                        src={movie.pictureUrl}
                                        alt={movie.title}
                                        style={{height: 50, marginRight: 20}}
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
                                <Button onClick={() => handleSelectMovie(movie)} startIcon={<Edit />}/>
                                <Button onClick={() => handleDeleteMovie(movie.id)} startIcon={<Delete />} color="error"/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
  )
}