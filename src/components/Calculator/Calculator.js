import { useEffect, useState } from 'react';

import Output from '../Output/Output';
import Container from '../Container/Container';
import Item from '../Item/Item';
import List from '../List/List';
import { controlOptions } from './controlOptions';

function Calculator() {
  const [outputMain, setOutputMain] = useState('0');
  const [outputPrev, setOutputPrev] = useState('wrtw');
  const [prevInput, setPrevInput] = useState('');
  const [actualInput, setActualInput] = useState('');
  const [action, setAction] = useState('');
  const [memory, setMemory] = useState(0);

  useEffect(() => {
    const output = `${prevInput} ${action} ${actualInput}`;

    setOutputMain(output);
  }, [actualInput, prevInput, action]);

  const onClick = event => {
    const value = event.currentTarget.name;

    if (/[0-9]/.test(value)) {
      console.log('test1');
      setActualInput(state => state + value);
      return;
    }

    if (/^\+$|^-$|^\/$|^\*$/gi.test(value)) {
      console.log('test2');
      setPrevInput(actualInput);
      setActualInput('');
      setAction(value);
      return;
    }

    if (value === '+/-') {
      console.log('test3');
      setActualInput(state => state * -1);
      return;
    }

    if (value === '.' && !actualInput.includes('.')) {
      console.log('test4');
      setActualInput(state => state + value);
      return;
    }

    if (value === 'AC') {
      console.log('test5');
      if (actualInput.length === 0) return setAction('');

      setActualInput(state => state.toString().slice(0, -1));
      return;
    }

    if (value === 'mc') {
      console.log('test6');
      setMemory(0);
      return;
    }

    if (value === 'mr') {
      console.log('test7');
      setActualInput(memory);
      return;
    }

    if (value === 'm-') {
      console.log('test8');
      setMemory(state => state - Number(actualInput));
      return;
    }

    if (value === 'm+') {
      console.log('test8');
      setMemory(state => state + Number(actualInput));
      return;
    }

    if (value === '%') {
      console.log('test9');
      setActualInput(state => (Number(prevInput) * Number(state)) / 100);
      return;
    }

    if (value === '=') {
      console.log('test10');
      let result;
      if (!Number(prevInput)) {
        setPrevInput(0);
        // return;
      }
      // eval() isn't recommend for safety
      switch (action) {
        case '+':
          result = Number(prevInput) + Number(actualInput);
          break;

        case '-':
          result = Number(prevInput) - Number(actualInput);
          break;

        case '*':
          result = Number(prevInput) * Number(actualInput);
          break;

        case '/':
          result =
            actualInput === '0'
              ? 'impossible'
              : Number(prevInput) / Number(actualInput);
          break;

        default:
          result = 0;
          break;
      }

      setOutputPrev(outputMain);

      setActualInput(Number(result.toFixed(6)));
      setPrevInput('');
      setAction('');
    }
  };

  return (
    <Container>
      <Output stringMain={outputMain} stringPrev={outputPrev} />
      <List>
        {controlOptions.map(option => (
          <Item key={option.name} action={onClick} option={option} />
        ))}
      </List>
    </Container>
  );
}

export default Calculator;
