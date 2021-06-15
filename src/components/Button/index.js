import styles from './.module.css';
import * as Progress from 'components/Progress';
import {backgroundColor} from 'constants/styles';
export default function Button({
  children,
  title,
  titleStyle,
  skin,
  onPress,
  isLoading,
  ...props
}) {
  return (
    <button
      className={`${styles.skin} ${skin}`}
      disabled={isLoading}
      onClick={onPress}
      {...props}>
      {!isLoading && (
        <p className={`${styles.title} ${titleStyle}`}>{title || children}</p>
      )}
      {isLoading && <Progress.CircleSnail color={backgroundColor} size={20} />}
    </button>
  );
}
