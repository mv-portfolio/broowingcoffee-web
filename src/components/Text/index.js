import styles from './.module.css';
export default function Text({children, defaultStyle, style, ...props}) {
  return (
    <p className={`${styles.text} ${style}`} style={defaultStyle} {...props}>
      {children}
    </p>
  );
}
