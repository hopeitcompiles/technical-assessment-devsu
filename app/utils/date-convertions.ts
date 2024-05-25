function getDateOrNull(date: string) {
  if (!isValidDate) {
    return null;
  }
  const splitedDate = date.replaceAll("/", "-").split("-");
  console.log(splitedDate);
  if (splitedDate.length !== 3) {
    return null;
  }
  const _date = new Date(splitedDate.join("-"));
  if (isNaN(_date.getTime())) {
    return null;
  }
  console.log(_date);
  return _date;
}

function isValidDate(date: Date | string | undefined) {
  if (!date) {
    return false;
  }
  const _date = typeof date === "string" ? new Date(date) : date;

  return !isNaN(_date.getTime());
}

function formatWithTime(date: Date | string) {
  const _date = typeof date === "string" ? new Date(date) : date;

  if (isNaN(_date.getTime())) {
    return date.toString();
  }
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const formattedDate = new Intl.DateTimeFormat("es-ES", options).format(_date);
  return formattedDate;
}

function formatSimple(date: Date | string) {
  const _date = typeof date === "string" ? new Date(date) : date;

  if (isNaN(_date.getTime())) {
    return date.toString();
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = new Intl.DateTimeFormat("es-ES", options).format(_date);
  return formattedDate;
}

const dateFormat = {
  withTime: formatWithTime,
  simple: formatSimple,
  isValidDate,
  getDateOrNull,
};
export { dateFormat };
