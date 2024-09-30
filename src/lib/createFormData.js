export function createFormData(form) {
  return Object.fromEntries(new FormData(form).entries());
}
