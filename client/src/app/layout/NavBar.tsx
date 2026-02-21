import { DarkMode, LightMode } from "@mui/icons-material";
import { AppBar, Box, Button, IconButton, LinearProgress, Toolbar, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setDarkMode } from "./uiSlice";
import UserMenu from "./UserMenu";
import { useUserInfoQuery } from "../../features/account/accountApi";
import { Link } from "react-router-dom";

export default function NavBar() {
  const {data: user, isLoading: authLoading} = useUserInfoQuery();
  const {isLoading, darkMode} = useAppSelector(state => state.ui);
  const dispatch = useAppDispatch();

  return (
    <AppBar position="fixed">
      <Toolbar sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: { xs: 2, md: 4 },
        py: 1,
      }}>
        <Box display='flex' alignItems='center'>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              letterSpacing: '0.08em',
              background: 'linear-gradient(135deg, #A855F7, #F59E0B)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '1.4rem',
            }}
          >
            EVOL
          </Typography>
          <IconButton
            onClick={() => dispatch(setDarkMode())}
            sx={{
              ml: 1,
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(123, 47, 190, 0.15)',
                transform: 'rotate(180deg)',
              },
            }}
          >
            {darkMode
              ? <DarkMode sx={{ color: '#A855F7' }} />
              : <LightMode sx={{ color: '#F59E0B' }} />
            }
          </IconButton>
          <IconButton
            sx={{
              color: 'text.secondary',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: 'primary.light',
                backgroundColor: 'rgba(123, 47, 190, 0.1)',
              },
            }}
            aria-label="home"
            href="/home"
          >
            <HomeIcon />
          </IconButton>
        </Box>

        {authLoading ? null : user ? (
          <UserMenu user={user} />
        ) : (
          <Box display="flex" alignItems="center" gap={1}>
            <Button
              component={Link}
              to="/"
              variant="outlined"
              size="small"
              sx={{
                borderColor: 'primary.light',
                color: 'primary.light',
                fontWeight: 600,
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'rgba(123, 47, 190, 0.1)',
                },
              }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              size="small"
              sx={{
                background: 'linear-gradient(135deg, #7B2FBE, #A855F7)',
                fontWeight: 600,
                '&:hover': {
                  background: 'linear-gradient(135deg, #581C87, #7B2FBE)',
                },
              }}
            >
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
      {isLoading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress color="secondary" />
        </Box>
      )}
    </AppBar>
  )
}
