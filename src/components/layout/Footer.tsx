import { ArrowUpRight, PhoneOutgoingIcon, Send, VideoIcon } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export default function Footer() {
  return (
    <footer className='site-footer'>
      <div className='section-inner footer-main'>
        <a className='brand footer-brand' href='#home' aria-label='На главную'>
          <span className='brand-mark'>AI</span>
          <span className='brand-copy'>
            <strong>{siteConfig.name}</strong>
            <small>{siteConfig.role}</small>
          </span>
        </a>

        <p className='footer-tagline'>
          Ваша история.
          <br />
          <span>Ваш особенный день.</span>
        </p>

        <div className='footer-navigation'>
          <p className='footer-label'>НАВИГАЦИЯ</p>
          {siteConfig.navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>

        <div className='footer-contact'>
          <p className='footer-label'>НА СВЯЗИ</p>
          <a href={`tel:${siteConfig.phone}`}>
            {siteConfig.phoneDisplay}
            <ArrowUpRight size={14} />
          </a>
          <a href={siteConfig.telegram} target='_blank' rel='noreferrer'>
            Telegram <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      <div className='section-inner footer-bottom'>
        <span>
          © {new Date().getFullYear()} {siteConfig.name}
        </span>

        <a href='/privacy'>Политика конфиденциальности</a>

        <div className='footer-socials'>
          <a href={siteConfig.instagram} target='_blank' rel='noreferrer' aria-label='Instagram'>
            <PhoneOutgoingIcon size={17} />
          </a>
          <a href={siteConfig.vk} target='_blank' rel='noreferrer' aria-label='ВКонтакте'>
            <span className='vk-icon'>VK</span>
          </a>
          <a href={siteConfig.telegram} target='_blank' rel='noreferrer' aria-label='Telegram'>
            <Send size={17} />
          </a>
          <a href='https://www.youtube.com/' target='_blank' rel='noreferrer' aria-label='YouTube'>
            <VideoIcon size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
