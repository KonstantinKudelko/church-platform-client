export const getJWTToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return `Bearer ${user.token}`;
};
