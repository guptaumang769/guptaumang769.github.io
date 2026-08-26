import { motion } from 'framer-motion';

export type Filter =
  | 'All'
  | 'Microservices'
  | 'Systems'
  | 'Agentic AI'
  | 'Real-time'
  | 'Fundamentals';

export const FILTERS: Filter[] = [
  'All',
  'Microservices',
  'Systems',
  'Agentic AI',
  'Real-time',
  'Fundamentals',
];

interface FilterTabsProps {
  active: Filter;
  onChange: (f: Filter) => void;
}

export default function FilterTabs({ active, onChange }: FilterTabsProps) {
  return (
    <div className="filter-tabs" role="tablist" aria-label="Filter projects">
      {FILTERS.map((f) => {
        const isActive = f === active;
        return (
          <button
            key={f}
            className={`tab${isActive ? ' active' : ''}`}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(f)}
          >
            {isActive && (
              <motion.span
                layoutId="tab-pill"
                className="tab-pill"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span>{f}</span>
          </button>
        );
      })}
    </div>
  );
}
