export const importToLocalStorage = (name, input) => {
  return localStorage.setItem(name, JSON.stringify(input));
};
export const exportFromLocalStorage = (name) => {
  let isValid = localStorage.getItem(name);
  let data = isValid ? JSON.parse(localStorage.getItem(name)) : "";
  return data;
};
export const deleteFromLocalStorage = (name) => {
  return localStorage.removeItem(name);
};
