const breakPoints = {
  mobile: 420,
  tablet: 768,
  notebook: 1200
};

const colors = {
  white: '#ffffff',
  black: '#000000',
  mainColor: '#12b886',
  grey: '#666666',
  darkgrey: '#121212',
  onFilter: 'invert(50%) sepia(38%) saturate(2703%) hue-rotate(128deg) brightness(99%) contrast(86%)',
  unFilter: 'invert(41%) sepia(4%) saturate(19%) hue-rotate(45deg) brightness(92%) contrast(84%)',
};

const fontSize = {
  xs: '1.2rem',
  sm: '1.4rem',
  base: '1.6rem',
  mi: '1.8rem',
  lg: '2rem',
  xl: '2.2rem'
};

const fontWeight = {
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700
};

const theme = {breakPoints, colors, fontSize, fontWeight};
export default theme;