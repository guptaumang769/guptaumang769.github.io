import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { GitHubIcon, LinkedInIcon } from './icons';
import { GITHUB_URL, LINKEDIN_URL } from './Nav';

// Résumé PDF lives in public/ and is served at the site root. BASE_URL keeps
// the link correct whether the site is deployed at "/" or "/portfolio-site/".
const RESUME_URL = `${import.meta.env.BASE_URL}Umang-Gupta-Resume.pdf`;

const ROLES = [
  'Backend Engineer',
  'Distributed Systems',
  'Agentic AI Builder',
  'Microservices',
];

/** Typewriter cycling through ROLES. Falls back to a static line if
 *  the user prefers reduced motion. */
function useTypewriter(words: string[]) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return; // handled by the render fallback
    const current = words[index];
    const done = !deleting && text === current;
    const cleared = deleting && text === '';

    let delay = deleting ? 45 : 90;
    if (done) delay = 1400; // pause on full word
    if (cleared) delay = 240;

    const timer = setTimeout(() => {
      if (done) {
        setDeleting(true);
      } else if (cleared) {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else {
        setText((t) =>
          deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1),
        );
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index, words, reduce]);

  return reduce ? words[0] : text;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

function scrollToProjects() {
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
}

export default function Hero() {
  const role = useTypewriter(ROLES);
  const reduce = useReducedMotion();

  return (
    <header className="hero" id="top">
      <motion.div
        className="hero-inner"
        variants={container}
        initial={reduce ? false : 'hidden'}
        animate="show"
      >
        <motion.span className="eyebrow" variants={item}>
          <span className="dot" aria-hidden="true" />
          Backend + Agentic AI · open to work
        </motion.span>

        <motion.h1 variants={item}>
          Backend + Agentic AI, built to <span className="brace">{'{ship}'}</span>
        </motion.h1>

        <motion.p className="role-line" variants={item} aria-live="polite">
          {role}
          {!reduce && <span className="role-caret" aria-hidden="true">&nbsp;</span>}
        </motion.p>

        <motion.p className="intro" variants={item}>
          I&apos;m Umang Gupta. I build production-style backend systems —
          event-driven microservices, real-time platforms, and AI agents that
          call real APIs. Each project below ships with its source, and a live UI
          where one exists.
        </motion.p>

        <motion.nav className="hero-links" variants={item} aria-label="Primary actions">
          <button className="btn primary" onClick={scrollToProjects}>
            View Projects
          </button>
          <a className="btn" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            <GitHubIcon /> GitHub
          </a>
          <a className="btn" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
            Résumé
          </a>
          <a className="btn" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
            <LinkedInIcon /> LinkedIn
          </a>
        </motion.nav>
      </motion.div>
    </header>
  );
}
