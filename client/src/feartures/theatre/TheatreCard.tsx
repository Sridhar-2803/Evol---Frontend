import {  Card, CardActionArea, CardContent, Typography } from "@mui/material";
import type { Theatre } from "../../app/model/theatre";
import { Link, useParams } from "react-router-dom";

type Props = {
  theatres: Theatre;
}

export default function TheatreCard({theatres}: Props) {

  const {id} = useParams();

  

  

  

  return (
    <Card  sx={{
    maxWidth: 345,
    borderRadius: 4,
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
    transition: "0.3s",
    "&:hover": {
      boxShadow: "0 16px 32px rgba(0,0,0,0.3)",
      transform: "scale(1.02)",
    },
  }} elevation={3}>

    
      <CardActionArea component={Link} to={`/home/${id}/theatre/${theatres.id}/showtime`}>
      <CardContent>
        <Typography variant="h6" justifyContent='center'>
          {theatres.name}
        </Typography>
        <Typography variant="body2" justifyContent='center'>
          {theatres.location}
        </Typography>
      </CardContent>
      </CardActionArea>
    

    
    </Card>
  )
}