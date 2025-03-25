import express from 'express'; // Импортируем фреймворк для работы с API
import cors from 'cors'; // Импортируем CORS для разрешения запросов с других доменов
import dotenv from 'dotenv'; // Импортируем dotenv для загрузки переменных окружения из файла .env
import pino from 'pino'; // Импортируем логгер

import satelliteRoutes from './routes/satelliteRoutes';

dotenv.config(); // Загружаем переменные окружения из .env
const app = express(); // Создаем экземпляр Express-приложения
const logger = pino(); // Создаем экземпляр логгера

app.use(cors()); // Разрешаем запросы с других доменов (по умолчанию разрешает все)
app.use(express.json()); // Позволяет Express работать с JSON-данными в запросах
app.use('/api/satellites', satelliteRoutes);

// Основной маршрут (проверка работоспособности API)
app.get('/', (req, res) => {
  logger.info('GET /'); // Логируем запрос в консоли
  res.json({ message: 'Satellite API is running' }); // Отправляем JSON-ответ клиенту
});

// Определяем порт для сервера
const PORT = process.env.PORT || 3000; // Берем порт из .env, если нет — используем 3000
app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`); // Логируем запуск сервера
});
