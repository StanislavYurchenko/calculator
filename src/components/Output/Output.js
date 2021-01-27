import { OutputStyled, TopBox, BottomBox } from './OutputStyled';

function Output({ stringMain, stringPrev }) {
  return (
    <OutputStyled>
      <TopBox>{stringPrev}</TopBox>
      <BottomBox>{stringMain}</BottomBox>
    </OutputStyled>
  );
}

export default Output;
