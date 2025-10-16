import styled from 'styled-components';

export const Year = styled.div<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 10rem;
  font-weight: bold;
  @media (max-width: 889px) {
    font-size: 7.8rem;
  }
  @media (max-width: 767px) {
    font-size: 5.7rem;
  }
  @media (max-width: 599px) {
    font-size: 4rem;
  }
`;
