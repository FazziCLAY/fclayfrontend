export const LOCALHOST = false;
export const BASE_URL_HTTP = !LOCALHOST ? 'https://fazziclay.com' : 'http://localhost:8080';
export const BASE_URL = BASE_URL_HTTP; // DEPRECATED
export const BASE_URL_WS = !LOCALHOST ? 'wss://fazziclay.com' : 'ws://localhost:8080';
export const BASE_API = !LOCALHOST ? `${BASE_URL_HTTP}/api/v1` : `${BASE_URL_HTTP}`;

export function isNoSet(m) {
  return m == null || m === undefined || m === -1;
}

export function isSet(m) {
  return !isNoSet(m);
}

export function emptymize(prefix, x, suffix) {
  if (x === undefined) {
    return '';
  } if (x === null) {
    return '';
  }
  return prefix + x + suffix;
}

export function sumUnknown(a, b) {
  if (isSet(a) && isSet(b)) {
    return a + b;
  }
  return null;
}

export function convertSecondstoTime(millis) {
  if (!isSet(millis)) {
    return null;
  }
  const dateObj = new Date(millis);
  const hours = dateObj.getUTCHours();
  const minutes = dateObj.getUTCMinutes();
  const seconds = dateObj.getSeconds();

  let hourPrefix = '';
  if (hours !== 0) {
    hourPrefix = `${hours.toString().padStart(2, '0')
    }:`;
  }

  const timeString = `${hourPrefix + minutes.toString().padStart(2, '0')
  }:${seconds.toString().padStart(2, '0')}`;

  return timeString;
}

export function humanizeDuration(p, d) {
  if (!isSet(p) && !isSet(d)) {
    return null;
  }

  if (isSet(p) && !isSet(d)) {
    return convertSecondstoTime(p);
  }

  let fakeP = p;
  if (isSet(p) && isSet(d)) {
    if (p > d) {
      fakeP = d;
    }
    return `${convertSecondstoTime(fakeP)} / ${convertSecondstoTime(d)}`;
  }
  return null;
}

export function truncateString(str, num) {
  // Slice 'str' upto the given length
  const res = str.slice(0, num);
  // If 'num' (max-length) is <=3 then, append '...'
  if (num <= 3) {
    return `${res}...`;
    // eslint-disable-next-line brace-style
  }

  // If 'str' length is greater than 'num' then slice the string
  // upto max-length and 3 more characters to accomodate '...'
  if (str.length > num) {
    return `${res.slice(0, res.length - 3)}...`;
  }
  return str;
}
