'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const questions = [
  {
    question: 'За сколько времени нужно бронировать дату?',
    answer:
      'Популярные даты лучше обсуждать заранее. Напишите мне дату свадьбы, и мы сможем проверить её доступность.',
  },
  {
    question: 'Можно ли провести свадьбу без традиционных конкурсов?',
    answer:
      'Конечно. Формат праздника обсуждаем индивидуально: можно сделать акцент на общении, красивых тостах, истории пары и ненавязчивых активностях.',
  },
  {
    question: 'Вы встречаетесь с парой до свадьбы?',
    answer:
      'Да, предварительное знакомство помогает понять ваши пожелания, обсудить программу и подготовить праздник, который будет отражать именно вашу историю.',
  },
  {
    question: 'От чего зависит стоимость проведения?',
    answer:
      'Стоимость зависит от даты, продолжительности мероприятия, места проведения и объёма подготовки. Напишите мне, и мы обсудим детали.',
  },
  {
    question: 'Как оставить заявку?',
    answer:
      'Заполните форму в разделе контактов. Укажите дату свадьбы и контактный телефон, чтобы мы могли обсудить вашу идею и дальнейшие шаги.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className='section faq-section' id='faq'>
      <div className='section-inner faq-layout'>
        <div className='faq-intro'>
          <p className='eyebrow'>ОТВЕЧАЮ НА ВОПРОСЫ</p>
          <h2 className='section-title'>
            Всё, что
            <br />
            <span>важно знать</span>
          </h2>
          <p className='section-description'>
            Если не нашли ответ на свой вопрос, просто напишите мне. Вместе обсудим детали вашего
            праздника.
          </p>
          <a className='text-link' href='#contact'>
            Задать свой вопрос
          </a>
        </div>

        <div className='faq-list'>
          {questions.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-answer-${index}`;

            return (
              <div className='faq-item' key={item.question}>
                <button
                  className='faq-question'
                  type='button'
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span>{item.question}</span>
                  <span className={`faq-plus ${isOpen ? 'is-open' : ''}`}>
                    <Plus size={19} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      className='faq-answer'
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
