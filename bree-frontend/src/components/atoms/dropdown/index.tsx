import {
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

export interface DropdownOptions {
  key: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOptions[];
  onChange: (event: SelectChangeEvent) => void;
  value: string;
}

const sx = {
    dropdown: {
        height: '36px',
        width: '100%',
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#8418D8',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#CCCACE',
          borderWidth: '0.15rem',
        },
        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
          borderWidth: '0.13rem',
          borderColor: '#960303',
        },
        '&.Mui-disabled': {
          backgroundColor: '#F5F4F5',
        },
        '&.MuiPopover-root .MuiPaper-root': {
          minWidth: 600,
        },
    }    
}

const Dropdown = (props: DropdownProps) => {
  return (
    <Grid container flexDirection={'row'} alignItems='center' width='245px' gap='5px'>
        <Grid item>
            <Typography variant="body1">Select a status: </Typography>
        </Grid>
        <Grid item>
        <FormControl fullWidth>
      <Select
        sx={sx.dropdown}
        variant="outlined"
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.value}
        onChange={props.onChange}
      >
        {props.options.map((option) => (
          <MenuItem key={option.key} value={option.key}>
            {option.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
        </Grid>
    </Grid>
  );
};

export default Dropdown;