import { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://weather-proxy.freecodecamp.rocks/api/current?lat=${latitude}&lon=${longitude}`
            );
            setWeatherData(response.data);
            console.log(response.data);
          } catch (err) {
            setError('No se pudo obtener el clima');
          }
        },
        () => {
          setError('Geolocalización no permitida o no soportada');
        }
      );
    } else {
      setError('Geolocalización no soportada por el navegador');
    }
  }, []);

  const toggleUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const getWeatherIcon = (condition) => {
    const weather = condition?.toLowerCase() || '';
    if (weather.includes('clear')) return 'wi-day-sunny';
    if (weather.includes('clouds')) return 'wi-cloudy';
    if (weather.includes('rain')) return 'wi-rain';
    if (weather.includes('snow')) return 'wi-snow';
    if (weather.includes('thunderstorm')) return 'wi-thunderstorm';
    return 'wi-day-cloudy'; // Ícono por defecto
  };

  const convertTemperature = (temp) => {
    if (isCelsius) return `${temp.toFixed(1)}°C`;
    return `${((temp * 9) / 5 + 32).toFixed(1)}°F`;
  };

  return (
    <Container id="weather-app" className="position-absolute top-50 start-50 translate-middle">
      <Card className="weather-card shadow-lg position-absolute top-50 start-50 translate-middle">
        <Card.Body>
          {error ? (
            <div className="text-danger text-center">{error}</div>
          ) : weatherData ? (
            <>
              <div className="text-center">
                <h2 id="location">
                  {weatherData.name}, {weatherData.sys.country}
                </h2>
                <h3 id="temperature">{convertTemperature(weatherData.main.temp)}</h3>
                <div id="description">{weatherData.weather[0].description}</div>
                <i className={`wi ${getWeatherIcon(weatherData.weather[0].main)} weather-icon`}></i>
              </div>
              <div className="text-center mt-3">
                <Button id="toggle" variant="primary" onClick={toggleUnit}>
                  Cambiar a {isCelsius ? 'Fahrenheit' : 'Celsius'}
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center">Cargando...</div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;