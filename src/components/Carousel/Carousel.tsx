import { useState, type ReactNode, type KeyboardEvent } from 'react';
import { Button as AriaButton } from 'react-aria-components';
import { Icon } from '../Icon/Icon';
import './Carousel.css';

export interface CarouselProps {
  slides: ReactNode[];
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (i: number) => void;
  'aria-label': string;
}

/** Inhalte nacheinander. Pfeile oder ← und → blättern, die Leiste zeigt den Fortschritt. Kein Autoplay. */
export function Carousel({ slides, index, defaultIndex = 0, onIndexChange, 'aria-label': label }: CarouselProps) {
  const [inner, setInner] = useState(defaultIndex);
  const n = slides.length;
  const current = Math.min(n - 1, Math.max(0, index ?? inner));
  const go = (i: number) => {
    const k = Math.min(n - 1, Math.max(0, i));
    setInner(k);
    onIndexChange?.(k);
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(current + 1); }
  };
  return (
    <section className="cp-carousel" aria-roledescription="Karussell" aria-label={label} onKeyDown={onKey}>
      <div className="cp-carousel__viewport">
        <div className="cp-carousel__strip" style={{ transform: `translateX(${-current * 100}%)` }} aria-live="polite">
          {slides.map((s, i) => (
            <div key={i} className="cp-carousel__slide" role="group" aria-roledescription="Folie" aria-label={`${i + 1} von ${n}`} aria-hidden={i !== current || undefined} inert={i !== current || undefined}>
              {s}
            </div>
          ))}
        </div>
      </div>
      <div className="cp-carousel__controls">
        <AriaButton className="cp-carousel__arrow" isDisabled={current === 0} onPress={() => go(current - 1)} aria-label="Vorherige Folie">
          <Icon name="chevronLeft" size={20} />
        </AriaButton>
        <div className="cp-carousel__bar" role="presentation">
          <div className="cp-carousel__fill" style={{ width: `${((current + 1) / n) * 100}%` }} />
        </div>
        <AriaButton className="cp-carousel__arrow" isDisabled={current === n - 1} onPress={() => go(current + 1)} aria-label="Nächste Folie">
          <Icon name="chevronRight" size={20} />
        </AriaButton>
      </div>
    </section>
  );
}
