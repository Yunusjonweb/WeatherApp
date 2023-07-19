import {extendTheme} from 'native-base';
import {colors} from './variables';

export const theme = extendTheme({
  colors,
  components: {
    Text: {
      baseStyle: {
        color: 'main.100',
      },
      defaultProps: {
        size: 'md',
        fontFamily: 'Poppins-Regular',
      },
      sizes: {
        '2xs': {fontSize: 10},
        xs: {fontSize: 12},
        sm: {fontSize: 14},
        md: {fontSize: 16},
        lg: {fontSize: 18},
        xl: {fontSize: 20},
        '2xl': {fontSize: 22},
        '3xl': {fontSize: 24},
        '4xl': {fontSize: 26},
        '5xl': {fontSize: 28},
        '6xl': {fontSize: 30},
        '7xl': {fontSize: 32},
        '8xl': {fontSize: 34},
        '9xl': {fontSize: 36},
      },
    },
    Input: {
      baseStyle: {
        rounded: 'lg',
        height: '50px',
        borderColor: 'gray.50',
        invalidOutlineColor: 'red.100',
        paddingLeft: '24px',
        paddingRight: '24px',
        _input: {
          fontSize: 'lg',
          color: 'gray.50',
          textTransform: 'lowercase',
        },
        _focus: {
          backgroundColor: 'transparent',
          _icon: {color: 'white.100'},
          _input: {
            color: 'white.100',
            fontWeight: '600',
          },
        },
      },
      defaultProps: {
        borderWidth: '2px',
      },
    },
    fonts: {
      heading: 'Poppins-Bold',
      body: 'Poppins-Regular',
      mono: 'Poppins-Regular',
      semibold: 'Poppins-SemiBold',
    },
  },
});
