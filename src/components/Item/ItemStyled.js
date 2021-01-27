import styled, { css } from 'styled-components';

const size = 55; //px
const margin = 5; //px

export const ButtonStyled = styled.button`
  margin: ${margin.toString() + 'px'};
  width: ${size.toString() + 'px'};

  height: ${size.toString() + 'px'};
  border: none;
  border-radius: ${(1 / 2) * size.toString() + 'px'};
  color: #ffffff;
  font-size: 24px;
  outline: none;
  user-select: none;
  transition: all 0.3s linear;

  :active {
    color: red;
    box-shadow: inset 0 0 5px red;
  }

  ${props =>
    css`
      background-color: ${props.option.color};
    `}
  ${props =>
    props.option.size === 'double' &&
    css`
      width: ${2 * size.toString() + 2 * margin + 'px'};
    `};
`;

export const ItemStyled = styled.li`
  margin: 0;
  padding: 0;
  list-style: none;
`;
