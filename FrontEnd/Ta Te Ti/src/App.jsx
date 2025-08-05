import { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col, Alert } from 'react-bootstrap';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState(null); // null, 'X', o 'O' (solo para modo single)
  const [gameMode, setGameMode] = useState(null); // null, 'single', o 'multi'
  const [currentTurn, setCurrentTurn] = useState('X'); // Turno actual
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  // Combinaciones ganadoras
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
    [0, 4, 8], [2, 4, 6], // Diagonales
  ];

  // Verifica si hay un ganador
  const checkWinner = (currentBoard) => {
    for (const [a, b, c] of winningCombinations) {
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }
    return null;
  };

  // Verifica si es empate
  const checkDraw = (currentBoard) => {
    return currentBoard.every((cell) => cell !== null) && !checkWinner(currentBoard);
  };

  // Movimiento de la computadora (solo en modo single)
  const computerMove = (currentBoard) => {
    if (winner || isDraw) return; // Evita jugadas si el juego terminó
    const computerSymbol = player == 'X' ? 'O' : 'X';
    let move;

    for (let i = 0; i < currentBoard.length; i++) {
      const randomIndice = Math.floor(Math.random() * 9);
      if (currentBoard[randomIndice] === null) {
        move = randomIndice;
        break;
      }
    }
    const newBoard = [...currentBoard];
    newBoard[move] = computerSymbol;
    setBoard(newBoard);
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else if (checkDraw(newBoard)) {
      setIsDraw(true);
    }
    setCurrentTurn(player); // Vuelve al turno del jugador
  };

  // Maneja el clic del usuario
  const handleClick = (index) => {
    if (board[index] || winner || isDraw) return;
    if (gameMode === 'single' && currentTurn !== player) return; // Solo permite el turno del jugador

    const newBoard = [...board];
    const symbol = gameMode === 'multi' ? currentTurn : player;
    newBoard[index] = symbol;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else if (checkDraw(newBoard)) {
      setIsDraw(true);
    } else if (gameMode === 'single') {
      setCurrentTurn(player == 'X' ? 'O' : 'X');
      setTimeout(() => computerMove(newBoard), 500); // Pasa el tablero actualizado
    } else {
      setCurrentTurn(currentTurn === 'X' ? 'O' : 'X'); // Alterna turno en modo multi
    }
  };

  // Reinicia el juego
  const resetGame = () => {
    const newBoard = Array(9).fill(null);
    setBoard(newBoard);
    setWinner(null);
    setIsDraw(false);
    setCurrentTurn('X');
    if (gameMode === 'single' && player == 'O') {
      setTimeout(() => computerMove(newBoard), 1000); // Computadora empieza si el usuario es O
    }
  };

  // Vuelve al menú principal
  const backToMenu = () => {
    setGameMode(null);
    setPlayer(null);
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsDraw(false);
    setCurrentTurn('X');
  };

  // Selecciona modo de juego
  const chooseGameMode = (mode) => {
    setGameMode(mode);
    if (mode === 'multi') {
      // Inicia directamente en modo multi
      setPlayer(null);
      setBoard(Array(9).fill(null));
      setWinner(null);
      setIsDraw(false);
      setCurrentTurn('X');
    }
  };

  // Selecciona X u O (solo para modo single)
  const choosePlayer = (symbol) => {
    setPlayer(symbol);
    const newBoard = Array(9).fill(null);
    setBoard(newBoard);
    setWinner(null);
    setIsDraw(false);
    setCurrentTurn('X');
    if (symbol === 'O') {
      setTimeout(() => computerMove(newBoard), 1000); // Computadora empieza como X
    }
  };

  // Reinicio automático al finalizar
  useEffect(() => {
    if (winner || isDraw) {
      setTimeout(resetGame, 2000); // Reinicia después de 2 segundos
    }
  }, [winner, isDraw]);

  return (
    <Container id="tic-tac-toe" className="min-vh-100 d-flex align-items-center justify-content-center my-3">
      <Card className="game-card shadow-lg position-absolute top-50 start-50 translate-middle">
        <Card.Body>
          <h2 className="text-center mb-4">Tic Tac Toe</h2>
          {!gameMode ? (
            <div className="text-center mb-4">
              <h4>Elije el modo de juego:</h4>
              <Button id="single-player" variant="primary" className="me-2" onClick={() => chooseGameMode('single')}>
                1 Jugador (vs Computadora)
              </Button>
              <Button id="multi-player" variant="success" onClick={() => chooseGameMode('multi')}>
                2 Jugadores
              </Button>
            </div>
          ) : gameMode === 'single' && !player ? (
            <div className="text-center mb-4">
              <h4>Elije tu símbolo:</h4>
              <Button id="choose-x" variant="primary" className="me-2" onClick={() => choosePlayer('X')}>
                Jugar como X
              </Button>
              <Button id="choose-o" variant="success" onClick={() => choosePlayer('O')}>
                Jugar como O
              </Button>
            </div>
          ) : (
            <>
              <Alert id="game-status" variant={winner ? 'success' : isDraw ? 'warning' : 'info'} className="text-center">
                {winner ? `¡${winner} gana!` : isDraw ? '¡Empate!' : `Turno de ${gameMode === 'multi' ? currentTurn : player}`}
              </Alert>
              <div id="board" className="board">
                <Row>
                  {board.map((cell, index) => (
                    <Col key={index} xs={4} className="board-cell" onClick={() => handleClick(index)}>
                      <div className={`cell ${cell ? cell.toLowerCase() : ''}`}>
                        {cell}
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
              <div className="d-flex gap-2 mt-3">
                <Button id="reset-button" variant="secondary" className="w-50" onClick={resetGame}>
                  Reiniciar
                </Button>
                <Button id="back-to-menu" variant="outline-primary" className="w-50" onClick={backToMenu}>
                  Volver al Menú
                </Button>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;