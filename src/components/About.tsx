import { GITHUB_URL } from './Nav';
import Reveal from './Reveal';

// Learning / concept repos referenced in the About callout.
const LLD_REPO_URL = `${GITHUB_URL}/java-lld-mastery`;
// PLACEHOLDER: point this at your concepts/notes repo if it lives elsewhere.
const CONCEPTS_URL = `${GITHUB_URL}?tab=repositories`;

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
          I&apos;m a backend engineer who likes the hard middle of a system —
          the seat that must be sold exactly once, the payment that can&apos;t
          be lost across services, the ride that maps to exactly one driver in
          real time. My projects are built the way production systems are:
          event-driven, observable, and resilient to partial failure.
        </p>
        <p>
          Lately I&apos;ve been building agentic AI on top of those backends —
          Spring AI agents that tool-call into real APIs, grounded with RAG and
          memory, and an MCP server that exposes them to any model.
        </p>
        <p className="callout">
          I also keep a public learning trail:{' '}
          <a href={LLD_REPO_URL} target="_blank" rel="noopener noreferrer">
            java-lld-mastery
          </a>{' '}
          (OOP, all 22 GoF patterns, concurrency, and 33 runnable LLD interview
          problems), plus{' '}
          <a href={CONCEPTS_URL} target="_blank" rel="noopener noreferrer">
            concept guides
          </a>{' '}
          on distributed-systems fundamentals across the repos.
        </p>
        </div>
      </Reveal>
    </section>
  );
}
