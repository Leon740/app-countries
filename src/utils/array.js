export function fnFindIntersectionArray(array1, array2) {
  const array = array1.filter((item) => array2.includes(item));
  return array;
}

export function fnFindUniqueArray(array1, array2) {
  const array = array1.filter((item) => !array2.includes(item));
  return array;
}
