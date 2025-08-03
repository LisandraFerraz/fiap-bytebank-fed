export const errorResponse = (resBody: any) => {
  if (resBody.statusCode) {
    if (resBody.statusCode !== 200 || resBody.statusCode !== 201) {
      return true;
    }
    return false;
  }
  return false;
};
