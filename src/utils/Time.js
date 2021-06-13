export default class Time {
  static getTimeDifference(time) {
    let data = new Date();
    return time - data.getTime();
  }
}
