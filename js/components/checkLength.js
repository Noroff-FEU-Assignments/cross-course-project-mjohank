export function checkLength(value, inputLength) {
  if (value.trim().length > inputLength) {
    return true;
  } else {
    return false;
  }
}
