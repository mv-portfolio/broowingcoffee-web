import styles from './.module.css';

import {CircleSnail} from 'components';
import {accentColor} from 'constants/styles';
import {hp} from 'utils/helper';

export default function Loading({planeBackground}) {
  return (
    <div className={`${styles.mainPane}`}>
      {!planeBackground && (
        <CircleSnail color={accentColor} size={hp(5)} thickness={hp(0.5)} />
      )}
    </div>
  );
}
