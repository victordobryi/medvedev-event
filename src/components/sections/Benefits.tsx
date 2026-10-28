'use client';

import { motion } from 'framer-motion';
import { HeartHandshake, Sparkles, UsersRound, MessageCircleHeart } from 'lucide-react';

const benefits = [
  {
    icon: HeartHandshake,
    number: '01',
    title: 'Индивидуальный подход',
    description:
      'Никаких сценариев под копирку. Ваша история и ваши пожелания — в центре внимания.',
  },
  {
    icon: Sparkles,
    number: '02',
    title: 'Лёгкая атмосфера',
    description:
      'Без неловких конкурсов и принуждения. Участие в активностях всегда остаётся выбором гостей.',
  },
  {
    icon: UsersRound,
    number: '03',
    title: 'Внимание к гостям',
    description:
      'Помогаю близким познакомиться, чувствовать себя свободно и стать частью общего праздника.',
  },
  {
    icon: MessageCircleHeart,
    number: '04',
    title: 'Спокойствие пары',
    description:
      'Заранее обсуждаем детали, чтобы в день свадьбы вы могли сосредоточиться друг на друге.',
  },
];

export default function Benefits() {
  return (
    <section className='section benefits-section' id='benefits'>
      <div className='section-inner'>
        <motion.div
          className='section-heading'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className='eyebrow'>ЧТО ДЕЛАЕТ ПРАЗДНИК ОСОБЕННЫМ</p>
          <h2 className='section-title'>
            Важны не только детали.
            <br />
            <span>Важно то, что вы чувствуете.</span>
          </h2>
          <p className='section-description'>
            Продуманная организация, искренние эмоции и пространство, в котором каждый может быть
            собой.
          </p>
        </motion.div>

        <div className='benefits-grid'>
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.article
                className='benefit-card'
                key={benefit.number}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className='benefit-card-top'>
                  <span className='benefit-icon'>
                    <Icon size={23} strokeWidth={1.4} />
                  </span>
                  <span className='benefit-number'>{benefit.number}</span>
                </div>

                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
