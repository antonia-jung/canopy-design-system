import './Badge.css';

export type BadgeIntent = 'default' | 'error' | 'success' | 'info' | 'warning';

export interface BadgeProps {
  intent?: BadgeIntent;
  /** Zahl oder kurzer Text. Ohne Wert erscheint ein Punkt. */
  children?: string | number;
  /** Für den Punkt: wofür er steht, etwa "Neue Nachricht" */
  label?: string;
  /** Obergrenze, darüber steht "99+" */
  max?: number;
}

/** Kleine Markierung für Status oder Anzahl. Als Punkt braucht sie ein Label, damit Screenreader sie vorlesen. */
export function Badge({ intent = 'default', children, label, max = 99 }: BadgeProps) {
  const isDot = children === undefined || children === '';
  const text = typeof children === 'number' && children > max ? `${max}+` : children;
  return (
    <span
      className="cp-badge"
      data-intent={intent}
      data-type={isDot ? 'dot' : 'number'}
      role={isDot ? 'img' : undefined}
      aria-label={isDot ? label : undefined}
      aria-hidden={isDot && !label ? true : undefined}
    >
      {!isDot && text}
    </span>
  );
}
