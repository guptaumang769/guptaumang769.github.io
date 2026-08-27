import { GITHUB_URL } from './Nav';
import Reveal from './Reveal';

const REPOS_URL = `${GITHUB_URL}?tab=repositories`;

export default function About() {
  return (
    <section className="section" id="about">
      <Reveal>
        <h2 className="section-title">
          About <span className="brace">{'{me}'}</span>
        </h2>
        <p className="section-sub">A bit of background.</p>
        <div className="about-card">
        <p>
          I&apos;m a senior backend engineer with 7+ years of experience, and I
          like the hard middle of a system — the seat that must be sold exactly
          once, the payment that can&apos;t be lost across services, the ride
          that maps to exactly one driver in real time. My projects are built
          the way production systems are: event-driven, observable, and resilient
          to partial failure.
        </p>
        <p>
          At work I&apos;ve migrated fleets of microservices from EC2 to
          Kubernetes with zero downtime, tuned databases at the 100M-row scale,
          and run event-driven messaging across 990+ tenants. The projects here
          are where I explore those same distributed-systems problems from
          first principles.
        </p>
        <p className="callout">
          Everything is public on{' '}
          <a href={REPOS_URL} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>{' '}
          — each repo ships with its source, docs, and design notes.
        </p>
        </div>
      </Reveal>
    </section>
  );
}
