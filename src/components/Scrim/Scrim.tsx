import './Scrim.css';

export interface ScrimProps {
  /** Klick auf die Fläche, etwa zum Schließen eines nicht-kritischen Overlays */
  onClick?: () => void;
}

/**
 * Abdunklung hinter einem Overlay. Dialog und Drawer bringen ihren eigenen Scrim mit,
 * diese Komponente ist für eigene Overlays gedacht. Sie ist nur Optik, für Screenreader unsichtbar.
 */
export function Scrim({ onClick }: ScrimProps) {
  return <div className="cp-scrim" aria-hidden="true" onClick={onClick} />;
}
