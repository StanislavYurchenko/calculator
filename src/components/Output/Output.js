import { OutputStyled, TopBox, BottomBox } from './OutputStyled';

function Output({ stringMain, stringPrev }) {
  return (
    <OutputStyled>
      <TopBox fontSize={stringPrev.length}>{stringPrev}</TopBox>
      <BottomBox fontSize={stringMain.length}>{stringMain}</BottomBox>
    </OutputStyled>
  );
}

export default Output;
