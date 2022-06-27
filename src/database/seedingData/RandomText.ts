const textData = [
  'Xuyên',
  'qua',
  'toàn',
  'dân',
  'ngự',
  'thú',
  'thời',
  'đại',
  'Tô',
  'Dịch',
  'phát',
  'hiện',
  'mình',
  'sủng',
  'thú',
  'lại',
  'có',
  'thể',
  'lựa',
  'chọn',
  'một',
  'đầu',
  'đặc',
  'thù',
  'tiến',
  'hóa',
  'lộ',
  'tuyến',
  'Đây',
  'là',
  'một',
  'cái',
  'yêu',
  'ma',
  'hoành',
  'hành',
  'nguy',
  'cơ',
  'tứ',
  'phía',
  'thế',
  'giới',
  'Xuyên',
  'việt',
  'đến',
  'đây',
  'Tần',
  'Thiểu',
  'Du',
  'hết',
  'lần',
  'này',
  'tới',
  'lần',
  'khác',
  'lại',
  'là',
  'đầu',
  'thai',
  'dẫn',
  'đầu',
  'cao',
  'nhất',
  'trấn',
  'yêu',
  'ti',
  'bên',
  'trong',
  'một',
  'thành',
  'viên',
  'Nhìn',
  'xem',
  'từng',
  'cái',
  'quỷ',
  'dị',
  'mặt',
  'nạ',
  'giảo',
  'hoạt',
  'hồ',
  'yêu',
  'đáng',
  'sợ',
  'xà',
  'tinh',
  'cùng',
  'giả',
  'mạo',
  'thần',
  'phật',
  'tà',
  'ma',
  'yêu',
  'quỷ',
  'Tần',
  'Thiểu',
  'Du',
  'chảy',
  'ra',
  'muốn',
  'ăn',
  'nước',
  'bọt',
  'Đóng',
  'cửa',
  'nấu',
  'nước',
  'chúng',
  'ta',
  'hôm',
  'nay',
  'ăn',
  'tiệc',
];

export const randomInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const capitalize = (string: string) => {
  const strings = string.split(' ');
  const capitalizeStrings = strings.map(
    string => string.charAt(0).toUpperCase() + string.slice(1),
  );
  let newText = '';
  capitalizeStrings.forEach(
    (cs, id) => (newText += id == capitalizeStrings.length ? cs : cs + ' '),
  );
  return newText;
};

export const randomText = (p: number, c: number, upper: boolean) => {
  let text = '';
  let total = c;
  for (let i = 0; i < p; i++) {
    let x;
    if (i == p - 1) x = total;
    else x = randomInterval(8, total - 8);
    total -= x;
    const aa = textData.sort(() => Math.random() - Math.random()).slice(0, x);
    let subtext = '';
    aa.forEach((a, id) => {
      if (id != aa.length - 1) subtext += a + ' ';
      else if (p != 1) subtext += a + '.';
      else subtext += a;
    });
    if (i != p - 1)
      text += upper
        ? capitalize(subtext)
        : capitalizeFirstLetter(subtext) + '\\n';
    else text += upper ? capitalize(subtext) : capitalizeFirstLetter(subtext);
  }
  return text;
};

export const getMultipleRandom = (arr: Array<string>, num: number) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

export const getOneRandom = (arr: Array<string>) => {
  return arr[Math.floor(Math.random() * arr.length)];
};
