import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Reveal from './components/Reveal';
import FilterTabs, { type Filter } from './components/FilterTabs';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import Experience from './components/Experience';
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
              Production-style backend systems. Click any card for the problem,
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

        <Experience />
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
