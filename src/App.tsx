import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Reveal from './components/Reveal';
import FilterTabs, { type Filter } from './components/FilterTabs';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import Skills from './components/Skills';
import About from './components/About';
import Footer from './components/Footer';
import { useTheme } from './hooks/useTheme';
import { projects, type Project } from './data/projects';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  // Client-side filter state — "All" by default, no router needed.
  const [filter, setFilter] = useState<Filter>('All');
  const [selected, setSelected] = useState<Project | null>(null);

  const visible = useMemo(
    () =>
      filter === 'All'
        ? projects
        : projects.filter((p) => p.tags.includes(filter)),
    [filter],
  );

  const aiProjects = useMemo(() => projects.filter((p) => p.isAI), []);

  return (
    <>
      <Nav theme={theme} onToggleTheme={toggleTheme} />

      <div className="page">
        <Hero />
        <Stats />

        {/* ---------- Projects (filterable) ---------- */}
        <section className="section" id="projects">
          <Reveal>
            <h2 className="section-title">
              Selected <span className="brace">{'{work}'}</span>
            </h2>
            <p className="section-sub">
              Thirteen production-style systems. Click any card for the problem,
              approach, and links.
            </p>
          </Reveal>

          <FilterTabs active={filter} onChange={setFilter} />
          <motion.div className="project-grid" layout>
            <AnimatePresence>
              {visible.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpen={setSelected}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* ---------- AI systems ---------- */}
        <section className="section" id="ai">
          <Reveal>
            <h2 className="section-title">
              Agentic <span className="brace">{'{AI}'}</span>
            </h2>
            <p className="section-sub">
              LLM agents that tool-call into the backends above — plus an MCP
              server that exposes them to any model.
            </p>
          </Reveal>
          <div className="project-grid">
            {aiProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={setSelected}
              />
            ))}
          </div>
        </section>

        <Skills />
        <About />
        <Footer />
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
