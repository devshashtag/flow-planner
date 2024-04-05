// formating numbers by comma
function commafy(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// get time based on timezone
function getDate(timeZone = 'Asia/tehran') {
  const options = {
    timeZone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  const persianToEnglishMap = {
    '۰': '0',
    '۱': '1',
    '۲': '2',
    '۳': '3',
    '۴': '4',
    '۵': '5',
    '۶': '6',
    '۷': '7',
    '۸': '8',
    '۹': '9',
  };

  const [date, time] = new Date()
    .toLocaleString('fa-IR', options)
    .split(', ')
    .map((item) => {
      return item.replace(/[۰-۹]/g, (match) => persianToEnglishMap[match]);
    });

  return { date, time };
}

export { getDate };
