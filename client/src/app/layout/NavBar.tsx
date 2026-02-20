import { DarkMode, LightMode } from "@mui/icons-material";
import { AppBar, Box, IconButton,  LinearProgress,  Toolbar, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setDarkMode } from "./uiSlice";
import UserMenu from "./UserMenu";
import { useUserInfoQuery } from "../../feartures/account/accountApi";



// const rightLinks = [
//   {title: 'login', path: '/login'},
//   {title: 'register', path: '/register'}
// ]



export default function NavBar() {
  const {data: user} = useUserInfoQuery();
  const {isLoading, darkMode} = useAppSelector(state => state.ui);
  const dispatch = useAppDispatch();
  return (
   <AppBar position="fixed">
    <Toolbar sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
      <Box display='flex' alignItems='center'>
        <Typography variant="h6">EVOL</Typography>
        <IconButton onClick={() => dispatch(setDarkMode())}>
            {darkMode ? <DarkMode /> : <LightMode sx={{color : 'yellow'}} />}
        </IconButton>
         <IconButton
          sx={{display: 'flex',
              color: 'inherit',
              textDecoration: 'none',
              '&:hover':{
                color: 'grey.500'
              },
              '&.active': {
                color: 'baecf9'
              }
          }}
          
          aria-label="home"
          href="/home"
        >
          <HomeIcon />
        </IconButton>
      </Box>
       
           

        {user? 
          <UserMenu user={user} />
         : null}
    </Toolbar>
      {isLoading &&(
        <Box sx={{width: '100%'}}>
           <LinearProgress color="secondary" />
        </Box>
      )}
   </AppBar>
  )
}