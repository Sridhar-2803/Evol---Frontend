import { Menu, Fade, MenuItem, ListItemIcon, ListItemText, Avatar, IconButton } from "@mui/material";
import { useState } from "react";
import type { User } from "../model/user";
import { ConfirmationNumber, Inventory, Logout, Person } from "@mui/icons-material";
import { useLogoutMutation } from "../../features/account/accountApi";
import { Link } from "react-router-dom";

type Props = {
  user: User
}

const menuItemSx = {
  borderRadius: 1,
  mx: 1,
  my: 0.5,
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(123, 47, 190, 0.1)',
  },
};

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
      <IconButton onClick={handleClick} size="small" sx={{ ml: 5 }}>
        <Avatar sx={{
          width: 36,
          height: 36,
          background: 'linear-gradient(135deg, #7B2FBE, #A855F7)',
          color: '#fff',
          fontWeight: 700,
          fontSize: '0.9rem',
          border: '2px solid rgba(168, 85, 247, 0.4)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 0 16px rgba(123, 47, 190, 0.5)',
          },
        }}>
          {user.email[0].toUpperCase()}
        </Avatar>
      </IconButton>
      <Menu
        id="fade-menu"
        slotProps={{
          list: { 'aria-labelledby': 'fade-button' },
        }}
        slots={{ transition: Fade }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} sx={menuItemSx}>
          <ListItemIcon>
            <Person sx={{ color: 'primary.light' }} />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to='/bookings' onClick={handleClose} sx={menuItemSx}>
          <ListItemIcon>
            <ConfirmationNumber sx={{ color: 'primary.light' }} />
          </ListItemIcon>
          <ListItemText>My Bookings</ListItemText>
        </MenuItem>
        {user.roles.includes('Admin') &&
          <MenuItem component={Link} to='/inventory' onClick={handleClose} sx={menuItemSx}>
            <ListItemIcon>
              <Inventory sx={{ color: 'primary.light' }} />
            </ListItemIcon>
            <ListItemText>Inventory</ListItemText>
          </MenuItem>
        }
        <MenuItem onClick={() => { handleClose(); logout(); }} sx={menuItemSx}>
          <ListItemIcon>
            <Logout sx={{ color: 'primary.light' }} />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}
