'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const facts = [
  {
    number: '01',
    title: 'Знакомство',
    text: 'Узнаю вашу историю, характер и представление об идеальном празднике.',
  },
  {
    number: '02',
    title: 'Подготовка',
    text: 'Продумываю сценарий, который подходит именно вам и вашим гостям.',
  },
  {
    number: '03',
    title: 'Ваш день',
    text: 'Создаю атмосферу, в которой можно расслабиться и наслаждаться моментом.',
  },
];

export default function About() {
  return (
    <section className='section about-section' id='about'>
      <div className='section-inner about-grid'>
        <motion.div
          className='about-visual'
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className='about-image-placeholder'>
            <span className='about-monogram'>
              D<span>M</span>
            </span>
            <span className='about-image-caption'>ВАША ИСТОРИЯ НАЧИНАЕТСЯ ЗДЕСЬ</span>
          </div>
          <div className='about-stamp'>
            <span>С любовью</span>
            <strong>к деталям</strong>
          </div>
        </motion.div>

        <motion.div
          className='about-copy'
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.12 }}
        >
          <p className='eyebrow'>НЕМНОГО ОБО МНЕ</p>
          <h2 className='section-title'>
            Не просто ведущий.
            <br />
            <span>Часть вашей истории.</span>
          </h2>

          <p className='section-description'>
            Свадьба — это не набор конкурсов по расписанию. Это люди, чувства, неожиданные моменты и
            воспоминания, к которым хочется возвращаться.
          </p>

          <p className='section-description'>
            Моя задача — услышать ваши пожелания, объединить гостей и создать праздник, в котором
            всё будет по-настоящему: легко, красиво и без лишней постановки.
          </p>

          <a className='text-link' href='#contact'>
            Давайте познакомимся <ArrowUpRight size={17} />
          </a>
        </motion.div>
      </div>

      <div className='section-inner about-process'>
        {facts.map((fact, index) => (
          <motion.article
            className='process-card'
            key={fact.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
          >
            <span className='process-number'>{fact.number}</span>
            <h3>{fact.title}</h3>
            <p>{fact.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
