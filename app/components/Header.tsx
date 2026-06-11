'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about-us', label: 'About us' },
    { href: '/contact-us', label: 'Contact us' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms-of-service', label: 'Terms & Conditions' },
  ];

  return (
    <>
      <header>
        <div className="container nav-container">
          <Link href="/" className="logo-group" style={{ textDecoration: 'none' }}>
            <span className="logo-icon">📝</span>
            <h1 className="logo">ERP-blogs</h1>
          </Link>
          <button
            className={`hamburger${menuOpen ? ' active' : ''}`}
            id="navToggle"
            aria-label="Open main menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span><span></span><span></span>
          </button>
          <nav className="main-nav">
            <ul id="desktopNav">
              {navLinks.map((l) => (
                <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <div
        id="menuOverlay"
        className={menuOpen ? 'active' : ''}
        onClick={closeMenu}
      />
      <nav className="mobile-drawer-nav" id="mobileDrawerNav">
        <ul id="mobileNavMenu" className={menuOpen ? 'show' : ''}>
          {navLinks.map((l) => (
            <li key={l.href}><Link href={l.href} onClick={closeMenu}>{l.label}</Link></li>
          ))}
        </ul>
      </nav>
    </>
  );
}
