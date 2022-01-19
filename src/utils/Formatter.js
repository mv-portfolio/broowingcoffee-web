export default class Formatter {
  static toName(name) {
    const names = name ? name.split(' ') : [];
    let tempName = '';
    names.forEach((name, index) => {
      tempName += name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase();
      if (index + 1 !== names.length) tempName += ' ';
    });
    return tempName;
  }
  static toPluralName(numberSubject, value) {
    return numberSubject > 1 ? `${value}s` : `${value}`;
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

    month = this.monthTerm(prefer_date.getMonth());
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

    month = this.monthTerm(prefer_date.getMonth());
    d = prefer_date.getDate();
    year = prefer_date.getFullYear();

    return `${month} ${d}, ${year}`;
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
      return `${timeDifference} ${this.toPluralName(timeDifference, 'second')} ago`;
    }
    //minutes
    if (timeDifference < 60 * 60) {
      const minute = Math.floor(timeDifference / 60);
      if (minute < 60) {
        return `${minute} ${this.toPluralName(minute, 'minute')} ago`;
      }
    }
    //hour
    if (timeDifference < 60 * 60 * 60) {
      const hour = Math.floor(timeDifference / (60 * 60));
      if (hour < 24) {
        return `${hour} ${this.toPluralName(hour, 'hour')} ago`;
      }
    }
    //day
    if (timeDifference < 60 * 60 * 60 * 24) {
      // const day = Math.floor(timeDifference / (60 * 60 * 24));
      // if (day <= 1) {
      //   return 'Yesterday';
      // }
      const date = new Date(prevTime);
      const hours = this.numberFormatter(date.getHours() % 12);
      const minutes = this.numberFormatter(date.getUTCMinutes());
      const seconds = this.numberFormatter(date.getSeconds());
      const meridian = date.getHours() >= 12 ? 'PM' : 'AM';
      return `${date.toLocaleDateString()} - ${hours}:${minutes} ${meridian}`;
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
  static monthTerm(number) {
    let month;
    if (number === 0) {
      month = 'January';
    } else if (number === 1) {
      month = 'February';
    } else if (number === 2) {
      month = 'March';
    } else if (number === 3) {
      month = 'April';
    } else if (number === 4) {
      month = 'May';
    } else if (number === 5) {
      month = 'June';
    } else if (number === 6) {
      month = 'July';
    } else if (number === 7) {
      month = 'August';
    } else if (number === 8) {
      month = 'September';
    } else if (number === 9) {
      month = 'October';
    } else if (number === 10) {
      month = 'November';
    } else if (number === 11) {
      month = 'December';
    }
    return month;
  }
  static monthNumber(month) {
    if (month.toLowerCase() === 'january') {
      return 1;
    }
    if (month.toLowerCase() === 'february') {
      return 2;
    }
    if (month.toLowerCase() === 'march') {
      return 3;
    }
    if (month.toLowerCase() === 'april') {
      return 4;
    }
    if (month.toLowerCase() === 'may') {
      return 5;
    }
    if (month.toLowerCase() === 'june') {
      return 6;
    }
    if (month.toLowerCase() === 'july') {
      return 7;
    }
    if (month.toLowerCase() === 'august') {
      return 8;
    }
    if (month.toLowerCase() === 'september') {
      return 9;
    }
    if (month.toLowerCase() === 'october') {
      return 10;
    }
    if (month.toLowerCase() === 'november') {
      return 11;
    }
    if (month.toLowerCase() === 'december') {
      return 12;
    }
  }
}
