export const isEmailValid = (email: string): boolean => {
  var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (email.match(regex)) return true;
  return false;
};
