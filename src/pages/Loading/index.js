import styles from './.module.css';

import {CircleSnail} from 'components';
import {ACCENT_COLOR} from 'constants/colors';
import {hp} from 'utils/helper';

export default function Loading({planeBackground}) {
  return (
    <div className={`${styles.mainPane}`}>
      {!planeBackground && (
        <CircleSnail color={ACCENT_COLOR} size={hp(5)} thickness={hp(0.5)} />
      )}
    </div>
  );
}
