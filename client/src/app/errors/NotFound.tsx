import { SearchOff } from "@mui/icons-material";
import { Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Paper
      sx={{
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 6,
        borderRadius: 4,
        textAlign: 'center',
        animation: 'fadeInUp 0.5s ease-out',
      }}
    >
      <SearchOff sx={{ fontSize: 100, color: 'primary.light', opacity: 0.7, mb: 2 }} />
      <Typography gutterBottom variant="h4" sx={{ fontWeight: 700 }}>
        Oops - we could not find what you were looking for
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
        The page you requested doesn't exist or has been moved.
      </Typography>
      <Button
        component={Link}
        to='/home'
        variant="contained"
        sx={{
          background: 'linear-gradient(135deg, #7B2FBE, #A855F7)',
          px: 4,
          py: 1.5,
          '&:hover': {
            background: 'linear-gradient(135deg, #581C87, #7B2FBE)',
          },
        }}
      >
        Back to Movies
      </Button>
    </Paper>
  )
}
