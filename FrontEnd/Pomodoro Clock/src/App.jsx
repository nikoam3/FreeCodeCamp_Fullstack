import { useState, useEffect, useRef } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import './App.css';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // En segundos
  const [timerLabel, setTimerLabel] = useState('Session');
  const [isRunning, setIsRunning] = useState(false);
  const audioRef = useRef(null);

  // Formato mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Incrementar/Decrementar break y session
  const handleBreakDecrement = () => {
    if (breakLength > 1 && !isRunning) {
      setBreakLength(breakLength - 1);
      if (timerLabel === 'Break') setTimeLeft((breakLength - 1) * 60);
    }
  };

  const handleBreakIncrement = () => {
    if (breakLength < 60 && !isRunning) {
      setBreakLength(breakLength + 1);
      if (timerLabel === 'Break') setTimeLeft((breakLength + 1) * 60);
    }
  };

  const handleSessionDecrement = () => {
    if (sessionLength > 1 && !isRunning) {
      setSessionLength(sessionLength - 1);
      if (timerLabel === 'Session') setTimeLeft((sessionLength - 1) * 60);
    }
  };

  const handleSessionIncrement = () => {
    if (sessionLength < 60 && !isRunning) {
      setSessionLength(sessionLength + 1);
      if (timerLabel === 'Session') setTimeLeft((sessionLength + 1) * 60);
    }
  };

  // Temporizador
  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      audioRef.current.play();
      if (timerLabel === 'Session') {
        setTimerLabel('Break');
        setTimeLeft(breakLength * 60);
      } else {
        setTimerLabel('Session');
        setTimeLeft(sessionLength * 60);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, timerLabel, breakLength, sessionLength]);

  // Start/Stop
  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  // Reset
  const handleReset = () => {
    setIsRunning(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setTimerLabel('Session');
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  return (
    <Container id="clock" className="">
      <Card className="position-absolute top-50 start-50 translate-middle clock-card shadow-lg">
        <Card.Body>
          <h1 className="text-center mb-4">25 + 5 Clock</h1>
          <div className="d-flex justify-content-between mb-4">
            <div>
              <h3 id="break-label">Break Length</h3>
              <div className="d-flex align-items-center justify-content-between">
                <Button
                  id="break-decrement"
                  variant="outline-primary"
                  onClick={handleBreakDecrement}
                  className="clock-button"
                >
                  <i className="fas fa-minus"></i>
                </Button>
                <span id="break-length" className="mx-3">
                  {breakLength}
                </span>
                <Button
                  id="break-increment"
                  variant="outline-primary"
                  onClick={handleBreakIncrement}
                  className="clock-button"
                >
                  <i className="fas fa-plus"></i>
                </Button>
              </div>
            </div>
            <div>
              <h3 id="session-label">Session Length</h3>
              <div className="d-flex align-items-center justify-content-between">
                <Button
                  id="session-decrement"
                  variant="outline-primary"
                  onClick={handleSessionDecrement}
                  className="clock-button"
                >
                  <i className="fas fa-minus"></i>
                </Button>
                <span id="session-length" className="mx-3">
                  {sessionLength}
                </span>
                <Button
                  id="session-increment"
                  variant="outline-primary"
                  onClick={handleSessionIncrement}
                  className="clock-button"
                >
                  <i className="fas fa-plus"></i>
                </Button>
              </div>
            </div>
          </div>
          <div className="text-center">
            <h2 id="timer-label">{timerLabel}</h2>
            <h1 id="time-left" className="display-4">
              {formatTime(timeLeft)}
            </h1>
            <Button
              id="start_stop"
              variant={isRunning ? 'warning' : 'success'}
              onClick={handleStartStop}
              className="clock-button mx-2"
            >
              <i className={isRunning ? 'fas fa-pause' : 'fas fa-play'}></i>
            </Button>
            <Button
              id="reset"
              variant="danger"
              onClick={handleReset}
              className="clock-button mx-2"
            >
              <i className="fas fa-sync-alt"></i>
            </Button>
            <h5 id="timer-label" className='mt-3'>Nicolas Amaya for FreeCodeCamp</h5>
          </div>
          <audio id="beep" ref={audioRef} src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav" />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;