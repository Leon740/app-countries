export default function fnSanitize(value) {
  if (typeof value !== 'undefined') {
    if (typeof value === 'object') {
      return Object.values(value).map((valueItem) => valueItem.trim().toLowerCase());
    }

    return value.trim().toLowerCase();
  }

  return '';
}
