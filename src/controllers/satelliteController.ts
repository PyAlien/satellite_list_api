// Импортируем типы Request и Response из Express для типизации параметров запроса и ответа
import { Request, Response } from 'express';

// Экспортируем асинхронную функцию для обработки запроса, получения спутников
export const getSatellites = async (req: Request, res: Response) => {
  try {
    // Создаем массив с данными спутников (в реальном проекте здесь будет запрос к базе данных или API)
    const satellites = [
      { id: 1, name: 'Astra 1KR', position: '19.2°E' },
      { id: 2, name: 'Hot Bird 13B', position: '13.0°E' }
    ];
    // Отправляем массив спутников в формате JSON как ответ на запрос
    res.json(satellites);
  } catch (error) {
    // В случае ошибки на сервере возвращаем статус 500 (ошибка сервера) и сообщение об ошибке
    res.status(500).json({ error: 'Server error' });
  }
};
