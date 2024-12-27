export const convertCourseTimeFormat = (timeString: string) => {
  const [hours, minutes] = timeString.split(':').map(Number);

  const totalMinutes = hours * 60 + minutes;

  const newHours = Math.floor(totalMinutes / 60);
  const newMinutes = totalMinutes % 60;

  const formattedTime = `${newHours}h ${newMinutes}min`;

  return formattedTime;
};

export const convertTimeFormat = (inputTimestamp: string) => {
  const date = new Date(inputTimestamp);

  const monthNames = [
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

  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  const outputDate = month + ' ' + day + ', ' + year;

  return outputDate;
};

export const convertCourseCreationTime = (timeString: string): any => {
  const inputDate = new Date(timeString);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthsOfYear = [
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

  const dayOfWeek = daysOfWeek[inputDate.getUTCDay()];
  const month = monthsOfYear[inputDate.getUTCMonth()];
  const day = inputDate.getUTCDate();
  const year = inputDate.getUTCFullYear();

  // const result = `${dayOfWeek} • ${month} ${day < 10 ? '0' : ''}${day}, ${year}`;

  const data = {
    day: `${dayOfWeek}`,
    month: `${month} ${day < 10 ? '0' : ''}${day}`,
  };
  return data;
};
