interface DateObject {
  year: number;
  month: number;
  day: number;
}

export class EyeDate extends Date {
  constructor() {
    super();
  }

  /**
   *
   * @param date - string, Date
   * @param isOnlyDate - If true is return only date otherwise return date with time. Default value - true
   * @param hour12 - this param convert 12 or 24 hour format. Default value - 24 hour format
   * @returns YYY-MM-DD T HH:MM format
   */
  static DateTimeFormat({
    date,
    isOnlyDate = true,
    hour12 = false,
  }: {
    date: string;
    isOnlyDate?: boolean;
    hour12?: boolean;
  }): string {
    const dateFormat = new Date(date);

    const year = dateFormat.getFullYear();
    const month = dateFormat.getMonth() + 1;
    const day = dateFormat.getDate();

    const monthFormat = `${month < 10 ? '0' + month : month}`;
    const dayFormat = `${day < 10 ? '0' + day : day}`;

    if (isOnlyDate) {
      return `${year}-${monthFormat}-${dayFormat}`;
    } else {
      const dateCurrentFormat = `${year}-${monthFormat}-${dayFormat}`;
      if (hour12) {
        const timeConvert = dateFormat.toLocaleTimeString('en-us', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });
        return `${dateCurrentFormat}T${timeConvert}`;
      }

      const hour = dateFormat.getHours();
      const minute = dateFormat.getMinutes();
      const second = dateFormat.getSeconds();

      const hourFormat = `${hour < 10 ? '0' + hour : hour}`;
      const minuteFormat = `${minute < 10 ? '0' + minute : minute}`;
      const secondFormat = `${second < 10 ? '0' + second : second}`;

      return `${dateCurrentFormat}T${hourFormat}:${minuteFormat}:${secondFormat}`;
    }
  }

  static Now(currentDate?: string) {
    return currentDate ? new Date(currentDate) : new Date();
  }

  /**
   *
   * @param date - string or Date
   * @returns Difference milliseconds
   */
  static differenceWithBetweenDate(date: string | Date): number {
    const currentDate = new Date();
    const anotherDate = new Date(date);
    return currentDate.getTime() - anotherDate.getTime();
  }

  static getTimeObject(millisecond: number): any {
    if (millisecond) {
      const time = millisecond;
      const calHour = Math.floor(time / 3600);
      const calMin = Math.floor((time - Number(calHour) * 3600) / 60);
      const calSec = Math.floor(
        time - Number(calHour) * 3600 - Number(calMin) * 60
      );
      return {
        hour: `${
          !!calHour
            ? calHour < 10
              ? '0' + calHour.toString()
              : calHour.toString()
            : '00'
        }`,
        minute: `${
          !!calMin
            ? calMin < 10
              ? '0' + calMin.toString()
              : calMin.toString()
            : '00'
        }`,
        second: `${
          !!calSec
            ? calSec < 10
              ? '0' + calSec.toString()
              : calSec.toString()
            : '00'
        }`,
      };
    }
    return {};
  }

  static getTimeObjectToDate(date: DateObject): string {
    const year = date.year;
    const month = date.month < 10 ? '0' + date.month : date.month;
    const day = date.day < 10 ? '0' + date.day : date.day;
    return `${year}-${month}-${day}`;
  }

  static getCurrentUTC(currentDate?: string): number {
    const date = currentDate ? new Date(currentDate) : new Date();
    const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
    return utcTime;
  }

  static toMillisecond(date: string): number {
    return Number(new Date(date + 3600000 * 6.0).getTime());
  }

  static getTimeSince(totalSecond: number): string {
    const sec = totalSecond / 1000;
    const min = sec / 60;
    const hour = min / 60;
    const day = hour / 24;
    const month = day / 30;
    const year = month / 12;
    if (isNaN(sec) || Math.sign(sec) === -1) {
      return 'Loading...';
    } else if (sec < 60) {
      return sec > 1 ? `${sec | 0} seconds ago` : `${sec | 0} second ago`;
    } else if (min < 60) {
      return min > 1 ? `${min | 0} minutes ago` : `${min | 0} minute ago`;
    } else if (hour < 24) {
      return hour > 1 ? `${hour | 0} hours ago` : `${hour | 0} hour ago`;
    } else if (day < 30) {
      return day > 1 ? `${day | 0} days ago` : `${day | 0} day ago`;
    } else if (month < 12) {
      return month > 1 ? `${month | 0} months ago` : `${month | 0} month ago`;
    } else if (month > 12) {
      return year > 1 ? `${year | 0} years ago` : `${year | 0} year ago`;
    } else {
      return 'Loading...';
    }
  }

  static getTimeSinceAgo(interval: number): string {
    const sec = interval;
    const min = sec / 60;
    const hour = min / 60;
    const day = hour / 24;
    const month = day / 30;
    const year = month / 12;
    if (sec < 60) {
      return sec > 1 ? `${sec | 0} seconds ago` : `${sec | 0} second ago`;
    } else if (min < 60) {
      return min > 1 ? `${min | 0} minutes ago` : `${min | 0} minute ago`;
    } else if (hour < 24) {
      return hour > 1 ? `${hour | 0} hours ago` : `${hour | 0} hour ago`;
    } else if (day < 30) {
      return day > 1 ? `${day | 0} days ago` : `${day | 0} day ago`;
    } else if (month < 12) {
      return month > 1 ? `${month | 0} months ago` : `${month | 0} month ago`;
    } else if (month > 12) {
      return year > 1 ? `${year | 0} years ago` : `${year | 0} year ago`;
    } else {
      return '';
    }
  }

  static reportMinDate() {
    const currentDate = new Date();
    const reportDate = new Date(
      currentDate.setDate(currentDate.getDate() - 365)
    );
    return {
      year: Number(reportDate.getFullYear()),
      month: Number(reportDate.getMonth() + 1),
      day: Number(reportDate.getDate()),
    };
  }

  static graphDateFormat(inputDate: {
    year: string;
    month: string;
    day: string;
  }): string {
    const monthFor =
      Number(inputDate.month) < 10 ? '0' + inputDate.month : inputDate.month;
    const date =
      Number(inputDate.day) < 10 ? '0' + inputDate.day : inputDate.day;
    const dateFormat = `${inputDate.year}${monthFor}${date}`;
    return dateFormat;
  }

  static greetingsMessage = (currentTime = new Date()) => {
    const currentHour = currentTime.getHours();
    const splitAfternoon = 12; // 24hr time to split the afternoon
    const splitEvening = 17; // 24hr time to split the evening

    if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
      // Between 12 PM and 5PM
      return 'Afternoon';
    } else if (currentHour >= splitEvening) {
      // Between 5PM and Midnight
      return 'Evening';
    }
    // Between dawn and noon
    return 'Morning';
  };

  static generateArrayOfMonth(isShort = false): string[] {
    if (isShort) {
      return [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
    }
    return [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
  }

  static generateArrayOfYears(numberOfYear: number = 9): number[] {
    const max = new Date().getFullYear();
    const min = max - (numberOfYear - 1);
    const years = [];

    for (let i = max; i >= min; i--) {
      years.push(i);
    }
    return years;
  }

  /**
   * Get Valid Date Range
   * @param startDate - Date , day [number of total day]
   * @returns MaxDate
   */
  static GetValidDateRange(startDate: Date, day: number): Date {
    const maxiumDate = new Date();
    const startingDate = new Date(startDate);
    const setDateRange = new Date(
      startingDate.setDate(startingDate.getDate() + day)
    );

    if (setDateRange.getMonth() > maxiumDate.getMonth()) {
      if (setDateRange.getFullYear() === maxiumDate.getFullYear()) {
        return new Date();
      } else {
        return setDateRange;
      }
    } else if (setDateRange.getMonth() === maxiumDate.getMonth()) {
      if (maxiumDate.getDate() < setDateRange.getDate()) {
        return new Date();
      } else {
        return setDateRange;
      }
    } else {
      return setDateRange;
    }
  }
}
