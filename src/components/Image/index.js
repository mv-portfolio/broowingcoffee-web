export default function Image({ source, title, style, ...props }) {
  return <img src={source} alt={title} className={`${style}`} {...props} />;
}
