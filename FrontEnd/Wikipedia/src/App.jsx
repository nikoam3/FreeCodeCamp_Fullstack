import { useState } from 'react';
import { Container, Card, Form, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setError('Por favor, ingresa un término de búsqueda');
      setResults([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          srsearch: searchTerm,
          format: 'json',
          origin: '*', // Evita problemas de CORS
          srlimit: 10, // Limita a 10 resultados
        },
      });
      setResults(response.data.query.search);
    } catch (err) {
      setError('Error al buscar en Wikipedia');
      setResults([]);
    }
    setLoading(false);
  };

  const handleRandom = () => {
    window.open('https://en.wikipedia.org/wiki/Special:Random', '_blank');
  };

  return (
    <Container id="wikipedia-viewer" className="min-vh-100 d-flex align-items-center justify-content-center my-3">
      <Card className="wiki-card shadow-lg position-absolute top-50 start-50 translate-middle">
        <Card.Body>
          <h2 className="text-center mb-4">Wikipedia Viewer</h2>
          <Form onSubmit={handleSearch} className="mb-4">
            <Form.Group className="d-flex gap-2">
              <Form.Control
                id="search-input"
                type="text"
                placeholder="Buscar en Wikipedia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button id="search-button" variant="primary" type="submit" disabled={loading}>
                <i className="fas fa-search"></i>
              </Button>
              <Button id="random-button" variant="success" onClick={handleRandom}>
                <i className="fas fa-random"></i> Aleatorio
              </Button>
            </Form.Group>
          </Form>
          {error && <div className="text-danger text-center mb-3">{error}</div>}
          {loading ? (
            <div className="text-center">Cargando...</div>
          ) : (
            <ListGroup id="result-list" className="result-list-container">
              {results.length > 0 ? (
                results.map((result, index) => (
                  <ListGroup.Item key={index} className="result-item">
                    <a
                      href={`https://en.wikipedia.org/wiki/${encodeURIComponent(result.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="result-title"
                    >
                      {result.title}
                    </a>
                    <div
                      className="result-snippet"
                      dangerouslySetInnerHTML={{ __html: result.snippet }}
                    />
                  </ListGroup.Item>
                ))
              ) : (
                <div className="text-center text-muted">No hay resultados</div>
              )}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;