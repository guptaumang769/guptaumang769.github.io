import { motion, useReducedMotion } from 'framer-motion';
import type { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const { title, pitch, tech, icon } = project;
  const isLive = project.status === 'live';
  const reduce = useReducedMotion();

  return (
    <motion.button
      type="button"
      layout
      initial={reduce ? false : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reduce ? undefined : { opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      whileHover={reduce ? undefined : { y: -4 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      className="card"
      onClick={() => onOpen(project)}
      aria-label={`${title} — open details`}
    >
      <div className="card-head">
        <span className="card-icon" aria-hidden="true">
          {icon}
        </span>
        <h3 className="card-title">{title}</h3>
        {isLive ? (
          <span className="live-badge" aria-label="Live">
            <span className="live-dot" aria-hidden="true" />
            Live
          </span>
        ) : (
          <span className="soon-badge" aria-label="Coming soon">
            Soon
          </span>
        )}
      </div>

      <p className="card-pitch">{pitch}</p>

      <div className="badges" aria-label="Tech stack">
        {tech.map((t) => (
          <span key={t} className="badge">
            {t}
          </span>
        ))}
      </div>

      <span className="card-cta">View details →</span>
    </motion.button>
  );
}
