import { Button as MuiButton } from '@mui/material';

interface ButtonProps {
  children: string;
  onClick: () => void;
  variant: 'contained' | 'outlined' | 'text';
  backgroundColor?: string;
  textColor?: string;
  startIcon?: React.ReactNode;
}

const Button = (props: ButtonProps) => {
  const style: React.CSSProperties = {
    backgroundColor: props.backgroundColor || '#3f51b5',
    color: props.textColor || 'white',
    textTransform: 'none',
    fontSize: '16px'
  };
  return (
    <MuiButton
      style={style}
      startIcon={props.startIcon}
      onClick={props.onClick}
      variant={props.variant}
    >
      {props.children}
    </MuiButton>
  );
};

export default Button;
