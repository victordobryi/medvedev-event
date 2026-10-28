'use client';

import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className='site-header'>
      <a className='brand' href='#home' aria-label='На главную'>
        <span className='brand-mark'>DM</span>

        <span className='brand-copy'>
          <strong>{siteConfig.name}</strong>
          <small>{siteConfig.role}</small>
        </span>
      </a>

      <button
        className='menu-toggle'
        type='button'
        aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`}>
        {siteConfig.navigation.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
            {item.label}
          </a>
        ))}

        <a className='nav-cta' href='#contact' onClick={() => setMenuOpen(false)}>
          Обсудить свадьбу
          <ArrowUpRight size={16} />
        </a>
      </nav>
    </header>
  );
}
