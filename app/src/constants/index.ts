import { TextStyle } from 'react-native'

export const colors = {
  primary: {
    500: '#06F9F9',
    700: '#07A1A1',
    800: '#1F1F1F'
  },

  light: {
    100: '#F2F2F2',
    300: '#B3B3B3',
    400: '#999999',
    600: '#666666',
    800: '#1F1F1F',
    900: '#121212',
  },

  ranks: {
    copper: '#FB923C',
    silver: '#DCDCE2',
    gold: '#FFD631',
  },

  white: '#fff',
  black: '#000',
}

export const sizes = {
  borderRadius: 8,
}

export const typography: { [key: string]: TextStyle } = {
  text: {
    fontSize: 14,
    color: colors.light['800'],
    fontWeight: '600'
  },
  textGray: {
    fontSize: 14,
    color: colors.light['600'],
  },
  button: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.light['800'],
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.light['800']
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.light['800']
  }
}