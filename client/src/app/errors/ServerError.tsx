import { Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom"

export default function ServerError() {
  const {state} = useLocation();

  return (
    <Paper sx={{
      borderRadius: 4,
      overflow: 'hidden',
      animation: 'fadeInUp 0.5s ease-out',
    }}>
      {state.error ? (
        <>
          <Typography
            gutterBottom
            variant="h4"
            sx={{ px: 4, pt: 3, fontWeight: 700, color: 'error.main' }}
          >
            {state.error.title}
          </Typography>
          <Divider sx={{ borderImage: 'linear-gradient(90deg, #DC2626, transparent) 1' }} />
          <Typography variant="body1" sx={{ p: 4, color: 'text.secondary', lineHeight: 1.8 }}>
            {state.error.detail}
          </Typography>
        </>
      ) : (
        <Typography variant="h5" gutterBottom sx={{ p: 4, fontWeight: 600 }}>
          Server error
        </Typography>
      )}
    </Paper>
  )
}
