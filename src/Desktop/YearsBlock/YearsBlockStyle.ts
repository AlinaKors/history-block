import styled from 'styled-components';

export const Year = styled.div<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 200px;
  line-height: 1.6;
  letter-spacing: -0.2;
  font-weight: bold;
`;
