import styled from 'styled-components';
import theme from '../styles/theme';

const StrongStyle = styled.strong`
  font-size: ${({fontSize}) => fontSize || theme.fontSize.xl};
  font-weight: ${({fontWeight}) => fontWeight || theme.fontWeight.medium};
  line-height: ${({$lineHeight}) => $lineHeight || '1.6'};
`;
export const Strong = ({children, fontSize, fontWeight, lineHeight}) => {
  return <StrongStyle fontSize={fontSize} fontWeight={fontWeight} $lineHeight={lineHeight}>{children}</StrongStyle>
};

const SpanStyle = styled.span`
  font-size: ${({fontSize}) => fontSize || theme.fontSize.sm};
  font-weight: ${({fontWeight}) => fontWeight || theme.fontWeight.regular};
  line-height: 1.2;
`;
export const Span = ({children, fontSize, fontWeight}) => {
  return <SpanStyle fontSize={fontSize} fontWeight={fontWeight}>{children}</SpanStyle>
};

const PStyle = styled.p`
  font-size: ${({ fontSize, theme }) => fontSize || theme?.fontSize?.base};
  line-height: ${({$lineHeight}) => $lineHeight || '1.2'}
`;
export const P = ({children, fontSize, lineHeight}) => {
  return <PStyle fontSize={fontSize} $lineHeight={lineHeight}>{children}</PStyle>
};

export const TitWrap = ({text}) => {
  return (
    <div className="tit-wrap">
      <Strong>{text}</Strong>
    </div>
  )
};