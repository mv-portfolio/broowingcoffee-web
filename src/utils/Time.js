export default class Time {
  static getTimeDifference(time) {
    let data = new Date();
    return time - data.getTime();
  }
  static set(ms) {
    return new Promise((res, rej) => setTimeout(res, ms));
  }
}
