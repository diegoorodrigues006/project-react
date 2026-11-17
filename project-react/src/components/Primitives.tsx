import { Star, StarHalf } from 'lucide-react';
import type { ReactNode } from 'react';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`page-container ${className}`.trim()}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div className="section-heading-copy">
        <p className="section-eyebrow"><span />{eyebrow}</p>
        <h2>{title} {accent && <em>{accent}</em>}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {action && <div className="section-action">{action}</div>}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  accent,
  description,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
}) {
  return (
    <section className="page-header">
      <div className="page-header-glow" aria-hidden="true" />
      <div className="page-container page-header-content">
        <p className="section-eyebrow"><span />{eyebrow}</p>
        <h1>{title} <em>{accent}</em></h1>
        <p>{description}</p>
      </div>
    </section>
  );
}

export function FilterChips<T extends string>({
  options,
  value,
  onChange,
  allLabel = 'Todos',
  label = 'Filtrar',
}: {
  options: readonly T[];
  value: T | 'all';
  onChange: (value: T | 'all') => void;
  allLabel?: string;
  label?: string;
}) {
  return (
    <div className="filter-chips" role="group" aria-label={label}>
      <button
        type="button"
        className="filter-chip"
        data-active={value === 'all'}
        aria-pressed={value === 'all'}
        onClick={() => onChange('all')}
      >
        {allLabel}
      </button>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className="filter-chip"
          data-active={value === option}
          aria-pressed={value === option}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export function StarRating({ value }: { value: number }) {
  const fullStars = Math.floor(value);
  const hasHalf = value - fullStars >= 0.5;
  return (
    <span className="star-rating" aria-label={`Nota ${value} de 5`}>
      {Array.from({ length: 5 }, (_, index) => {
        if (index < fullStars) return <Star key={index} size={14} fill="currentColor" />;
        if (index === fullStars && hasHalf) return <StarHalf key={index} size={14} fill="currentColor" />;
        return <Star key={index} size={14} />;
      })}
    </span>
  );
}

export function Equalizer({ active = true }: { active?: boolean }) {
  return (
    <span className={`equalizer${active ? ' equalizer--active' : ''}`} aria-hidden="true">
      {[0, 0.2, 0.4, 0.1].map((delay, index) => (
        <span key={index} style={{ animationDelay: `${delay}s` }} />
      ))}
    </span>
  );
}

