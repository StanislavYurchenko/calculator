import { useEffect, useState } from 'react';

import Output from '../Output/Output';
import Container from '../Container/Container';
import Item from '../Item/Item';
import List from '../List/List';
import { controlOptions } from './controlOptions';

function Calculator() {
  const [outputMain, setOutputMain] = useState('');
  const [outputPrev, setOutputPrev] = useState('');
  const [prevInput, setPrevInput] = useState('');
  const [actualInput, setActualInput] = useState('');
  const [action, setAction] = useState('');
  const [memory, setMemory] = useState(0);

  useEffect(() => {
    setOutputMain(`${prevInput} ${action} ${actualInput}`);
  }, [actualInput, prevInput, action]);

  useEffect(() => {
    const onKeypress = event => {
      const value = event.key;
      eventHandler(value);
    };

    document.addEventListener('keypress', onKeypress);

    return () => {
      document.removeEventListener('keypress', onKeypress);
    };
  }, []);

  const eventHandler = value => {
    if (/[0-9]/.test(value)) {
      setActualInput(state => Number.parseFloat(state + value).toString());
      return;
    }

    if (/^\+$|^-$|^\/$|^\*$/gi.test(value)) {
      setPrevInput(actualInput);
      setActualInput('');
      setAction(value);
      return;
    }

    if (value === '+/-') {
      setActualInput(state => (Number(state) * -1).toString());
      return;
    }

    if (value === '.' && !actualInput.toString().includes('.')) {
      setActualInput(state => state.toString() + value);
      return;
    }

    if (value === 'AC') {
      setActualInput('');
      setPrevInput('');
      setOutputPrev('');
      setAction('');
      setOutputMain('');

      // for button "A"
      // setActualInput(state => state.toString().slice(0, -1));
      return;
    }

    if (value === 'mc') {
      setMemory(0);
      setActualInput('');
      return;
    }

    if (value === 'mr') {
      setActualInput(memory.toString());
      setMemory(0);
      return;
    }

    if (value === 'm-') {
      setMemory(state => state - Number(actualInput));
      setActualInput('');
      return;
    }

    if (value === 'm+') {
      setMemory(state => state + Number(actualInput));
      setActualInput('');
      return;
    }

    if (value === '%') {
      setActualInput(state =>
        ((Number(prevInput) * Number(state)) / 100).toString(),
      );
      return;
    }

    if (value === '=' || value === 'Enter') {
      let result;
      if (!Number(prevInput) && !action) return;

      if (!Number(prevInput)) {
        setPrevInput('0');
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
          result = actualInput
            ? Number(prevInput) / Number(actualInput)
            : 'impossible';
          break;

        default:
          result = 0;
          break;
      }

      const input =
        result === 'impossible' ? '' : Number(result.toFixed(6)).toString();

      setOutputPrev(outputMain);
      setActualInput(input);
      setPrevInput('');
      setAction('');
    }
  };

  const onClick = event => {
    const value = event.currentTarget.name;
    eventHandler(value);
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
