import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import type { Theatre } from "../../app/model/theatre";
import { Link, useParams } from "react-router-dom";

type Props = {
  theatres: Theatre;
}

export default function TheatreCard({theatres}: Props) {
  const {id} = useParams();

  return (
    <Card
      elevation={0}
      sx={{
        width: 345,
        maxWidth: '100%',
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
        '&:hover': {
          transform: 'translateY(-6px) scale(1.02)',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 16px 40px rgba(123, 47, 190, 0.3)'
              : '0 16px 40px rgba(0, 0, 0, 0.12)',
          borderColor: 'primary.main',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #7B2FBE, #DC2626, #F59E0B)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        },
        '&:hover::before': {
          opacity: 1,
        },
      }}
    >
      <CardActionArea component={Link} to={`/home/${id}/theatre/${theatres.id}/showtime`}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {theatres.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            {theatres.location}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
