import VectorIcon from 'react-web-vector-icons';
export default function Icon({font, name, size, color,  ...props}) {
  return (
    <VectorIcon
      font={font}
      name={name}
      size={size}
      color={color}
      {...props}
    />
  );
}
