'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { ArrowUpRight, LockKeyhole, Send, ShieldCheck } from 'lucide-react';

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Введите имя — не менее 2 символов')
    .max(80, 'Имя слишком длинное'),
  phone: z
    .string()
    .trim()
    .min(7, 'Укажите номер телефона')
    .max(30, 'Проверьте номер телефона')
    .regex(/^[+\d\s()\-]+$/, 'Проверьте формат телефона'),
  date: z.string().optional(),
  message: z.string().trim().max(2000, 'Сообщение должно быть короче 2000 символов').optional(),
  website: z.string().max(0, 'Некорректная форма').optional(),
  consent: z.literal(true, {
    error: 'Необходимо согласие на обработку данных',
  }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      phone: '',
      date: '',
      message: '',
      website: '',
      consent: undefined,
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const result: { message?: string } = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Не удалось отправить заявку.');
      }

      setStatus({
        type: 'success',
        message: 'Спасибо! Заявка отправлена. Я свяжусь с вами.',
      });
      reset();
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Произошла ошибка. Попробуйте ещё раз.',
      });
    }
  }

  return (
    <section className='section contact-section' id='contact'>
      <div className='section-inner contact-grid'>
        <motion.div
          className='contact-intro'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className='eyebrow'>ДАВАЙТЕ ОБСУДИМ ВАШУ СВАДЬБУ</p>

          <h2 className='section-title'>
            Готовы обсудить
            <br />
            ваш <span>особенный день?</span>
          </h2>

          <p className='section-description'>
            Расскажите немного о вашей свадьбе. Мы обсудим ваши идеи, пожелания и возможный формат
            праздника.
          </p>

          <div className='contact-assurances'>
            <div>
              <ShieldCheck size={23} />
              <span>
                <strong>Личный подход</strong>
                <small>Обсудим ваши пожелания</small>
              </span>
            </div>

            <div>
              <LockKeyhole size={23} />
              <span>
                <strong>Конфиденциальность</strong>
                <small>Не публикуем ваши данные</small>
              </span>
            </div>

            <div>
              <Send size={23} />
              <span>
                <strong>Удобная связь</strong>
                <small>Ответим по указанному телефону</small>
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className='contact-form-wrap'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <form className='contact-form' onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className='form-grid'>
              <div className='form-field'>
                <label htmlFor='contact-name'>Ваше имя *</label>
                <input
                  id='contact-name'
                  autoComplete='name'
                  placeholder='Как к вам обращаться?'
                  maxLength={80}
                  aria-invalid={Boolean(errors.name)}
                  {...register('name')}
                />
                {errors.name && <span className='field-error'>{errors.name.message}</span>}
              </div>

              <div className='form-field'>
                <label htmlFor='contact-phone'>Телефон *</label>
                <input
                  id='contact-phone'
                  type='tel'
                  autoComplete='tel'
                  placeholder='+7 (999) 123-45-67'
                  maxLength={30}
                  aria-invalid={Boolean(errors.phone)}
                  {...register('phone')}
                />
                {errors.phone && <span className='field-error'>{errors.phone.message}</span>}
              </div>

              <div className='form-field'>
                <label htmlFor='contact-date'>Дата свадьбы</label>
                <input id='contact-date' type='date' {...register('date')} />
                {errors.date && <span className='field-error'>{errors.date.message}</span>}
              </div>

              <div className='form-field form-field-message'>
                <label htmlFor='contact-message'>Расскажите о вашей свадьбе</label>
                <textarea
                  id='contact-message'
                  rows={4}
                  placeholder='Дата, место, количество гостей и ваши идеи...'
                  maxLength={2000}
                  {...register('message')}
                />
                {errors.message && <span className='field-error'>{errors.message.message}</span>}
              </div>
            </div>

            {/* Скрытое поле-ловушка для простых спам-ботов */}
            <div className='honeypot' aria-hidden='true'>
              <label htmlFor='contact-website'>Не заполняйте это поле</label>
              <input
                id='contact-website'
                tabIndex={-1}
                autoComplete='off'
                {...register('website')}
              />
            </div>

            <label className='consent-row'>
              <input type='checkbox' {...register('consent')} />
              <span>
                Я согласен(на) на обработку персональных данных в целях ответа на заявку и
                ознакомился(лась) с{' '}
                <a href='/privacy' target='_blank' rel='noreferrer'>
                  политикой конфиденциальности
                </a>
                .
              </span>
            </label>

            {errors.consent && <span className='field-error'>{errors.consent.message}</span>}

            {status.message && (
              <p
                className={`form-status ${status.type === 'success' ? 'is-success' : 'is-error'}`}
                role='status'
                aria-live='polite'
              >
                {status.message}
              </p>
            )}

            <button
              className='button button-primary contact-submit'
              type='submit'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Отправляем...' : 'Отправить заявку'}
              <ArrowUpRight size={18} />
            </button>

            <p className='form-disclaimer'>
              Поля со звёздочкой обязательны. Не указывайте в сообщении конфиденциальную информацию.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
