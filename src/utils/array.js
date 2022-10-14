export function fnFindIntersectionArray(array1, array2) {
  const array = array1.filter((item) => array2.includes(item));
  return array.length > 0 ? array : array1;
}

export function fnFindUniqueArray(array1, array2) {
  const array = array1.filter((item) => !array2.includes(item));
  return array;
}
