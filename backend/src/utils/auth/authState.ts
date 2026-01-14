export const issueAuthState = (isAuth: boolean): string => {
  const authStateStr = JSON.stringify(isAuth);
  return authStateStr;
};
