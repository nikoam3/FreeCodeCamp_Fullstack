import { useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { evaluate } from 'mathjs';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [isResult, setIsResult] = useState(false); // Indica si se mostró un resultado tras "="
  const handleClear = () => {
    setDisplay('0');
    setIsResult(false); // Resetea el estado al limpiar
  };

  const handleNumber = (num) => {
    if (isResult) {
      setDisplay(num);
      setIsResult(false);
    } else if (display === '0' && num !== '.') {
      setDisplay(num);
    } else if (display === '-0' && num !== '.') {
      setDisplay('-' + num);
    } else {
      // Evita ceros iniciales
      const lastNumber = display.split(/[\+\-\*\/]/).pop();
      if (lastNumber === '0' && num !== '.' && !lastNumber.includes('.')) {
        setDisplay(display.slice(0, -1) + num);
      } else {
        setDisplay(display + num);
      }
    }
  };

  const handleDecimal = () => {
    if (isResult) {
      setDisplay('0.');
      setIsResult(false);
    } else {
      const lastNumber = display.split(/[\+\-\*\/]/).pop();
      if (!lastNumber.includes('.')) {
        if (display === '0' || display.match(/[\+\-\*\/]$/)) {
          setDisplay(display + '0.');
        } else {
          setDisplay(display + '.');
        }
      }
    }
  };

  const handleOperator = (op) => {
    if (isResult) {
      setIsResult(false);
    }
    if (display.match(/[\+\-\*\/]$/)) {
      // Reemplaza el último operador, permite "-" tras otro operador
      if (op === '-' && !display.match(/[\+\-\*\/]-$/)) {
        setDisplay(display + op);
      } else {
        const trimmed = display.replace(/[\+\-\*\/]+$/, '');
        setDisplay(trimmed + op);
      }
    } else {
      setDisplay(display + op);
    }
  };
  const handleEquals = () => {
    try {
      // Maneja operador final o negativo
      let expression = display;
      if (expression.match(/[\+\-\*\/]$/)) {
        expression = expression.slice(0, -1);
      }
      const result = evaluate(expression);
      // Redondea a 4 decimales si es necesario
      setDisplay(Number(result.toFixed(4)).toString());
      setIsResult(true);
    } catch (error) {
      setDisplay('Error');
    }
  };

  return (
    <Container id="calculator" className="position-absolute top-50 start-50 translate-middle">
      <Card className="calculator-card shadow-lg position-absolute top-50 start-50 translate-middle">
        <Card.Body>
          <div id="display" className="display mb-3">
            {display}
          </div>
          <div className="d-grid gap-2">
            <div className="d-flex gap-2">
              <Button id="clear" className="flex-fill" variant="danger" onClick={handleClear}>
                AC
              </Button>
            </div>
            <div className="d-flex gap-2">
              <Button id="seven" variant="secondary" onClick={() => handleNumber('7')}>
                7
              </Button>
              <Button id="eight" variant="secondary" onClick={() => handleNumber('8')}>
                8
              </Button>
              <Button id="nine" variant="secondary" onClick={() => handleNumber('9')}>
                9
              </Button>
              <Button id="divide" variant="warning" onClick={() => handleOperator('/')}>
                /
              </Button>
            </div>
            <div className="d-flex gap-2">
              <Button id="four" variant="secondary" onClick={() => handleNumber('4')}>
                4
              </Button>
              <Button id="five" variant="secondary" onClick={() => handleNumber('5')}>
                5
              </Button>
              <Button id="six" variant="secondary" onClick={() => handleNumber('6')}>
                6
              </Button>
              <Button id="multiply" variant="warning" onClick={() => handleOperator('*')}>
                *
              </Button>
            </div>
            <div className="d-flex gap-2">
              <Button id="one" variant="secondary" onClick={() => handleNumber('1')}>
                1
              </Button>
              <Button id="two" variant="secondary" onClick={() => handleNumber('2')}>
                2
              </Button>
              <Button id="three" variant="secondary" onClick={() => handleNumber('3')}>
                3
              </Button>
              <Button id="subtract" variant="warning" onClick={() => handleOperator('-')}>
                -
              </Button>
            </div>
            <div className="d-flex gap-2">
              <Button id="zero" variant="secondary" onClick={() => handleNumber('0')}>
                0
              </Button>
              <Button id="decimal" variant="secondary" onClick={handleDecimal}>
                .
              </Button>
              <Button id="equals" variant="success" onClick={handleEquals}>
                =
              </Button>
              <Button id="add" variant="warning" onClick={() => handleOperator('+')}>
                +
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;