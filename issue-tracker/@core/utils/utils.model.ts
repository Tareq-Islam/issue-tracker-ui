import { saveAs } from 'file-saver';
import * as _ from "lodash";

export default class Utility {
  constructor() {}
  static onScrollBarTop(scrollLayoutDivId: string) {
    const div = document.getElementById(scrollLayoutDivId);
    if (div) {
      div.scrollTop = 0;
    }
  }
  // static getTimeSince(serverMillSec: number, updateTime: Date): string {
  //   const d = new Date(updateTime);
  //   const utc = d.getTime() + d.getTimezoneOffset() * 60000;
  //   const logTime = new Date(utc + 3600000 * 6.0).getTime();
  //   const sec = (serverMillSec - logTime) / 1000;
  //   const min = sec / 60;
  //   const hour = min / 60;
  //   const day = hour / 24;
  //   const month = day / 30;
  //   const year = month / 12;
  //   if (isNaN(sec) || Math.sign(sec) === -1) {
  //     return 'Loading...';
  //   } else if (sec < 60) {
  //     return sec > 1 ? `${sec | 0} seconds ago` : `${sec | 0} second ago`;
  //   } else if (min < 60) {
  //     return min > 1 ? `${min | 0} minutes ago` : `${min | 0} minute ago`;
  //   } else if (hour < 24) {
  //     return hour > 1 ? `${hour | 0} hours ago` : `${hour | 0} hour ago`;
  //   } else if (day < 30) {
  //     return day > 1 ? `${day | 0} days ago` : `${day | 0} day ago`;
  //   } else if (month < 12) {
  //     return month > 1 ? `${month | 0} months ago` : `${month | 0} month ago`;
  //   } else if (month > 12) {
  //     return year > 1 ? `${year | 0} years ago` : `${year | 0} year ago`;
  //   } else {
  //     return 'Loading...';
  //   }
  // }

  // static getCurrentUTC(): number {
  //   const date = new Date();
  //   const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
  //   const utc = Number(new Date(utcTime + 3600000 * 6.0).getTime());
  //   return utc;
  // }

  static genSec(interval: { hr: string; mm: string; sec: string }): number {
    const calcHourToSec = Number(interval.hr) * 60 * 60;
    const calcMinToSec = Number(interval.mm) * 60;
    const totalSec = Number(interval.sec) + calcHourToSec + calcMinToSec;
    return totalSec;
  }

  /**
   * @description
   *
   * This method return param or string object that is contain hour, minute and second
   *
   * @param interval milisecond
   */

  static genSecToObject(interval: any): any {
    if (interval) {
      const time = interval;
      const calHour = Math.floor(time / 3600);
      const calMin = Math.floor((time - Number(calHour) * 3600) / 60);
      const calSec = Math.floor(
        time - Number(calHour) * 3600 - Number(calMin) * 60
      );
      return {
        hr: `${
          !!calHour
            ? calHour < 10
              ? '0' + calHour.toString()
              : calHour.toString()
            : '00'
        }`,
        mm: `${
          !!calMin
            ? calMin < 10
              ? '0' + calMin.toString()
              : calMin.toString()
            : '00'
        }`,
        sec: `${
          !!calSec
            ? calSec < 10
              ? '0' + calSec.toString()
              : calSec.toString()
            : '00'
        }`,
      };
    }
    return interval;
  }

  // static fileExtention(fileName: string): string {
  //   const lg = fileName.length;
  //   const indexNumber = fileName.indexOf('.');
  //   const extention = fileName.substring(indexNumber + 1, lg);
  //   return extention;
  // }

  // static CalcPageSize(
  //   wrapperHeight: number,
  //   offsetHeight: number,
  //   containerHeight: number
  // ): number {
  //   return Math.floor((wrapperHeight - offsetHeight) / containerHeight);
  // }

  static autoGenerate(charset: any, length?: number) {
    const lngth = length ? length : 6,
      charsets = charset;
    let retVal = '';
    for (let i = 0, n = charsets.length; i < lngth; ++i) {
      const randomNumber = Math.floor(Math.random() * charsets.length);
      retVal += charsets.substring(randomNumber, randomNumber + 1);
    }
    return retVal;
  }

