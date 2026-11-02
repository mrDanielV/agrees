import { http, HttpResponse } from 'msw';

export const handlers = [
  // Обработчик для проверки ключа и получения настроек
  http.post('/api/accept', async ({ request }) => {
    // Получаем данные из тела запроса (имитация)
    const body = await request.text(); // или await request.json(), если шлем JSON
    
    // Тут мы проверяем, что пришло в теле
    // В реальности мы бы парсили URL-encoded строку (operation=getAgrees&data=...)
    // Но для простоты пока забудем про парсинг и просто ответим успехом
    
    return HttpResponse.json({
      success: true,
      data: {
        agrees: { personal: true, edo: true },
        personalText: 'Текст согласия...',
        type: 'personal'
      }
    });
  }),

  // Обработчик для отправки СМС
  http.post('/api/sign/send', () => {
    return HttpResponse.json({ success: true });
  }),

  // Обработчик для проверки кода СМС
  http.post('/api/sign/check', () => {
    return HttpResponse.json({ success: true });
  })
];