import { Button, SxProps, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Ellipsis from '../../../assets/icons/ellipsis.svg';
import Icon from '../../atoms/icon';

export interface EllipsisMenuItem {
  label: string;
  onClick?: () => void;
}

interface EllipsisMenuProps {
  data: EllipsisMenuItem[];
  sxButton?: SxProps;
  sxMenu?: SxProps;
}

const EllipsisMenu = ({ data, sxButton, sxMenu }: EllipsisMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <div>
      <Button
        disableRipple
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={sxButton}
        data-testid="ellipsisMenu"
      >
        <Icon src={Ellipsis} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        sx={sxMenu}
      >
        {data.map((item) => (
          <MenuItem
            onClick={item.onClick}
            key={item.label}
            sx={{ height: '40px' }}
          >
            <Typography>{item.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default EllipsisMenu;
