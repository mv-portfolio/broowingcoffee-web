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
      fn =
        trimedName.substring(0, 1).toUpperCase() +
        trimedName.substring(1, lastIndex).toLowerCase();
    } else if (lastIndex > 0) {
      sn =
        trimedName.substring(lastIndex + 1, lastIndex + 2).toUpperCase() +
        trimedName.substring(lastIndex + 2).toLowerCase();
      fn =
        trimedName.substring(0, 1).toUpperCase() +
        trimedName.substring(1, lastIndex).toLowerCase();
    } else {
      fn =
        trimedName.substring(0, 1).toUpperCase() + trimedName.substring(1).toLowerCase();
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

  static getDateDifference(prevDate) {
    const prevTime = new Date(prevDate).getTime();
    const currTime = new Date().getTime();
    const timeDifference = Math.floor((currTime - prevTime) / 1000);

    //exact
    if (timeDifference === 0) {
      return 'Now';
    }
    //seconds
    if (timeDifference < 60) {
      return `${timeDifference} second${timeDifference > 1 ? 's' : ''} ago`;
    }
    //minutes
    if (timeDifference < 60 * 60) {
      const minute = Math.floor(timeDifference / 60);
      if (minute < 60) {
        return `${minute} minute${minute > 1 ? 's' : ''} ago`;
      }
    }
    //hour
    if (timeDifference < 60 * 60 * 60) {
      const hour = Math.floor(timeDifference / (60 * 60));
      if (hour < 24) {
        return `${hour} hour${hour > 1 ? 's' : ''} ago`;
      }
    }
    //day
    if (timeDifference < 60 * 60 * 60 * 24) {
      const day = Math.floor(timeDifference / (60 * 60 * 24));
      if (day <= 1) {
        return 'Yesterday';
      }
      const date = new Date(prevTime);
      const hours = this.#numberFormatter(date.getHours() % 12);
      const minutes = this.#numberFormatter(date.getUTCMinutes());
      const seconds = this.#numberFormatter(date.getSeconds());
      const meridian = date.getHours() >= 12 ? 'PM' : 'AM';
      return `${date.toLocaleDateString()} - ${hours}:${minutes}:${seconds} ${meridian}`;
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
  static #numberFormatter(num) {
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
