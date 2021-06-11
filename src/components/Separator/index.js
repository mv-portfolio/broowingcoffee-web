import View from 'components/View';
export default function Separator({ vertical, horizontal }) {
  return (
    <View
      defaultStyle={{
        paddingTop: `${vertical}px`,
        paddingBottom: `${vertical}px`,
        paddingLeft: `${horizontal}px`,
        paddingRight: `${horizontal}px`,
      }}
    />
  );
}
