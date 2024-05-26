function getDateOrNull(date: string | Date) {
  if (date instanceof Date) {
    return date;
  }
  if (date.length > 10) {
    const verifiedDate = new Date(date);
    if (!isNaN(verifiedDate.getTime())) {
      return verifiedDate;
    }
  }

  try {
    const separator = date.includes("/") ? "/" : "-";
    const [day, month, year] = date.split(separator).map(Number);

    const convertedDate = new Date(year, month - 1, day);

    if (
      convertedDate.getFullYear() === year &&
      convertedDate.getMonth() === month - 1 &&
      convertedDate.getDate() === day
    ) {
      return convertedDate;
    } else {
      throw new Error("Invalid date");
    }
  } catch (e) {
    return null;
  }
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
