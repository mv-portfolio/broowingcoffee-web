import {forwardRef} from 'react';
import styles from './.module.css';

export default forwardRef(({style, children, defaultStyle, ...props}, ref) => {
  return (
    <div ref={ref} className={`${style} ${styles.view}`} style={defaultStyle} {...props}>
      {children}
    </div>
  );
});
