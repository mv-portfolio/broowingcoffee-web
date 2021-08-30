import View from 'components/View';
export default function Separator({vertical, horizontal, borderWidth, borderColor}) {
  return (
    <View
      defaultStyle={{
        paddingTop: `${vertical || 0}vh`,
        paddingBottom: `${vertical || 0}vh`,
        paddingLeft: `${horizontal || 0}vh`,
        paddingRight: `${horizontal || 0}vh`,
        borderBottom: borderWidth
          ? `solid ${borderColor || '#fff'} ${borderWidth}`
          : null,
      }}
    />
  );
}
