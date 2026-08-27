import { useCountUp } from '../hooks/useCountUp';
import { useInView } from '../hooks/useInView';
import Reveal from './Reveal';

interface StatDef {
  value: number;
  suffix?: string;
  label: string;
}

const STATS: StatDef[] = [
  { value: 7, suffix: '+', label: 'yrs experience' },
  { value: 8, label: 'projects' },
  { value: 40, suffix: '+', label: 'services / datastores' },
  { value: 990, suffix: '+', label: 'tenants served' },
];

function StatItem({ stat, active }: { stat: StatDef; active: boolean }) {
  const n = useCountUp(stat.value, active);
  return (
    <div className="stat">
      <span className="num">
        {n}
        {stat.suffix && <span className="suffix">{stat.suffix}</span>}
      </span>
      <span className="label">{stat.label}</span>
    </div>
  );
}

export default function Stats() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  return (
    <Reveal>
      <div className="stats-strip" ref={ref} aria-label="Portfolio at a glance">
        {STATS.map((s) => (
          <StatItem key={s.label} stat={s} active={inView} />
        ))}
      </div>
    </Reveal>
  );
}
