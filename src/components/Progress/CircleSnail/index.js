import styles from './.module.css';
export default function CircleSnail({skin, size, color, thickness, isRotating}) {
  const SIZE = size || 17.5;
  const COLOR = color || 'orange';
  const STROKE_WIDTH = thickness || 2.5;
  const PI = Math.PI;
  const RADIUS = (SIZE - STROKE_WIDTH) / 2;
  const CIRCUMFERENCE = PI * 2 * RADIUS;

  const onProgress = (percent) => CIRCUMFERENCE * (percent / 100) - CIRCUMFERENCE;

  return (
    <svg version='1.1' width={SIZE} height={SIZE} className={`${styles.skin} ${skin}`}>
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        fill={'transparent'}
        strokeWidth={STROKE_WIDTH}
        stroke={'rgba(0,0,0, 0.25)'}
      />
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        fill={'transparent'}
        stroke={COLOR}
        strokeLinecap='round'
        strokeWidth={STROKE_WIDTH}
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={-onProgress(20)}
      />
    </svg>
  );
}
