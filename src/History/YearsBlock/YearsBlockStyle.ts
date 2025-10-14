import styled from 'styled-components';

export const Year = styled.div<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 10rem;
  line-height: 160px;
  font-weight: bold;
`;
