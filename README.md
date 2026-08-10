 # Weather App

Веб-приложение для просмотра текущей погоды и прогноза по выбранному городу.

## Скриншоты
<img width="1919" height="988" alt="image" src="https://github.com/user-attachments/assets/70cd2e2f-7f0d-4dfe-9d53-a921752a778f" />
<img width="1919" height="910" alt="image" src="https://github.com/user-attachments/assets/f13e6eb4-dcb8-46c3-96a2-cf4e8172eb79" />
<img width="1919" height="982" alt="image" src="https://github.com/user-attachments/assets/acd8d629-6e1b-4940-a4f0-eed0a4dbf443" />
<img width="294" height="998" alt="image" src="https://github.com/user-attachments/assets/ca1904b3-8189-4a90-852c-b5aa2d046439" />




## Возможности

- поиск и выбор города;
- текущая температура, состояние погоды и основные показатели;
- прогноз на срок до 5 дней;
- подробная страница с графиками температуры, влажности и ветра;
- таблица прогноза по времени суток;
- переключение единиц температуры и давления;
- обновление данных и обработка ошибок API.

## Стек

- React 19 и TypeScript;
- Vite;
- React Router;
- TanStack Query;
- Recharts;
- Sass;
- WeatherAPI.

## Запуск

Для работы приложения нужен API-ключ [WeatherAPI](https://www.weatherapi.com/).

1. Установите зависимости:

	```bash
	npm install
	```

2. Создайте в корне проекта файл `.env` и добавьте ключ:

	```env
	VITE_WEATHER_API_KEY=your_api_key
	```

3. Запустите сервер разработки:

	```bash
	npm run dev
	```

После запуска приложение будет доступно по адресу, который покажет Vite в терминале.

## Доступные команды

```bash
npm run dev      # запуск в режиме разработки
npm run build    # проверка типов и production-сборка
npm run lint     # проверка кода Oxlint
npm run preview  # просмотр production-сборки
```
