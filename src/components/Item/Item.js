import { ItemStyled, ButtonStyled } from './ItemStyled';

function Item({ action, option }) {
  const type = option.name === '=' ? 'submit' : 'button';
  return (
    <ItemStyled>
      <ButtonStyled
        type={type}
        name={option.name}
        onClick={action}
        option={option}
      >
        {option.label}
      </ButtonStyled>
    </ItemStyled>
  );
}

export default Item;
