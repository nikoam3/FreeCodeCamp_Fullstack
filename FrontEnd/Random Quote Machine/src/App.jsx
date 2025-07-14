import { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import './App.css';

function App() {
  const [quote, setQuote] = useState({ content: '', author: '' });

  // Función para obtener una frase aleatoria
  const fetchQuote = async () => {
    try {
      const response = await axios.get('http://api.quotable.io/random');
      setQuote({
        content: response.data.content,
        author: response.data.author,
      });
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuote({
        content: 'Something went wrong. Try again!',
        author: 'Unknown',
      });
    }
  };

  // Obtener una frase al cargar la página
  useEffect(() => {
    fetchQuote();
  }, []);

  // URL para compartir en Twitter
  const tweetUrl = `https://twitter.com/intent/tweet?text="${encodeURIComponent(
    quote.content
  )}" - ${encodeURIComponent(quote.author)}`;

  return (
    <Container
      id="quote-box"
      className="position-absolute top-50 start-50 translate-middle"
    >
      <Card className="quote-card shadow-lg">
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p id="text" className="quote-text">
              <i className="fas fa-quote-left"></i> {quote.content}
            </p>
            <footer id="author" className="blockquote-footer mt-2">
              {quote.author}
            </footer>
          </blockquote>
          <div className="d-flex justify-content-between mt-4">
            <Button
              id="new-quote"
              variant="primary"
              onClick={fetchQuote}
              className="quote-button"
            >
              New Quote
            </Button>
            <a
              id="tweet-quote"
              href={tweetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-info quote-button"
            >
              <i className="fab fa-twitter"></i> Tweet
            </a>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default App;
