import {Button, Text} from 'components';

import styles from './.module.css';

export default function PurchasingItem() {
  return (
    <Button skin={styles.mainPane} body={styles.bodyPane}>
      <Text>Hello World</Text>
    </Button>
  );
}
