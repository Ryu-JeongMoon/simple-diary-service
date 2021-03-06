const formatDateObject = (date: Date, format: string, hasPadding: boolean): string => {
  const replacer = ($1: string) => {
    switch ($1) {
      case 'yyyy':
        return date.getFullYear().toString();
      case 'MM':
        return hasPadding
          ? (date.getMonth() + 1).toString().padStart(2, '0')
          : (date.getMonth() + 1).toString();
      case 'dd':
        return hasPadding ? date.getDate().toString().padStart(2, '0') : date.getDate().toString();
      case 'hh':
        return date.getHours().toString();
      case 'mm':
        return date.getMinutes().toString();
      case 'ss':
        return date.getSeconds().toString();
      default:
        return $1;
    }
  };

  return format.replace(/(yyyy|yy|MM|dd|hh|mm|ss)/g, replacer);
};

const formatDateNumber = (date: number, format: string, hasPadding: boolean): string => {
  const ms = date % 1000;
  const ss = Math.floor(date / 1000) % 60;
  const mm = Math.floor(date / 1000 / 60) % 60;
  const hh = Math.floor(date / 1000 / 60 / 60) % 24;
  const dd = Math.floor(date / 1000 / 60 / 60 / 24);
  const MM = Math.floor(date / 1000 / 60 / 60 / 24 / 30);
  const yy = Math.floor(date / 1000 / 60 / 60 / 24 / 365);
  const replacer = ($1: string) => {
    switch ($1) {
      case 'yyyy':
        return yy.toString();
      case 'MM':
        return hasPadding ? MM.toString().padStart(2, '0') : MM.toString();
      case 'dd':
        return hasPadding ? dd.toString().padStart(2, '0') : dd.toString();
      case 'hh':
        return hh.toString();
      case 'mm':
        return mm.toString();
      case 'ss':
        return ss.toString();
      default:
        return $1;
    }
  };

  return format.replace(/(yyyy|yy|MM|dd|hh|mm|ss)/g, replacer);
};

export const formatDate = (date: Date | number, format: string, hasPadding = true) => {
  if (date instanceof Date) {
    return formatDateObject(date, format, hasPadding);
  } else {
    return formatDateNumber(date, format, hasPadding);
  }
};

export const removeTime = (date: Date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * date??? ????????? time??? ???????????? ????????????.
 * @param date ????????? ????????? ??????
 * @param time data??? ????????? ????????? ?????? ??????
 */
export const applyTime = (date: Date, time: Date) => {
  date.setHours(time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds());
};

/**
 * date??? ????????? date2??? ????????? ????????????.
 * @param date ????????? ????????? ??????
 * @param date2 data??? ????????? ????????? ?????? ??????
 */
export const applyDate = (date: Date, date2: Date) => {
  date.setFullYear(date2.getFullYear());
  date.setMonth(date2.getMonth());
  date.setDate(date2.getDate());
};

export const getTimeAddedDate = (
  date: Date,
  hour?: number,
  minute?: number,
  second?: number,
  millisecond?: number,
) => {
  const d = new Date(date);
  hour && d.setHours(d.getHours() + hour);
  minute && d.setMinutes(d.getMinutes() + minute);
  second && d.setSeconds(d.getSeconds() + second);
  millisecond && d.setMilliseconds(d.getMilliseconds() + millisecond);
  return d;
};
