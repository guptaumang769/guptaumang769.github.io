import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import Reveal from './Reveal';

/**
 * Core stack shown as animated bars. `level` is a *relative emphasis* used
 * only to size the bar visually — it is deliberately NOT captioned as a
 * percentage/metric. The honest signal is the `note` label + ordering.
 */
interface CoreSkill {
  name: string;
  note: string;
  level: number; // 0–100, visual weight only
}

const CORE: CoreSkill[] = [
  { name: 'Java', note: 'primary language', level: 95 },
  { name: 'Spring Boot / Cloud', note: 'daily driver', level: 92 },
  { name: 'Kafka', note: 'event-driven core', level: 84 },
  { name: 'Redis', note: 'caching & locks', level: 82 },
  { name: 'Kubernetes', note: 'containers & deploy', level: 72 },
  { name: 'AWS', note: 'cloud infra', level: 70 },
  { name: 'Spring AI', note: 'agents & MCP', level: 78 },
  { name: 'React / TypeScript', note: 'this site + UIs', level: 68 },
];

// Supporting tooling — shown as chips rather than bars.
const TOOLING = [
  'PostgreSQL',
  'Neo4j',
  'Elasticsearch',
  'Docker',
  'Terraform',
  'Resilience4j',
  'Eureka',
  'gRPC / REST',
  'MCP',
  'SSE',
];

function SkillBar({ skill, active }: { skill: CoreSkill; active: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div className="skill-bar-row">
      <div className="skill-bar-head">
        <span className="skill-name">{skill.name}</span>
        <span className="skill-note">{skill.note}</span>
      </div>
      <div
        className="skill-track"
        role="meter"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={skill.level}
        aria-label={`${skill.name} — ${skill.note}`}
      >
        <motion.div
          className="skill-fill"
          initial={reduce ? false : { width: 0 }}
          animate={{ width: active || reduce ? `${skill.level}%` : 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });

  return (
    <section className="section" id="skills">
      <Reveal>
        <h2 className="section-title">
          Core <span className="brace">{'{stack}'}</span>
        </h2>
        <p className="section-sub">
          The tools behind the projects, roughly by how much I lean on them —
          not a scorecard, just emphasis.
        </p>
      </Reveal>

      <div className="skills-layout" ref={ref}>
        <div className="skill-bars">
          {CORE.map((s) => (
            <SkillBar key={s.name} skill={s} active={inView} />
          ))}
        </div>

        <Reveal delay={0.1} className="skill-aside">
          <h3>Also in the toolbox</h3>
          <div className="chip-wrap">
            {TOOLING.map((t) => (
              <span className="skill-chip" key={t}>
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
