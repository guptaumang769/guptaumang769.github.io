import { useEffect, useState } from 'react';
import type { Theme } from '../hooks/useTheme';
import { GitHubIcon, LeetCodeIcon, LinkedInIcon, MoonIcon, SunIcon } from './icons';

export const LINKEDIN_URL = 'https://www.linkedin.com/in/umang1395/';
export const GITHUB_URL = 'https://github.com/guptaumang769';
export const LEETCODE_URL = 'https://leetcode.com/u/umang_g/';

interface NavProps {
  theme: Theme;
  onToggleTheme: () => void;
}

const links = [
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
];

export default function Nav({ theme, onToggleTheme }: NavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <a className="nav-logo" href="#top" aria-label="Umang Gupta — home">
          <span className="mark">UG</span>
          <span>Umang Gupta</span>
        </a>

        <div className="nav-links">
          {links.map((l) => (
            <a key={l.href} className="nav-link" href={l.href}>
              {l.label}
            </a>
          ))}

          <button
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <a
            className="icon-btn"
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            <GitHubIcon />
          </a>

          <a
            className="icon-btn"
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            <LinkedInIcon />
          </a>

          <a
            className="icon-btn"
            href={LEETCODE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LeetCode profile"
          >
            <LeetCodeIcon />
          </a>
        </div>
      </div>
    </nav>
  );
}
