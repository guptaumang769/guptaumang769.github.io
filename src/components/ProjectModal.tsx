import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Project } from '../data/projects';
import { CloseIcon, ExternalIcon } from './icons';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Close on Escape; lock body scroll while open; focus the dialog.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      className="modal-backdrop"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? undefined : { opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="modal"
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? undefined : { opacity: 0, y: 24, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="icon-btn modal-close"
          onClick={onClose}
          aria-label="Close details"
        >
          <CloseIcon />
        </button>

        <div className="modal-head">
          <span className="card-icon" aria-hidden="true">
            {project.icon}
          </span>
          <h2 id="modal-title">{project.title}</h2>
          {project.isAI && (
            <span className="ai-badge" aria-label="AI system">
              AI
            </span>
          )}
        </div>
        <p className="pitch">{project.pitch}</p>

        <h3>The problem</h3>
        <p className="problem">{project.problem}</p>

        <h3>The approach</h3>
        <ul className="approach">
          {project.approach.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>

        <h3>Tech</h3>
        <div className="badges">
          {project.tech.map((t) => (
            <span key={t} className="badge">
              {t}
            </span>
          ))}
        </div>

        <div className="modal-links">
          {project.status === 'live' ? (
            <>
              <a
                className="btn primary"
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalIcon /> Repo
              </a>
              {project.demoUrl && (
                <a
                  className="btn"
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalIcon /> {project.demoLabel ?? 'Live demo'}
                </a>
              )}
            </>
          ) : (
            <span className="btn disabled" aria-disabled="true" title="Repository publishing soon">
              🚧 Coming soon
            </span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
