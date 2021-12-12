import {Text, Image, Button} from 'components';

import * as IMAGES from 'assets/images';
import styles from './.module.css';
import * as Formatter from 'utils/Formatter';

export default function Product({productInfo, onPress}) {
  const {based, name} = productInfo;

  const getImage = type => {
    if (type === 'coffee') {
      return IMAGES.imgCoffeeBase;
    }
    return IMAGES.imgNonCoffeeBase;
  };

  return (
    <Button skin={styles.mainPane} body={styles.bodyPane} onPress={onPress}>
      <Image style={styles.image} source={getImage(based)} />
      <Text style={styles.title}>{Formatter.toName(name) || 'Product 1'}</Text>
    </Button>
  );
}
