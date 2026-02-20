import {   Box, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import type { Movie } from "../../app/model/movie"

type Props = {
    movies: Movie
}



export default function MovieCard({movies}: Props) {

  

  return (
    <Card
       elevation={3}
    >
      <Box component={Link} to={`/home/${movies.id}`}>
        <CardMedia
         sx={{height: 240, backgroundSize: 'cover'}}
         style={{ width: '250px', maxWidth: '100%' }}
         image={movies.pictureUrl}        
        />
      </Box>
      
      <CardContent>
        <Typography
           gutterBottom
          
           variant="subtitle2">
            
        </Typography> 
      </CardContent>
      <CardActions
          sx={{justifyContent: 'space-between'}}
      >
        
      </CardActions>
      <Typography justifyContent='center'>
        {movies.title}      
      </Typography>
        
    </Card>
    
    
  )
}