import styles from './.module.css';
export default function TextInput({value, onChangeText, placeholder}) {
  return (
    <input
      className={styles.input}
      placeholder={placeholder}
      value={value}
      onChange={({target: {value}}) => onChangeText(value)}
    />
  );
}
