import { css } from 'styled-components';

export const flexBox = (
  direction, 
  justify, 
  align, 
  wrap = 'nowrap',
  gap = '0'
) => css`
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${align};
  ${wrap && `flex-wrap: ${wrap};`}
  ${gap && `gap: ${gap};`}
`;

export const ellipsis = (num = 1) => {
  if (num === 1) {
    return css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `;
  } else {
    return css`
      display: -webkit-box;
      overflow: hidden;
      word-break: keep-all;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: ${num};
    `;
  }
};

type BorderDirection = 'top' | 'bottom' | 'left' | 'right' | 'all';

export const border = (width, style, color, direction: BorderDirection = 'all') => {
  if (direction === 'all') {
    return css`border: ${width} ${style} ${color};`;
  }
  return css`border-${direction}: ${width} ${style} ${color};`;
};

export const spacing = {
  mt: (value: number) => css`margin-top: ${value}rem;`,
  mb: (value: number) => css`margin-bottom: ${value}rem;`,
  ml: (value: number) => css`margin-left: ${value}rem;`,
  mr: (value: number) => css`margin-right: ${value}rem;`,
  mx: (left: number, right: number) => css`
    margin-left: ${left}rem;
    margin-right: ${right}rem;
  `,
  my: (top: number, bottom: number) => css`
    margin-top: ${top}rem;
    margin-bottom: ${bottom}rem;
  `,
  m: (top: number, bottom: number, left: number, right: number) => css`
    margin-top: ${top}rem;
    margin-bottom: ${bottom}rem;
    margin-left: ${left}rem;
    margin-right: ${right}rem;
  `,
  mc: (value: number) => css`margin: ${value}rem;`,
  ma: css`margin: 0 auto;`
};

export const blank = {
  pt: (value: number) => css`padding-top: ${value}rem;`,
  pb: (value: number) => css`padding-bottom: ${value}rem;`,
  pl: (value: number) => css`padding-left: ${value}rem;`,
  pr: (value: number) => css`padding-right: ${value}rem;`,
  px: (left: number, right: number) => css`
    padding-left: ${left}rem;
    padding-right: ${right}rem;
  `,
  py: (top: number, bottom: number) => css`
    padding-top: ${top}rem;
    padding-bottom: ${bottom}rem;
  `,
  p: (top: number, bottom: number, left: number, right: number) => css`
    padding-top: ${top}rem;
    padding-bottom: ${bottom}rem;
    padding-left: ${left}rem;
    padding-right: ${right}rem;
  `,
  pc: (value: number) => css`padding: ${value}rem;`
};
