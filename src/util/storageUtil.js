const USER = 'USER';

const getUser = () => {
  const user = localStorage.getItem(USER)
  return user ? JSON.parse(user) : null;
}
const saveUser = user => localStorage.setItem(USER, JSON.stringify(user));

export { getUser, saveUser }
