import {Text, Image, Button} from 'components';

import * as IMAGES from 'assets/images';
import styles from './.module.css';

export default function Product({data}) {
  const {based, name} = data;

  const getImage = type => {
    if (type === 'coffee') {
      return IMAGES.imgCoffeeBase;
    }
    return IMAGES.imgNonCoffeeBase;
  };

  return (
    <Button skin={styles.mainPane} body={styles.bodyPane}>
      <Image style={styles.image} source={getImage(based)} />
      <Text style={styles.title}>{name || 'Product 1'}</Text>
    </Button>
  );
}
