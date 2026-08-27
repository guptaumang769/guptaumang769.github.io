import Reveal from './Reveal';

interface Role {
  company: string;
  detail?: string; // e.g. contract/agency line
  title: string;
  period: string;
  location: string;
  points: string[];
  tech: string[];
}

// Sourced from the résumé. Update here when roles change.
const ROLES: Role[] = [
  {
    company: 'Intuit',
    detail: 'Contract via Dexian',
    title: 'Senior Software Engineer',
    period: 'Oct 2024 – Present',
    location: 'Bangalore, India',
    points: [
      'Migrated 9 microservices from EC2 to Kubernetes (IKS) across 13 deployment repos using Kustomize, HPA, and Argo Rollouts — zero-downtime cutover, retiring all legacy EC2 stacks.',
      'Built a database archival pipeline and cleanup API that shrank a MySQL RDS table from 200M+ to 25M+ rows (87%) and purged 152 GB of stale data in under 3 seconds.',
      'Upgraded 9 services to Java 21 and eliminated N+1 query problems by tuning JPA fetch strategies and HikariCP pools, validated through Karate BDD suites with zero regressions.',
      'Secured REST APIs with Spring Security (OAuth 2.0 + RBAC), resolved 250+ vulnerabilities, and ran event-driven messaging on Apache Pulsar across 990+ tenants with exactly-once processing.',
    ],
    tech: ['Java 21', 'Kubernetes', 'Argo Rollouts', 'Apache Pulsar', 'Spring Security', 'AWS'],
  },
  {
    company: 'Dell EMC',
    title: 'Software Engineer II',
    period: 'Sep 2021 – Sep 2024',
    location: 'Bangalore, India',
    points: [
      'Built 7 high-throughput REST APIs in Java and Spring Boot for AppSync data-center discovery, persisting system states in PostgreSQL.',
      'Lowered system CPU/memory usage by 80% through automated workflow profiling and reduced database storage overhead by 26%.',
      'Mentored a team of 5 to resolve 40+ customer escalations and ship 20+ hotfixes across releases.',
    ],
    tech: ['Java', 'Spring Boot', 'PostgreSQL'],
  },
  {
    company: 'Capgemini Technology Services',
    title: 'Senior Software Engineer',
    period: 'Feb 2019 – Sep 2021',
    location: 'Mumbai, India',
    points: [
      'Developed full-stack features using Java, ReactJS, and PL/SQL for enterprise insurance clients, cutting response times by 30% and earning a promotion within 14 months.',
    ],
    tech: ['Java', 'ReactJS', 'PL/SQL'],
  },
];

export default function Experience() {
  return (
    <section className="section" id="experience">
      <Reveal>
        <h2 className="section-title">
          Work <span className="brace">{'{experience}'}</span>
        </h2>
        <p className="section-sub">
          7+ years shipping production backend systems across product companies.
        </p>
      </Reveal>

      <div className="exp-timeline">
        {ROLES.map((role, i) => (
          <Reveal key={role.company} delay={i * 0.05}>
            <article className="exp-item">
              <div className="exp-marker" aria-hidden="true" />
              <div className="exp-body">
                <div className="exp-head">
                  <h3 className="exp-role">{role.title}</h3>
                  <span className="exp-period">{role.period}</span>
                </div>
                <div className="exp-meta">
                  <span className="exp-company">{role.company}</span>
                  {role.detail && <span className="exp-detail">· {role.detail}</span>}
                  <span className="exp-loc">· {role.location}</span>
                </div>
                <ul className="exp-points">
                  {role.points.map((p, j) => (
                    <li key={j}>{p}</li>
                  ))}
                </ul>
                <div className="badges">
                  {role.tech.map((t) => (
                    <span key={t} className="badge">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
