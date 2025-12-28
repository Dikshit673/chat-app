export const issueAuthState = (isAuth: boolean): string => {
  const authStateStr = JSON.stringify(isAuth);
  console.log(authStateStr);
  return authStateStr;
};
