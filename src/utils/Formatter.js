export default class Formatter {
  static toName(name) {
    let fn = '',
      sn = '',
      tn = '';
    let trimedName = name.replace(/\s+/g, ' ').trim();
    let lastIndex = trimedName.indexOf(' ');
    let lastIndex2 = trimedName.indexOf(' ', lastIndex + 1);
    if (lastIndex2 > 0) {
      tn =
        trimedName.substring(lastIndex2 + 1, lastIndex2 + 2).toUpperCase() +
        trimedName.substring(lastIndex2 + 2).toLowerCase();
      sn =
        trimedName.substring(lastIndex + 1, lastIndex + 2).toUpperCase() +
        trimedName.substring(lastIndex + 2, lastIndex2).toLowerCase();
      fn = trimedName.substring(0, 1).toUpperCase() + trimedName.substring(1, lastIndex).toLowerCase();
    } else if (lastIndex > 0) {
      sn =
        trimedName.substring(lastIndex + 1, lastIndex + 2).toUpperCase() + trimedName.substring(lastIndex + 2).toLowerCase();
      fn = trimedName.substring(0, 1).toUpperCase() + trimedName.substring(1, lastIndex).toLowerCase();
    } else {
      fn = trimedName.substring(0, 1).toUpperCase() + trimedName.substring(1).toLowerCase();
    }

    return `${fn} ${sn} ${tn}`.trim();
  }
  static toMoney(number) {
    return parseFloat(number).toFixed(2);
  }
  static toNumber(value) {
    return parseInt(value);
  }
  static toTime(date) {
    let prefer_date = new Date(date);
    let hr = '',
      min = '',
      a = '';
    hr = prefer_date.getHours();
    min = prefer_date.getMinutes();
    a = hr >= 12 ? 'PM' : 'AM';
    hr = hr % 12;
    hr = hr ? hr : 12;
    return this.numberFormatter(hr) + ':' + this.numberFormatter(min) + ' ' + a;
  }
  static toDate(date) {
    let prefer_date = new Date(date);
    let month = '',
      d = '',
      year = '';

    month = this.monthTerm(prefer_date);
    d = prefer_date.getDate();
    year = prefer_date.getFullYear();

    return `${month} ${d} ${year}`;
  }
  static toExactDate(date) {
    return new Date(this.toDate(date)).getTime();
  }
  static toLocaleString(date) {
    let prefer_date = new Date(date);
    let day = '',
      month = '',
      d = '',
      year = '';

    day = this.dayTerm(prefer_date);
    month = this.monthTerm(prefer_date);
    d = prefer_date.getDate();
    year = prefer_date.getFullYear();

    return `${day}, ${month} ${d} ${year}`;
  }

  static getDateDifference(date) {
    let current_date = new Date();
    let prefer_date = new Date(date);
    let d = '',
      hr = '',
      min = '',
      a = '';

    d = prefer_date.toLocaleDateString();
    hr = prefer_date.getHours();
    min = prefer_date.getMinutes();

    a = hr > 12 ? 'PM' : 'AM';
    hr = hr % 12;
    hr = hr ? hr : 12;

    let diff_date = current_date.getTime() - prefer_date;
    if (diff_date >= 0 && diff_date < 60 * 1000) {
      return 'Now';
    } else if (diff_date >= 60 * 1000 && diff_date < 60 * 60 * 1000) {
      if (diff_date < 60 * 1000 * 2) {
        return Math.round(diff_date / (60 * 1000)) + ' minute ago';
      } else {
        return Math.round(diff_date / (60 * 1000)) + ' minutes ago';
      }
    } else if (diff_date >= 60 * 60 * 1000 && diff_date < 24 * 60 * 60 * 1000) {
      if (diff_date < 60 * 60 * 1000 * 2) {
        return Math.round(diff_date / (60 * 60 * 1000)) + ' hour ago';
      } else {
        return Math.round(diff_date / (60 * 60 * 1000)) + ' hours ago';
      }
    } else if (diff_date >= 24 * 60 * 60 * 1000 && diff_date < 24 * 60 * 60 * 1000 * 2) {
      return 'Yesterday at ' + this.numberFormatter(hr) + ':' + this.numberFormatter(min) + ' ' + a;
    } else {
      return d + ' - ' + this.numberFormatter(hr) + ':' + this.numberFormatter(min) + ' ' + a;
    }
  }
  static getDayGreeting() {
    let date = new Date();
    if (date.getHours() > 17) {
      return 'Good Evening';
    } else if (date.getHours() > 11) {
      return 'Good Afternoon';
    } else if (date.getHours() >= 0) {
      return 'Good Morning';
    }
  }

  //strategy
  static numberFormatter(num) {
    if (num < 10) {
      return '0' + num;
    } else {
      return num;
    }
  }
  static dayTerm(date) {
    let day;
    if (date.getDay() === 0) {
      day = 'Sunday';
    } else if (date.getDay() === 1) {
      day = 'Monday';
    } else if (date.getDay() === 2) {
      day = 'Tuesday';
    } else if (date.getDay() === 3) {
      day = 'Wednesday';
    } else if (date.getDay() === 4) {
      day = 'Thursday';
    } else if (date.getDay() === 5) {
      day = 'Friday';
    } else if (date.getDay() === 6) {
      day = 'Saturday';
    }
    return day;
  }
  static monthTerm(date) {
    let month;
    if (date.getMonth() === 0) {
      month = 'January';
    } else if (date.getMonth() === 1) {
      month = 'February';
    } else if (date.getMonth() === 2) {
      month = 'March';
    } else if (date.getMonth() === 3) {
      month = 'April';
    } else if (date.getMonth() === 4) {
      month = 'May';
    } else if (date.getMonth() === 5) {
      month = 'June';
    } else if (date.getMonth() === 6) {
      month = 'July';
    } else if (date.getMonth() === 7) {
      month = 'August';
    } else if (date.getMonth() === 8) {
      month = 'September';
    } else if (date.getMonth() === 9) {
      month = 'October';
    } else if (date.getMonth() === 10) {
      month = 'November';
    } else if (date.getMonth() === 11) {
      month = 'December';
    }
    return month;
  }
}
