import type { ReactNode } from 'react';
import { Link } from 'react-aria-components';
import './Card.css';

export interface CardProps {
  title: ReactNode;
  description?: ReactNode;
  /** Bild oder anderes Medium oben (vertikal) bzw. links (horizontal) */
  media?: ReactNode;
  /** Eigene Aktion, etwa ein Button. Bei href besser weglassen, die ganze Karte ist dann der Link. */
  action?: ReactNode;
  direction?: 'vertical' | 'horizontal';
  variant?: 'default' | 'outline' | 'elevated';
  /** Macht die ganze Karte zum Link, der Titel trägt den Link */
  href?: string;
  /** Überschriftenebene des Titels */
  headingLevel?: 2 | 3 | 4;
}

/** Container für zusammengehörigen Inhalt. Mit href ist die ganze Fläche klickbar und zeigt Hover und Fokus. */
export function Card({ title, description, media, action, direction = 'vertical', variant = 'default', href, headingLevel = 3 }: CardProps) {
  const Heading = `h${headingLevel}` as 'h2';
  return (
    <article className="cp-card" data-direction={direction} data-variant={variant} data-interactive={href ? true : undefined}>
      {media && <div className="cp-card__media">{media}</div>}
      <div className="cp-card__body">
        <Heading className="cp-card__title">
          {href ? <Link href={href} className="cp-card__link">{title}</Link> : title}
        </Heading>
        {description && <p className="cp-card__description">{description}</p>}
        {action && <div className="cp-card__action">{action}</div>}
      </div>
    </article>
  );
}
