const THEME = 'THEME';

const getTheme = () => JSON.parse(localStorage.getItem(THEME));
const saveTheme = theme => localStorage.setItem(THEME, JSON.stringify(theme));

export { getTheme, saveTheme }
