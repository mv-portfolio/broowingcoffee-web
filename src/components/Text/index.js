import styles from './.module.css';
export default function Text({children, style, ...props}) {
  return (
    <p className={`${styles.text} ${style}`} {...props}>
      {children}
    </p>
  );
}
