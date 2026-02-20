import { Box, Card, CardActionArea, CardContent, Chip, Grid, Typography } from "@mui/material";
import { useFetchShowTimesQuery } from "../home/homeApi"
import { Link, useParams } from "react-router-dom";
import { formatShowTime } from "../../library/date";


export default function ShowTime() {

const {id} = useParams();

const {data , isLoading} = useFetchShowTimesQuery();

if (!data || isLoading) return <div>Loading...</div>
console.log(data)
  return (
    <Grid>
      <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 3}}>
        {data.map(st => (
          <Grid>
            <Card sx={{
    maxWidth: 345,
    borderRadius: 4,
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
    transition: "0.3s",
    ...(st.status !== "Full" && {
    "&:hover": {
      boxShadow: "0 16px 32px rgba(0,0,0,0.3)",
      transform: "scale(1.02)",      
    },
  }),
  }} elevation={3}>

      <Box>
        <CardActionArea component={Link} to={`/home/${id}/theatre/${id}/showtime/${st.id}/bookticket`} disabled={st.status == "Full"}>
          <CardContent>
            <Typography variant="h6" justifyContent='center'>
               {formatShowTime(st.time)}
            
            </Typography>
            <Chip 
            label={st.status}
            color={
              st.status == "Available"
              ? "success"
              : st.status == "Fast"
              ? "warning"
              : "error"
            } 
            sx={{mt:1}}
            />
          </CardContent>
        </CardActionArea>
      </Box>

            </Card>
          </Grid>
        ))}
      </Box>
    </Grid>
  )
}