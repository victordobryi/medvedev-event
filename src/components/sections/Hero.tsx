'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className='hero' id='main_section'>
      {/* Фоновое видео */}
      <div className='hero__media' aria-hidden='true'>
        {!shouldReduceMotion && (
          <video
            className='hero__video'
            autoPlay
            muted
            loop
            playsInline
            preload='metadata'
            poster='/videos/wedding-hero-poster.jpg'
          >
            <source src='/videos/wedding-hero.mp4' type='video/mp4' />
          </video>
        )}
      </div>

      {/* Затемнение поверх видео */}
      <div className='hero__overlay' aria-hidden='true' />

      {/* Контент */}
      <div className='hero__content container'>
        <motion.div
          className='hero__text'
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <p className='hero__eyebrow'>
            <span className='hero__eyebrow-line' />
            WEDDINGS · EMOTIONS · PEOPLE
          </p>

          <h1 className='hero__title'>
            Ваша история.
            <br />
            <span>Ваш особенный день.</span>
          </h1>

          <p className='hero__description'>
            Создаю свадьбы, которые хочется вспоминать. Живые эмоции, деликатный юмор и атмосфера, в
            которой каждый чувствует себя своим.
          </p>

          <div className='hero__actions'>
            <a className='button button-primary hero__button' href='#contact'>
              Обсудить вашу свадьбу
              <ArrowUpRight size={18} aria-hidden='true' />
            </a>

            <a className='hero__secondary' href='#gallery'>
              Посмотреть атмосферу
            </a>
          </div>
        </motion.div>
      </div>

      <a className='hero__scroll' href='#about' aria-label='Узнать больше'>
        <span>ЛИСТАЙТЕ НИЖЕ</span>
        <ArrowDown size={16} aria-hidden='true' />
      </a>

      <div className='hero__index' aria-hidden='true'>
        <span>01</span>
        <span className='hero__index-line' />
        <span>06</span>
      </div>
    </section>
  );
}
