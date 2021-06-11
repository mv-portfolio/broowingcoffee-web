import styles from './.module.css';
export default function View({children, style, defaultStyle, ...props}) {
  return (
    <div className={`${style} ${styles.view}`} style={defaultStyle} {...props}>
      {children}
    </div>
  );
}
