import {  Menu, Fade, MenuItem, ListItem, ListItemText, Avatar, IconButton } from "@mui/material";
import  { useState } from "react";
import type { User } from "../model/user";
import { Inventory, Logout, Person } from "@mui/icons-material";
import { useLogoutMutation } from "../../feartures/account/accountApi";
import { Link } from "react-router-dom";

type Props = {
user: User
}

export default function UserMenu({user}: Props) {
   const [logout] = useLogoutMutation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
     <IconButton onClick={handleClick} size="small" sx={{ ml: 5  }}>
        <Avatar sx={{ width: 32, height: 32, color: "green" }}>
          {user.email[0].toUpperCase()} 
        </Avatar>
      </IconButton>
      <Menu
        id="fade-menu"
        slotProps={{
          list: {
            'aria-labelledby': 'fade-button',
          },
        }}
        slots={{ transition: Fade }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem > 
          <ListItem>
            <Person />
          </ListItem>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        {user.roles.includes('Admin') && 
         <MenuItem component={Link} to='/inventory'> 
          <ListItem >
            <Inventory />
          </ListItem>
          <ListItemText>Inventory</ListItemText>
        </MenuItem>}
        <MenuItem onClick={logout}> 
          <ListItem>
            <Logout />
          </ListItem>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}