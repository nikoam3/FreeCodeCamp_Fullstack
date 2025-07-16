import { useState, useEffect } from 'react';
import { Container, Card, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import './App.css';

function App() {
  const [streamers, setStreamers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const twitchUsers = [
    'ESL_SC2',
    'OgamingSC2',
    'cretetion',
    'freecodecamp',
    'storbeck',
    'habathcx',
    'RobotCaleb',
    'noobs2ninjas',
    'brunofin',
    'comster404',
  ];

  const defaultLogo = 'https://placehold.co/50x50'; // Logo de respaldo

  useEffect(() => {
    const fetchStreamers = async () => {
      const streamerData = [];
      for (const user of twitchUsers) {
        try {
          const streamResponse = await axios.get(
            `https://twitch-proxy.freecodecamp.rocks/twitch-api/streams/${user}`
          );
          const userResponse = await axios.get(
            `https://twitch-proxy.freecodecamp.rocks/twitch-api/users/${user}`
          );

          let status = 'offline';
          let game = 'Offline';
          let description = '';
          let logo = userResponse.data.logo || defaultLogo;
          let displayName = userResponse.data.display_name || user;
          let url = `https://www.twitch.tv/${user}`;

          if (userResponse.data._id === undefined) {
            status = 'closed';
            game = 'Account Closed';
            logo = defaultLogo;
          } else if (streamResponse.data.stream) {
            status = 'online';
            game = streamResponse.data.stream.game;
            description = streamResponse.data.stream.channel.status;
          }

          streamerData.push({
            name: displayName,
            logo,
            status,
            game,
            description,
            url,
          });
        } catch (error) {
          console.error(`Error fetching ${user}:`, error);
          streamerData.push({
            name: user,
            logo: defaultLogo,
            status: 'closed',
            game: 'Account Closed',
            description: '',
            url: `https://www.twitch.tv/${user}`,
          });
        }
      }
      setStreamers(streamerData);
      setLoading(false);
    };

    fetchStreamers();
  }, []);

  const filteredStreamers = streamers.filter((streamer) => {
    if (filter === 'online') return streamer.status === 'online';
    if (filter === 'offline') return streamer.status === 'offline';
    return true;
  });

  const handleImageError = (e) => {
    e.target.src = defaultLogo; // Reemplaza con el logo de respaldo si falla (por ejemplo, 403)
  };

  return (
    <Container id="twitch-app" className="min-vh-100 d-flex align-items-center justify-content-center my-3">
      <Card className="twitch-card shadow-lg position-absolute top-50 start-50 translate-middle">
        <Card.Body>
          <h2 className="text-center mb-4">Twitch Streamers</h2>
          <div className="d-flex justify-content-center gap-2 mb-4">
            <Button
              variant={filter === 'all' ? 'primary' : 'outline-primary'}
              onClick={() => setFilter('all')}
            >
              Todos
            </Button>
            <Button
              variant={filter === 'online' ? 'success' : 'outline-success'}
              onClick={() => setFilter('online')}
            >
              Online
            </Button>
            <Button
              variant={filter === 'offline' ? 'secondary' : 'outline-secondary'}
              onClick={() => setFilter('offline')}
            >
              Offline
            </Button>
          </div>
          {loading ? (
            <div className="text-center">Cargando...</div>
          ) : (
            <div className="streamer-list-container">
              <ListGroup id="streamer-list">
                {filteredStreamers.map((streamer, index) => (
                  <ListGroup.Item
                    key={index}
                    className={`d-flex align-items-center ${streamer.status}`}
                  >
                    <img
                      src={streamer.logo}
                      alt={`${streamer.name} logo`}
                      className="streamer-logo me-3"
                      onError={handleImageError}
                    />
                    <div className="flex-grow-1">
                      <a href={streamer.url} target="_blank" rel="noopener noreferrer" id="name">
                        {streamer.name}
                      </a>
                      <div id="streaming">
                        {streamer.status === 'closed'
                          ? 'Account Closed'
                          : `${streamer.game}${streamer.status === 'online' ? `: ${streamer.description}` : ''
                          }`}
                      </div>
                    </div>
                    <i
                      className={`fas fa-circle ms-auto ${streamer.status === 'online' ? 'text-success' : 'text-danger'
                        }`}
                    ></i>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;