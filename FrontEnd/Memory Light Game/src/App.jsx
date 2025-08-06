import { useState, useEffect, useRef } from 'react';
import { Container, Card, Button, Row, Col, Alert, Form } from 'react-bootstrap';
import './App.css';

function App() {
  const [sequence, setSequence] = useState([]); // Secuencia de botones
  const [playerSequence, setPlayerSequence] = useState([]); // Entrada del usuario
  const [isPlayingSequence, setIsPlayingSequence] = useState(false); // Reproduciendo secuencia
  const [isGameOn, setIsGameOn] = useState(false); // Juego encendido/apagado
  const [strictMode, setStrictMode] = useState(false); // Modo estricto
  const [count, setCount] = useState(0); // Contador de pasos
  const [message, setMessage] = useState(''); // Mensaje de estado
  const audioRefs = useRef({
    green: new Audio('https://cdn.freecodecamp.org/curriculum/take-home-projects/memory-light-game/sound-1.mp3'),
    red: new Audio('https://cdn.freecodecamp.org/curriculum/take-home-projects/memory-light-game/sound-2.mp3'),
    yellow: new Audio('https://cdn.freecodecamp.org/curriculum/take-home-projects/memory-light-game/sound-3.mp3'),
    blue: new Audio('https://cdn.freecodecamp.org/curriculum/take-home-projects/memory-light-game/sound-4.mp3'),
  });

  const colors = ['green', 'red', 'yellow', 'blue'];

  // Genera un nuevo paso aleatorio
  const addStepToSequence = () => {
    const randomColor = colors[Math.floor(Math.random() * 4)];
    setSequence((prev) => [...prev, randomColor]);
    setCount((prev) => prev + 1);
  };

  // Reproduce la secuencia de botones
  const playSequence = () => {
    if (!isGameOn) return;
    setIsPlayingSequence(true);
    setPlayerSequence([]);
    let i = 0;
    const interval = setInterval(() => {
      if (i >= sequence.length) {
        clearInterval(interval);
        setIsPlayingSequence(false);
        return;
      }
      const color = sequence[i];
      const button = document.getElementById(color);
      if (button) {
        button.classList.add('active');
        audioRefs.current[color].play();
        setTimeout(() => {
          button.classList.remove('active');
        }, 500);
      }
      i++;
    }, 1000);
  };

  // Maneja el clic del usuario en un botón
  const handleButtonClick = (color) => {
    if (!isGameOn || isPlayingSequence || winner) return;
    const button = document.getElementById(color);
    if (button) {
      button.classList.add('active');
      audioRefs.current[color].play();
      setTimeout(() => {
        button.classList.remove('active');
      }, 500);
    }
    setPlayerSequence((prev) => [...prev, color]);
  };

  // Reinicia el juego
  const resetGame = (newSequence = false) => {
    setPlayerSequence([]);
    setIsPlayingSequence(false);
    setMessage('');
    if (newSequence) {
      setSequence([]);
      setCount(0);
      setTimeout(() => {
        addStepToSequence();
      }, 500);
    } else {
      setCount(sequence.length);
    }
  };

  // Inicia/apaga el juego
  const toggleGame = () => {
    if (isGameOn) {
      setIsGameOn(false);
      setSequence([]);
      setPlayerSequence([]);
      setCount(0);
      setMessage('');
      setIsPlayingSequence(false);
    } else {
      setIsGameOn(true);
      setSequence([]);
      setCount(0);
      setTimeout(() => {
        addStepToSequence();
      }, 500);
    }
  };

  // Verifica la entrada del usuario
  useEffect(() => {
    if (playerSequence.length === 0 || isPlayingSequence || !isGameOn) return;
    const currentStep = playerSequence.length - 1;
    if (playerSequence[currentStep] !== sequence[currentStep]) {
      setMessage('¡Error! Intenta de nuevo.');
      if (strictMode) {
        resetGame(true); // Nueva secuencia en modo estricto
      } else {
        setPlayerSequence([]);
        setTimeout(() => {
          setMessage('');
          playSequence();
        }, 1000);
      }
    } else if (playerSequence.length === sequence.length) {
      if (sequence.length === 20) {
        setMessage('¡Victoria! Has ganado.');
        setTimeout(() => resetGame(true), 2000);
      } else {
        setTimeout(() => {
          addStepToSequence();
        }, 500);
      }
    }
  }, [playerSequence, isPlayingSequence, isGameOn, strictMode, sequence]);

  // Reproduce la secuencia cuando se actualiza
  useEffect(() => {
    if (sequence.length > 0 && isGameOn) {
      playSequence();
    }
  }, [sequence, isGameOn]);

  // Estado de victoria
  const winner = sequence.length === 20 && playerSequence.length === 20 && playerSequence.every((val, i) => val === sequence[i]);

  return (
    <Container id="simon" className="min-vh-100 d-flex align-items-center justify-content-center my-3">
      <Card className="game-card shadow-lg position-absolute top-50 start-50 translate-middle">
        <Card.Body>
          <h2 className="text-center mb-4">Juego de Memoria de Luz</h2>
          <Alert id="display" variant={message.includes('Victoria') ? 'success' : message.includes('Error') ? 'danger' : 'info'} className="text-center">
            {message || `Pasos: ${count}`}
          </Alert>
          <div className="simon-board">
            <Row>
              {colors.map((color) => (
                <Col key={color} xs={6} className="mb-2">
                  <div
                    id={color}
                    className={`simon-button ${color}`}
                    onClick={() => handleButtonClick(color)}
                  ></div>
                </Col>
              ))}
            </Row>
          </div>
          <div className="controls d-flex flex-column align-items-center mt-3">
            <Form.Check
              type="switch"
              id="strict-button"
              label="Modo Estricto"
              checked={strictMode}
              onChange={() => setStrictMode(!strictMode)}
              disabled={!isGameOn}
            />
            <div className="d-flex gap-2 mt-2">
              <Button id="start-button" variant={isGameOn ? 'danger' : 'success'} onClick={toggleGame}>
                {isGameOn ? 'Apagar' : 'Encender'}
              </Button>
              <Button id="reset-button" variant="secondary" onClick={() => resetGame(true)} disabled={!isGameOn}>
                Reiniciar
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;