import styled from 'styled-components';
import theme from '../styles/theme';

const StrongStyle = styled.strong`
  font-size: ${({fontSize}) => fontSize || theme.fontSize.xl};
  font-weight: ${({fontWeight}) => fontWeight || theme.fontWeight.medium};
  line-height: ${({lineHeight}) => lineHeight || '1.6rem'};
`;

export const Strong = ({children, fontSize, fontWeight, lineHeight}) => {
  return <StrongStyle fontSize={fontSize} fontWeight={fontWeight} lineHeight={lineHeight}>{children}</StrongStyle>
};

const SpanStyle = styled.span`
  font-size: ${({fontSize}) => fontSize || theme.fontSize.sm};
  font-weight: ${({fontWeight}) => fontWeight || theme.fontWeight.regular};
  line-height: 1.2rem;
`;
export const Span = ({children, fontSize, fontWeight}) => {
  return <SpanStyle fontSize={fontSize} fontWeight={fontWeight}>{children}</SpanStyle>
};

export const TitWrap = ({text}) => {
  return (
    <div className="tit-wrap">
      <Strong>{text}</Strong>
    </div>
  )
};