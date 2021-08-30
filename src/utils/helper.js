const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;

const hp = hp => (hp / 100) * HEIGHT;

const wp = wp => (wp / 100) * WIDTH;

export {HEIGHT, WIDTH, hp, wp};
