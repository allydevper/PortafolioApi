import express from 'express';
import dotenv from 'dotenv';
import projectRoutes from './routes/project.routes';
import cors from 'cors'

dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://localhost:4321', 'https://alamadev.onrender.com', 'https://portafolio-alamadev.up.railway.app'],
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

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
