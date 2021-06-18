import styles from './.module.css';

import {CircleSnail} from 'components';
import {accentColor} from 'constants/styles';

export default function Loading({planeBackground}) {
  return (
    <div className={`${styles.mainPane}`}>
      {!planeBackground && (
        <CircleSnail color={accentColor} size={50} thickness={5} />
      )}
    </div>
  );
}
