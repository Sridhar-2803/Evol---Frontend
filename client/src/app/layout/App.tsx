import { Box, Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import NavBar from './NavBar'
import Footer from './Footer'
import { Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/store';

function App() {
  const {darkMode} = useAppSelector(state => state.ui)
  const location = useLocation();
  const pallateType = darkMode ? 'dark' : 'light'

  const theme = createTheme({
    palette: {
      mode: pallateType,
      primary: {
        main: '#7B2FBE',
        light: '#A855F7',
        dark: '#581C87',
      },
      secondary: {
        main: '#DC2626',
        light: '#F87171',
        dark: '#991B1B',
      },
      warning: { main: '#F59E0B' },
      success: { main: '#10B981' },
      error: { main: '#EF4444' },
      background: {
        default: pallateType === 'dark' ? '#0F1117' : '#FDF8F0',
        paper: pallateType === 'dark' ? '#161927' : '#FFFFFF',
      },
      text: {
        primary: pallateType === 'dark' ? '#F1F5F9' : '#1E1B2E',
        secondary: pallateType === 'dark' ? '#94A3B8' : '#64748B',
      },
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
      h1: { fontSize: '2.75rem', fontWeight: 700, letterSpacing: '-0.02em' },
      h2: { fontSize: '2.25rem', fontWeight: 700, letterSpacing: '-0.01em' },
      h3: { fontSize: '1.875rem', fontWeight: 600, letterSpacing: '-0.01em' },
      h4: { fontSize: '1.5rem', fontWeight: 600 },
      h5: { fontSize: '1.25rem', fontWeight: 600 },
      h6: { fontSize: '1rem', fontWeight: 600 },
      subtitle1: { fontSize: '1rem', fontWeight: 500, letterSpacing: '0.01em' },
      subtitle2: { fontSize: '0.875rem', fontWeight: 500 },
      body1: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.7 },
      body2: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.6 },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 10,
            padding: '10px 24px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          },
          contained: {
            boxShadow: '0 4px 14px rgba(123, 47, 190, 0.3)',
            '&:hover': {
              boxShadow: '0 6px 20px rgba(123, 47, 190, 0.45)',
              transform: 'translateY(-1px)',
            },
          },
          outlined: {
            borderWidth: '1.5px',
            '&:hover': { borderWidth: '1.5px' },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background: pallateType === 'dark'
              ? 'rgba(22, 25, 39, 0.7)'
              : 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(12px)',
            border: `1px solid ${
              pallateType === 'dark'
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(0, 0, 0, 0.08)'
            }`,
            borderRadius: 16,
            transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            background: pallateType === 'dark'
              ? 'rgba(22, 25, 39, 0.85)'
              : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${
              pallateType === 'dark'
                ? 'rgba(255, 255, 255, 0.06)'
                : 'rgba(0, 0, 0, 0.06)'
            }`,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: pallateType === 'dark'
              ? 'rgba(10, 10, 15, 0.8)'
              : 'rgba(253, 248, 240, 0.85)',
            backdropFilter: 'blur(20px)',
            borderBottom: `1px solid ${
              pallateType === 'dark'
                ? 'rgba(255, 255, 255, 0.06)'
                : 'rgba(0, 0, 0, 0.06)'
            }`,
            boxShadow: 'none',
            color: pallateType === 'dark' ? '#F1F5F9' : '#1E1B2E',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 10,
              backgroundColor: pallateType === 'dark'
                ? 'rgba(255, 255, 255, 0.03)'
                : 'rgba(0, 0, 0, 0.02)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: pallateType === 'dark'
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(0, 0, 0, 0.03)',
              },
              '&.Mui-focused': {
                backgroundColor: 'transparent',
                boxShadow: '0 0 0 2px rgba(123, 47, 190, 0.2)',
              },
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 600, borderRadius: 8 },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderColor: pallateType === 'dark'
              ? 'rgba(255, 255, 255, 0.06)'
              : 'rgba(0, 0, 0, 0.06)',
          },
          head: {
            fontWeight: 700,
            textTransform: 'uppercase' as const,
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: pallateType === 'dark'
                ? 'rgba(123, 47, 190, 0.08)'
                : 'rgba(123, 47, 190, 0.04)',
            },
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            background: pallateType === 'dark'
              ? 'rgba(22, 25, 39, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${
              pallateType === 'dark'
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(0, 0, 0, 0.08)'
            }`,
            borderRadius: 12,
            boxShadow: pallateType === 'dark'
              ? '0 20px 60px rgba(0, 0, 0, 0.5)'
              : '0 20px 60px rgba(0, 0, 0, 0.1)',
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: { height: 3, borderRadius: 2 },
          bar: {
            background: 'linear-gradient(90deg, #7B2FBE, #A855F7, #DC2626)',
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: pallateType === 'dark'
              ? 'rgba(255, 255, 255, 0.08)'
              : 'rgba(0, 0, 0, 0.08)',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Box
        sx={{
          minHeight: '100vh',
          background: darkMode
            ? `radial-gradient(ellipse at 20% 50%, rgba(123, 47, 190, 0.15) 0%, transparent 50%),
               radial-gradient(ellipse at 80% 20%, rgba(220, 38, 38, 0.08) 0%, transparent 50%),
               linear-gradient(180deg, #0A0A0F 0%, #0F1117 100%)`
            : `radial-gradient(ellipse at 20% 50%, rgba(123, 47, 190, 0.06) 0%, transparent 50%),
               radial-gradient(ellipse at 80% 80%, rgba(245, 158, 11, 0.08) 0%, transparent 50%),
               linear-gradient(180deg, #FDF8F0 0%, #FFF7ED 100%)`,
          backgroundAttachment: 'fixed',
          py: 6,
        }}
      >
        <Container key={location.pathname} className="page-fade" maxWidth='xl' sx={{ mt: 8 }}>
          <Outlet />
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  )
}

export default App
