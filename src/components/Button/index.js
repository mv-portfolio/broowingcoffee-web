import styles from './.module.css';
import * as Progress from 'components/Progress';
import {backgroundColor2} from 'constants/styles';
import {Separator, View} from 'components';
import {hp} from 'utils/helper';

export default function Button({
  children,
  prefixComponent,
  title,
  titleStyle,
  defaultStyle,
  skin,
  body,
  onPress,
  isLoading,
  disabled,
  ...props
}) {
  return (
    <button
      style={defaultStyle}
      className={`${styles.skin} ${skin}`}
      disabled={isLoading || disabled}
      onClick={onPress}
      {...props}>
      {!isLoading && (
        <View style={`${styles.childrenPane} ${body}`}>
          {prefixComponent && (
            <>
              {prefixComponent}
              <Separator horizontal={1.5} />
            </>
          )}
          {title && <p className={`${styles.title} ${titleStyle}`}>{title}</p>}
          {children}
        </View>
      )}
      {isLoading && (
        <Progress.CircleSnail
          color={backgroundColor2}
          size={hp(2.75)}
          thickness={hp(0.35)}
        />
      )}
    </button>
  );
}
