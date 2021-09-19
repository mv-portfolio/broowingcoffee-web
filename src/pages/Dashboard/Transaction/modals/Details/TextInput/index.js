import styles from './.module.css';
export default function TextInput({skin, value, onChangeText, placeholder}) {
  return (
    <input
      className={`${styles.input} ${skin}`}
      placeholder={placeholder}
      value={value}
      onChange={({target: {value}}) => onChangeText(value)}
    />
  );
}
