import { lightTheme, darkTheme } from './Themes';

export const SWITCH_THEME = 'SWITCH_THEME';

function onSwichTheme(theme) {
    if (theme === 'darkTheme') {
        return {
            currentTheme: 'lightTheme',
            ...lightTheme
        }
    } else {
        return {
            currentTheme: 'darkTheme',
            ...darkTheme
        }
    }
};

export const switchTheme = (theme) => ({
    type: SWITCH_THEME,
    payload: onSwichTheme(theme)
});