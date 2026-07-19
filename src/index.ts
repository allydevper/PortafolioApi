import express from 'express';
import dotenv from 'dotenv';
import projectRoutes from './routes/project.routes';
import todoRoutes from './routes/todo.routes';
import journalRoutes from './routes/journal.routes';
import cors from 'cors'

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    'https://www.wilmeralama.com',
    'https://portafolio-alamadev.up.railway.app',
    'http://localhost:4321',
    'http://127.0.0.1:4321',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('¡Hola, mundo test!');
});

app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/todos', todoRoutes);
app.use('/api/v1/journal', journalRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
