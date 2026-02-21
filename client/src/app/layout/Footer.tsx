import { Box, Container, Divider, IconButton, Typography } from "@mui/material";
import { GitHub, X } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        py: 4,
        borderTop: (theme) =>
          `1px solid ${theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.06)'
            : 'rgba(0, 0, 0, 0.06)'}`,
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: 3,
            mb: 3,
          }}
        >
          {/* Brand */}
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                letterSpacing: '0.08em',
                background: 'linear-gradient(135deg, #A855F7, #F59E0B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: '1.4rem',
                mb: 0.5,
              }}
            >
              EVOL
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your Cinema Experience
            </Typography>
          </Box>

          {/* Links */}
          <Box display="flex" gap={3} alignItems="center">
            <Typography
              component={Link}
              to="/home"
              variant="body2"
              sx={{
                color: 'text.secondary',
                transition: 'color 0.2s',
                '&:hover': { color: 'primary.light' },
              }}
            >
              Home
            </Typography>
            <Typography
              component={Link}
              to="/not-found"
              variant="body2"
              sx={{
                color: 'text.secondary',
                transition: 'color 0.2s',
                '&:hover': { color: 'primary.light' },
              }}
            >
              About
            </Typography>
          </Box>

          {/* Social */}
          <Box display="flex" gap={0.5}>
            <IconButton
              size="small"
              sx={{
                color: 'text.secondary',
                transition: 'all 0.2s',
                '&:hover': { color: 'primary.light' },
              }}
            >
              <GitHub fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                color: 'text.secondary',
                transition: 'all 0.2s',
                '&:hover': { color: 'primary.light' },
              }}
            >
              <X fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Divider />

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', textAlign: 'center', mt: 2 }}
        >
          &copy; {new Date().getFullYear()} EVOL Cinema. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
