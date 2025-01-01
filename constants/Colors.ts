const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    cardBackground: '#f9f9f9',
    welcomeText: 'rgba(249, 161, 52, 1)',
    inverted: '#151718', // Inverted color for light mode
    AuthButton: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    cardBackground: '#1f1f1f',
    welcomeText: 'rgba(255, 191, 0, 1)',
    inverted: '#fff', // Inverted color for dark mode
    AuthButton: 'rgba(255, 191, 0, 1)',
  },
};
