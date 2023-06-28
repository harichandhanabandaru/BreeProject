import { TextField as MuiTextField } from '@mui/material';

interface TextFieldProps {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  multiline?: boolean;
  rows?: number;
  endAdornment?: React.ReactNode;
}

const TextField = (props: TextFieldProps) => {
  return (
    <MuiTextField
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      multiline={props.multiline}
      rows={props.rows}
      size={'small'}
      InputProps={{
        endAdornment: props.endAdornment
      }}
      fullWidth
    ></MuiTextField>
  );
};

export default TextField;