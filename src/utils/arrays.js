export function fnFindIntersectionArray(...arrays) {
  let result = arrays[0];
  for (let i = 1; i < arrays.length; i += 1) {
    result = result.filter((item) => arrays[i].includes(item));
  }
  return result;
}

export function fnFindUniqueArray(...arrays) {
  let result = arrays[0];
  for (let i = 1; i < arrays.length; i += 1) {
    result = result.filter((item) => !arrays[i].includes(item));
  }
  return result;
}
