// Импортируем Router из библиотеки Express для создания маршрутов
import { Router } from 'express';

// Импортируем функцию `getSatellites` из файла `satelliteController.ts`
// Этот файл содержит логику обработки запросов для работы с данными спутников
import { getSatellites } from '../controllers/satelliteController';

// Создаем экземпляр маршрутизатора, который будет обрабатывать HTTP-запросы
const router = Router();

// Определяем маршрут для обработки GET-запроса на корневой путь ('/')
// Когда клиент отправляет GET-запрос на этот путь, вызывается функция `getSatellites`
router.get('/', getSatellites);

// Экспортируем маршрутизатор, чтобы его можно было использовать в других частях приложения
export default router;
