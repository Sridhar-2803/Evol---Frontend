import { Box } from "@mui/material";
import type { Theatre } from "../../app/model/theatre"
import TheatreCard from "./TheatreCard";

type Props = {
  theatre: Theatre[];
}



export default function TheatreList({theatre}: Props) {



  return (
    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 3}}>
      {theatre.map(theatres => (
        <TheatreCard theatres={theatres} />
      ))}
    </Box>
  )
}