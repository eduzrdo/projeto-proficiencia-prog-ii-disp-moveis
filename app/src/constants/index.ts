import { TextStyle } from 'react-native'

export const colors = {
  primary: {
    500: '#06F9F9',
    600: '#00DDDD',
    700: '#04BFBF',
    800: '#07A1A1'
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

  correct: '#0FA31E',
  wrong: '#DF3333',
}

export const sizes = {
  borderRadius: 8,
}

export const typography: { [key: string]: TextStyle } = {
  text: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    lineHeight: 23,
    color: colors.light['800'],
  },
  textSemibold: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    lineHeight: 23,
    color: colors.light['800'],
  },
  smallText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 21
  },
  button: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: colors.light['800'],
  },
  title: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 24,
    color: colors.light['800']
  },
  subtitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: colors.light['800']
  }
}