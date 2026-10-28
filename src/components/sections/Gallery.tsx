'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { useState } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const photos = [
  {
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85',
    alt: 'Элегантная свадебная церемония',
    title: 'День, полный эмоций',
    category: 'ЦЕРЕМОНИЯ',
  },
  {
    src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1400&q=85',
    alt: 'Праздничный свадебный стол',
    title: 'Каждая деталь важна',
    category: 'АТМОСФЕРА',
  },
  {
    src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1400&q=85',
    alt: 'Свадебный банкет с тёплым светом',
    title: 'Вечер для своих',
    category: 'БАНКЕТ',
  },
  {
    src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1400&q=85',
    alt: 'Счастливая пара в день свадьбы',
    title: 'История вашей любви',
    category: 'МОЛОДОЖЁНЫ',
  },
  {
    src: 'https://images.unsplash.com/photo-1507504031003-b417219a0herme?auto=format&fit=crop&w=1400&q=85',
    alt: 'Романтическое оформление свадьбы',
    title: 'Моменты, которые останутся',
    category: 'ДЕТАЛИ',
  },
];

export default function Gallery() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className='section gallery-section' id='gallery'>
      <div className='section-inner'>
        <div className='gallery-heading'>
          <motion.div
            className='gallery-intro'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className='eyebrow'>АТМОСФЕРА ПРАЗДНИКОВ</p>
            <h2 className='section-title'>
              Яркие моменты,
              <br />
              которые <span>остаются</span>
              <br />
              <span>в сердце</span>
            </h2>
            <p className='section-description'>
              Каждая свадьба — уникальная история. Здесь — атмосфера, эмоции и счастливые люди.
            </p>
            <a className='text-link' href='#contact'>
              Обсудить вашу свадьбу <ArrowUpRight size={17} />
            </a>
          </motion.div>

          <div className='gallery-slider'>
            <Swiper
              modules={[A11y, Autoplay, Navigation, Pagination]}
              slidesPerView={1.15}
              spaceBetween={16}
              centeredSlides
              loop
              autoplay={{ delay: 4500, disableOnInteraction: false }}
              navigation={{
                prevEl: '.gallery-prev',
                nextEl: '.gallery-next',
              }}
              pagination={{
                el: '.gallery-pagination',
                clickable: true,
              }}
              onSwiper={setSwiper}
              onSlideChange={(instance) => setActiveIndex(instance.realIndex)}
              breakpoints={{
                640: { slidesPerView: 1.4, spaceBetween: 20 },
                900: { slidesPerView: 1.6, spaceBetween: 24 },
              }}
              aria-label='Фотогалерея свадеб'
            >
              {photos.map((photo) => (
                <SwiperSlide key={photo.src}>
                  <article className='gallery-slide'>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo.src} alt={photo.alt} loading='lazy' />
                    <div className='gallery-slide-overlay'>
                      <span>{photo.category}</span>
                      <h3>{photo.title}</h3>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className='gallery-controls'>
              <button
                className='round-control gallery-prev'
                type='button'
                aria-label='Предыдущая фотография'
                onClick={() => swiper?.slidePrev()}
              >
                <ArrowLeft size={18} />
              </button>
              <button
                className='round-control gallery-next'
                type='button'
                aria-label='Следующая фотография'
                onClick={() => swiper?.slideNext()}
              >
                <ArrowRight size={18} />
              </button>
              <div className='gallery-pagination' />
              <span className='gallery-count'>
                {String(activeIndex + 1).padStart(2, '0')} /{' '}
                {String(photos.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
