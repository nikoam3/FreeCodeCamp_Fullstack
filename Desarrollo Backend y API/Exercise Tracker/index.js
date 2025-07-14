require('dotenv').config({ path: "sample.env" })
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express()
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI);

// Esquemas de Mongoose
const userSchema = new mongoose.Schema({
  username: { type: String, required: true }
});
const exerciseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

let User = mongoose.models.users || mongoose.model('users', userSchema);
let Exercise = mongoose.models.exercise || mongoose.model('exercises', exerciseSchema);

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// POST /api/users - Crear un nuevo usuario
app.post('/api/users', async (req, res) => {
  const { username } = req.body;
  if (!username) return res.json({ error: 'Username is required' });

  try {
    const user = new User({ username });
    await user.save();
    res.json({ username, _id: user._id });
  } catch (err) {
    res.json({ error: 'Error creating user' });
  }
});

// GET /api/users - Obtener lista de usuarios
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('username _id');
    res.json(users);
  } catch (err) {
    res.json({ error: 'Error fetching users' });
  }
});

// POST /api/users/:_id/exercises - Agregar ejercicio
app.post('/api/users/:_id/exercises', async (req, res) => {
  const { _id } = req.params;
  const { description, duration, date } = req.body;

  if (!description || !duration) {
    return res.json({ error: 'Description and duration are required' });
  }

  try {
    const user = await User.findById(_id);
    if (!user) return res.json({ error: 'User not found' });

    const exercise = new Exercise({
      userId: _id,
      description,
      duration: parseInt(duration),
      date: date ? new Date(date) : new Date()
    });

    await exercise.save();
    res.json({
      username: user.username,
      description,
      duration: parseInt(duration),
      date: exercise.date.toDateString(),
      _id
    });
  } catch (err) {
    res.json({ error: 'Error adding exercise' });
  }
});

// GET /api/users/:_id/logs - Obtener log de ejercicios
app.get('/api/users/:_id/logs', async (req, res) => {
  const { _id } = req.params;
  const { from, to, limit } = req.query;

  try {
    const user = await User.findById(_id);
    if (!user) return res.json({ error: 'User not found' });

    let query = Exercise.find({ userId: _id });
    if (from) query = query.where('date').gte(new Date(from));
    if (to) query = query.where('date').lte(new Date(to));
    if (limit) query = query.limit(parseInt(limit));

    const exercises = await query.exec();
    const log = exercises.map(ex => ({
      description: ex.description,
      duration: ex.duration,
      date: ex.date.toDateString()
    }));

    res.json({
      username: user.username,
      count: exercises.length,
      _id,
      log
    });
  } catch (err) {
    res.json({ error: 'Error fetching logs' });
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