  // static eyeAccordion(
  //   parentDivId: string,
  //   iconDivId: string,
  //   headerDivId: string,
  //   blockDivId: string
  // ) {
  //   const parentWrapperId = document.getElementById(parentDivId);
  //   const headerWrapperId = document.getElementById(headerDivId);
  //   const blockWrapperId = document.getElementById(blockDivId);
  //   const iconId = document.getElementById(iconDivId);

  //   if (parentWrapperId && headerWrapperId && blockWrapperId && iconId) {
  //     if (parentWrapperId.classList.contains('eye-accordion')) {
  //       parentWrapperId.classList.remove('eye-accordion');
  //       headerWrapperId.classList.remove('eye-accordion-header');
  //       blockWrapperId.classList.remove('eye-accordion-block');
  //       blockWrapperId.classList.add('hide');
  //       iconId.classList.remove('pi-minus-circle');
  //       iconId.classList.add('pi-plus-circle');
  //     } else {
  //       parentWrapperId.classList.add('eye-accordion');
  //       headerWrapperId.classList.add('eye-accordion-header');
  //       blockWrapperId.classList.remove('hide');
  //       blockWrapperId.classList.add('eye-accordion-block');
  //       iconId.classList.remove('pi-plus-circle');
  //       iconId.classList.add('pi-minus-circle');
  //     }
  //   }
  // }

  /**
   *
   * @param uniqDivId this param take first div.
   *
   * @class pi-plus-circle class replace pi-minus-circle class
   *
   * @class add first-row class in first div
   *
   * @class remove hidden class from second div
   *
   */
  static eyeAccordion(uniqDivId: string): void {
    const div = document.getElementById(uniqDivId);
    if (div?.children[0].classList.contains('pi-plus-circle')) {
      div?.classList.add('first-row');
      div?.children[0].classList.replace('pi-plus-circle', 'pi-minus-circle');
      div?.nextElementSibling?.classList.remove('hidden');
    } else {
      div?.classList.remove('first-row');
      div?.children[0].classList.replace('pi-minus-circle', 'pi-plus-circle');
      div?.nextElementSibling?.classList.add('hidden');
    }
  }

  // /**
  //  * This method update to your given object value.
  //  *
  //  * @param object take an object otherwise throw an error into console.
  //  *
  //  * @param object_key that you want to change value.
  //  *
  //  * @param value replace by given value. Default value = true
  //  *
  //  * @returns an update object.
  //  *
  //  */
  // static makeTrueOfFalse<T>({
  //   object,
  //   object_key,
  //   value = true,
  // }: {
  //   object: T;
  //   object_key: string;
  //   value: boolean;
  // }): T {
  //   if (typeof object !== 'object') {
  //     throw new Error('This is not an object');
  //   }
  //   const newArray = Object.entries(object);
  //   newArray.forEach((x) => {
  //     if (object_key === x[0]) {
  //       x[1] = value;
  //     }
  //   });
  //   const updateObject: any = _.fromPairs(newArray);
  //   return updateObject;
  // }

  static toSpaceBetweenJoinWord(str: string): string {
    return str.replace(/([A-Z])/g, ' $1').trim();
  }

  static toTitleCase(str: string): string {
    return str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());
  }

  // /**
  //  * This Method transform a object to array object.
  //  *
  //  * @param transformObject this param take a object.
  //  *
  //  * @example const value = {key: value, key: value}.
  //  *
  //  * @returns a array object.
  //  *
  //  * @example const value = [{key: value}, {key: value}, {key: value}]
  //  */
  // static objectToArrayObject(transformObject: object): string[] | undefined {
  //   if (Object.keys(transformObject).length > 0) {
  //     const newObjectArray: string[] = [];
  //     _.mapKeys(transformObject, (value, key) => {
  //       const le = `{"${key}": "${value}"}`;
  //       newObjectArray.push(JSON.parse(le));
  //     });
  //     return newObjectArray;
  //   }
  // }

  static saveFile({
    File,
    fileName,
    fileExtention = '.xlsx',
    FileType = 'application/ms-excel',
  }: {
    File: any;
    fileName: string;
    fileExtention?: string;
    FileType?: string;
  }) {
    try {
      const blob = new Blob([File], { type: FileType });
      saveAs(
        blob,
        `${fileName} (${new Date().toLocaleString()})` + `${fileExtention}`
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
