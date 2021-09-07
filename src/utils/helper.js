const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;

const hp = hp => (hp / 100) * HEIGHT;

const wp = wp => (wp / 100) * WIDTH;

const ASC_NAME = (a, b) => {
  const firstComparable = a.name.toLowerCase();
  const secondComparable = b.name.toLowerCase();
  if (firstComparable > secondComparable) return 1;
  if (firstComparable < secondComparable) return -1;
  return 0;
};

const sumOfPrice = (value = []) => {
  let totalPrice = 0;
  value.map(item => (totalPrice = totalPrice + item.price));
  return totalPrice;
};

export {HEIGHT, WIDTH, sumOfPrice, ASC_NAME, hp, wp};
