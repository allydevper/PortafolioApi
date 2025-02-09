import express from 'express';
import dotenv from 'dotenv';
import projectRoutes from './routes/project.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('¡Hola, mundo test!');
});

app.use('/api/v1/projects', projectRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
