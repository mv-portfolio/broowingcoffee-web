const { innerHeight, innerWidth } = window;

const hp = (hp) => Math.round((hp / 100) * innerHeight);
const wp = (wp) => Math.round((wp / 100) * innerWidth);

export { hp, wp };
