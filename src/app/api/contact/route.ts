import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z
    .string()
    .trim()
    .min(7)
    .max(30)
    .regex(/^[+\d\s()\-]+$/),
  date: z.string().max(20).optional().default(''),
  message: z.string().trim().max(2000).optional().default(''),
  website: z.string().max(0).optional().default(''),
  consent: z.literal(true),
});

function escapeHtml(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error('Telegram environment variables are not configured.');

    return NextResponse.json(
      { message: 'Форма временно недоступна. Попробуйте позже.' },
      { status: 503 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Некорректный формат запроса.' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: 'Проверьте заполнение формы и согласие на обработку данных.' },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Скрытое поле заполнено — не отправляем сообщение в Telegram.
  if (data.website) {
    return NextResponse.json({ message: 'Заявка принята.' });
  }

  const message = [
    '💍 <b>Новая заявка с сайта</b>',
    '',
    `<b>Имя:</b> ${escapeHtml(data.name)}`,
    `<b>Телефон:</b> ${escapeHtml(data.phone)}`,
    `<b>Дата свадьбы:</b> ${escapeHtml(data.date || 'Не указана')}`,
    `<b>Сообщение:</b> ${escapeHtml(data.message || 'Нет сообщения')}`,
  ].join('\n');

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });

    if (!telegramResponse.ok) {
      const telegramError = await telegramResponse.text();

      console.error('Telegram API error:', {
        status: telegramResponse.status,
        response: telegramError,
      });

      return NextResponse.json({ error: 'Не удалось отправить сообщение' }, { status: 502 });
    }

    return NextResponse.json({ message: 'Заявка отправлена.' });
  } catch {
    console.error('Telegram request failed.');

    return NextResponse.json(
      { message: 'Не удалось связаться с сервисом отправки. Попробуйте позже.' },
      { status: 502 },
    );
  }
}
