import React from 'react';

interface IconProps {
  src: string;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = (props: IconProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      data-testid="icon"
      src={props.src}
      width={props.width}
      height={props.height}
      style={props.style}
      onClick={props.onClick}
    />
  );
};

export default Icon;
