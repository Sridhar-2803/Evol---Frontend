import { Link, useParams } from "react-router-dom"
import { Box, Button, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useFetchMovieDetailsQuery } from "./homeApi";

export default function MovieDetails() {

  const {id} = useParams();

 
 
  const {data: movie, isLoading} = useFetchMovieDetailsQuery(id ? +id : 0)

 

  if(!movie || isLoading) return <div>Loading...</div>

  const movieDetails = [
    {label: 'Cast', value: movie.cast},
    {label: 'Director', value: movie.director},
    {label: 'Genre', value: movie.genre},
    {label: 'Description', value: movie.description},
    {label: 'Language', value: movie.language},
    {label: 'Status', value: movie.status},
    
    
  ]

  return (  
    
    <Grid container spacing={6} maxWidth='lg' sx={{mx: 'auto'}}>
      <Grid size={4}>
        <img src={movie?.pictureUrl} alt={movie.title} style={{width: '100%'}} />
      </Grid>
      <Grid size={6}>
        <Typography variant="h3">{movie.title}</Typography>
        <Divider sx={{mb: 2}}/>
        <TableContainer>
          <Table>
            <TableBody>
              {movieDetails.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell sx={{fontWeight: 'bold'}}>{detail.label}</TableCell>
                  <TableCell>{detail.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid  container spacing={2} marginTop={3}>
          
          <Grid size={6}>
            <Box component={Link} to={`/home/${movie.id}/theatre`}>
            <Button
              sx={{ backgroundColor: '#A52A2A',
                height: '55px',
                color: '#fff',
                justifyContent: 'center',
                '&:hover': {
                 backgroundColor: '#8B0000'}}}
                  variant="contained"
                  fullWidth
              
              >
                Book Ticket
              </Button>
               </Box>
          </Grid>
         
        </Grid>
      </Grid>
    </Grid>
    
  )
}