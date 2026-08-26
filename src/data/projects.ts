// Project data for the portfolio.
// To add or edit a project, just add/modify an entry in the `projects` array below.
// Repo URLs follow the pattern: https://github.com/guptaumang769/<repo>
// Demo URLs (demoUrl) are relative repo slugs resolved to the same GitHub user;
// swap them for real hosted URLs when the live demos are deployed.

export type ProjectTag =
  | 'Microservices'
  | 'Agentic AI'
  | 'Real-time'
  | 'Fundamentals';

export interface Project {
  id: string;
  title: string;
  pitch: string;
  problem: string;
  approach: string[];
  tags: ProjectTag[];
  tech: string[];
  repoUrl: string;
  /** Optional live/UI demo. Relative repo slug OR absolute URL. */
  demoUrl?: string;
  /** Label for the demo link, e.g. "UI", "Dashboard", "Live map", "Chat". */
  demoLabel?: string;
  /** Emoji or short glyph used as the card icon. */
  icon: string;
  /** Marks AI/agentic projects (used by the "AI" nav + filter accents). */
  isAI?: boolean;
}

const GH = 'https://github.com/guptaumang769';

export const projects: Project[] = [
  {
    id: 'book-my-show-backend',
    title: 'BookMyShow Backend',
    pitch:
      'Modular monolith: two-layer seat locking, Kafka events, observability. Live-verified.',
    problem:
      'Ticket booking is a classic contention problem: thousands of users race for the same seats in the same few seconds, and a single oversell ruins trust. The system must guarantee that a seat is sold exactly once while still feeling instant.',
    approach: [
      'Two-layer seat locking — an in-memory/Redis short-lived hold on selection, backed by an atomic DB reservation on confirm, so a seat can never be double-sold.',
      'Kafka events decouple booking from downstream side effects (notifications, analytics, payment reconciliation) for resilience and replay.',
      'PostgreSQL as the source of truth with careful transaction boundaries around the reserve → pay → confirm flow.',
      'Baked-in observability (structured logs, metrics, health checks) so the booking funnel is live-verifiable end to end.',
    ],
    tags: ['Fundamentals'],
    tech: ['Spring Boot', 'PostgreSQL', 'Redis', 'Kafka'],
    repoUrl: `${GH}/book-my-show-backend`,
    demoUrl: `${GH}/bookmyshow-dashboard`,
    demoLabel: 'Dashboard',
    icon: '🎬',
  },
  {
    id: 'url-shortener',
    title: 'URL Shortener',
    pitch:
      'Read-heavy scale: Base62, Redis cache-aside, token-bucket rate limiter.',
    problem:
      'A URL shortener is overwhelmingly read-heavy — one write, then millions of redirects. The hard parts are generating collision-free short codes and serving redirects with sub-millisecond latency without hammering the database.',
    approach: [
      'Base62 encoding over a monotonic id keeps short codes compact, unique, and collision-free without extra lookups.',
      'Redis cache-aside on the hot redirect path so the vast majority of reads never touch the database.',
      'Token-bucket rate limiter guards the create endpoint against abuse and runaway clients.',
      'Infrastructure defined in Terraform so the whole stack is reproducible and one-command deployable.',
    ],
    tags: ['Fundamentals'],
    tech: ['Spring Boot', 'Redis', 'Terraform'],
    repoUrl: `${GH}/url-shortener`,
    demoUrl: `${GH}/url-shortener-ui`,
    demoLabel: 'UI',
    icon: '🔗',
  },
  {
    id: 'upi-payment-system',
    title: 'UPI Payment System',
    pitch:
      'Distributed payments: Spring Cloud microservices, SAGA, Outbox, double-entry ledger.',
    problem:
      'Money movement across services cannot rely on a single database transaction. A transfer touches multiple bounded contexts, and partial failure must never lose funds or double-debit an account.',
    approach: [
      'SAGA orchestration coordinates the multi-step transfer with compensating actions so a failed step rolls the world back cleanly.',
      'Transactional Outbox pattern guarantees that a state change and its event are published atomically — no lost or ghost messages.',
      'A double-entry ledger makes every debit balance a credit, so the books are always provably consistent and auditable.',
      'Resilience4j circuit breakers and retries around inter-service calls, fronted by an API gateway with Eureka service discovery.',
    ],
    tags: ['Microservices'],
    tech: ['Eureka', 'Gateway', 'Kafka', 'Resilience4j'],
    repoUrl: `${GH}/upi-payment-system`,
    demoUrl: `${GH}/upi-ui`,
    demoLabel: 'UI',
    icon: '💸',
  },
  {
    id: 'social-platform',
    title: 'Social Platform',
    pitch:
      'Twitter/LinkedIn-scale: hybrid timeline fan-out, Neo4j graph, Elasticsearch search.',
    problem:
      'Social feeds face the celebrity fan-out problem: pure fan-out-on-write melts under users with millions of followers, while pure fan-out-on-read makes ordinary timelines slow. Discovery and search add their own scaling demands.',
    approach: [
      'Hybrid timeline fan-out — precompute feeds for normal accounts, fall back to fan-out-on-read for high-follower accounts to bound write amplification.',
      'Neo4j models the follower/social graph so friend-of-friend and recommendation queries stay cheap at depth.',
      'Elasticsearch powers full-text people/post search with relevance ranking.',
      'Kafka streams engagement events and Redis caches hot timelines to keep the feed responsive.',
    ],
    tags: ['Microservices'],
    tech: ['Neo4j', 'Elasticsearch', 'Kafka', 'Redis'],
    repoUrl: `${GH}/social-platform`,
    icon: '🌐',
  },
  {
    id: 'uber-platform',
    title: 'Uber Platform',
    pitch:
      '12 microservices: geospatial matching, assignment race, surge, real-time SSE tracking.',
    problem:
      'Ride-hailing is real-time and adversarial: many drivers, many riders, everyone moving, and a single ride request must be assigned to exactly one nearby driver — fast — without two dispatchers grabbing the same car.',
    approach: [
      'Redis GEO indexes driver locations for radius/nearest queries in milliseconds as positions stream in.',
      'An assignment step resolves the race so a request maps to exactly one driver, even under concurrent dispatch.',
      'Surge pricing reacts to live supply/demand per geo-cell.',
      'Server-Sent Events push live ride and driver position updates to the rider, over a Spring Cloud microservice mesh (12 services).',
    ],
    tags: ['Microservices', 'Real-time'],
    tech: ['Redis GEO', 'Kafka', 'SSE', 'Spring Cloud'],
    repoUrl: `${GH}/uber-platform`,
    demoUrl: `${GH}/uber-ui`,
    demoLabel: 'Live map',
    icon: '🚕',
  },
  {
    id: 'bookmyshow-ai-concierge',
    title: 'BookMyShow AI Concierge',
    pitch: 'AI agent: tool-calling into the BookMyShow APIs + RAG + memory.',
    problem:
      'A booking backend is powerful but unfriendly — users want to just ask "what is playing near me tonight and book two seats" in plain language, and get it done without navigating forms.',
    approach: [
      'A Spring AI agent that tool-calls directly into the BookMyShow backend APIs (search shows, check seats, reserve, confirm).',
      'RAG over movie/venue/FAQ content grounds answers so the model recommends from real data, not hallucinations.',
      'Conversation memory keeps context across turns so follow-ups ("make it Saturday instead") resolve naturally.',
      'The LLM plans which tools to call and in what order, turning free-form intent into concrete API actions.',
    ],
    tags: ['Agentic AI'],
    tech: ['Spring AI', 'RAG', 'tools'],
    repoUrl: `${GH}/bookmyshow-ai-concierge`,
    demoUrl: `${GH}/bookmyshow-ai-concierge-ui`,
    demoLabel: 'Chat',
    icon: '🤖',
    isAI: true,
  },
  {
    id: 'uber-ai-assistant',
    title: 'Uber AI Assistant',
    pitch:
      'AI agent over the Uber APIs: fare, nearby drivers, request/track rides.',
    problem:
      'The ride platform exposes a dozen services, but a rider just wants to say "get me a cab to the airport, how much and how far out is it?" and have the agent orchestrate the calls.',
    approach: [
      'A Spring AI agent exposes the Uber platform as callable tools — fare estimate, nearby drivers, request ride, track ride.',
      'The model decomposes a natural-language request into the right sequence of tool calls.',
      'Memory tracks the active ride so status questions and cancellations map to the correct trip.',
      'Responses fold live data (ETA, driver position, price) back into a plain-language reply.',
    ],
    tags: ['Agentic AI'],
    tech: ['Spring AI', 'tools', 'memory'],
    repoUrl: `${GH}/uber-ai-assistant`,
    demoUrl: `${GH}/uber-ai-assistant-ui`,
    demoLabel: 'Chat',
    icon: '🧭',
    isAI: true,
  },
  {
    id: 'portfolio-mcp-server',
    title: 'Portfolio MCP Server',
    pitch:
      'MCP server: 10 tools exposing both backends to any model (Claude Desktop).',
    problem:
      'Each AI assistant was bespoke. To let any model — Claude Desktop, other MCP clients — drive the BookMyShow and Uber backends, the capabilities need to be exposed through a single standard protocol.',
    approach: [
      'A Model Context Protocol (MCP) server that publishes 10 tools spanning both the BookMyShow and Uber backends.',
      'Any MCP-compatible client (e.g. Claude Desktop) can discover and invoke the tools — no assistant-specific glue.',
      'Built on Spring AI\'s MCP support so tool schemas, arguments, and results are typed and validated.',
      'Turns two full backend platforms into a reusable, model-agnostic capability layer.',
    ],
    tags: ['Agentic AI'],
    tech: ['Spring AI', 'MCP'],
    repoUrl: `${GH}/portfolio-mcp-server`,
    icon: '🔌',
    isAI: true,
  },
  {
    id: 'java-lld-mastery',
    title: 'Java LLD Mastery',
    pitch:
      'OOP, 22 GoF patterns, concurrency, 33 LLD interview problems — all runnable Java.',
    problem:
      'Low-level design knowledge is easy to read about and hard to actually wield. Most resources are diagrams and prose with no runnable code to test your understanding against.',
    approach: [
      'Full coverage of OOP fundamentals and all 22 Gang-of-Four design patterns, each as a self-contained runnable example.',
      'A concurrency track covering threads, locks, and common synchronization patterns hands-on.',
      '33 classic LLD interview problems worked end to end in real Java.',
      'Structured as a learning repo you can clone, run, and extend rather than just read.',
    ],
    tags: ['Fundamentals'],
    tech: ['Java', 'Design Patterns', 'Concurrency'],
    repoUrl: `${GH}/java-lld-mastery`,
    icon: '📚',
  },
];
