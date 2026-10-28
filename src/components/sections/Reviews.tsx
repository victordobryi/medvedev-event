'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  {
    names: 'Анна и Дмитрий',
    date: 'Свадебный день',
    text: 'Нам хотелось лёгкого, душевного праздника — и именно таким он получился. Всё было очень естественно, тепло и с вниманием к нам и нашим гостям.',
  },
  {
    names: 'Екатерина и Иван',
    date: 'Наша история',
    text: 'С самого знакомства стало понятно, что нас услышали. Мы могли наслаждаться праздником и не переживать о каждой мелочи. Спасибо за атмосферу!',
  },
  {
    names: 'Мария и Алексей',
    date: 'День, который запомнится',
    text: 'Больше всего понравилось, что праздник был именно про нас. Много искренних эмоций, улыбок и моментов, которые хочется пересматривать на видео.',
  },
];

export default function Reviews() {
  return (
    <section className='section reviews-section' id='reviews'>
      <div className='section-inner'>
        <div className='reviews-heading'>
          <div>
            <p className='eyebrow'>ТЁПЛЫЕ СЛОВА</p>
            <h2 className='section-title'>
              Спасибо за
              <br />
              <span>ваши эмоции</span>
            </h2>
          </div>
          <p className='section-description'>
            Самая ценная награда — знать, что этот день стал по-настоящему особенным для вас.
          </p>
        </div>

        <div className='reviews-grid'>
          {reviews.map((review, index) => (
            <motion.article
              className='review-card'
              key={review.names}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              <div className='review-stars' aria-label='Демонстрационный рейтинг'>
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star key={starIndex} size={15} fill='currentColor' strokeWidth={1} />
                ))}
              </div>

              <blockquote>«{review.text}»</blockquote>

              <div className='review-author'>
                <span className='review-avatar' aria-hidden='true'>
                  {review.names.slice(0, 1)}
                </span>
                <div>
                  <h3>{review.names}</h3>
                  <p>{review.date}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <p className='reviews-note'>
          Тексты отзывов пока демонстрационные. Перед публикацией замените их реальными отзывами
          клиентов и не публикуйте вымышленные оценки.
        </p>
      </div>
    </section>
  );
}
