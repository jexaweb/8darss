export const loginError = (data) => {
  if (!data?.email) return "Email is required";
  if (!data?.password) return "Password is required";
  return null;
};
