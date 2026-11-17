import './Skeleton.css';

export interface SkeletonProps {
  type?: 'line' | 'rectangle' | 'circle';
  size?: 'S' | 'M' | 'L';
  width?: number | string;
  height?: number | string;
}

/**
 * Platzhalter beim Laden. Er ist für Screenreader unsichtbar. Der umgebende Bereich sollte
 * aria-busy="true" tragen und einen Hinweis wie "Lädt" ankündigen.
 */
export function Skeleton({ type = 'line', size = 'M', width, height }: SkeletonProps) {
  return <span className="cp-skeleton" data-type={type} data-size={size} aria-hidden="true" style={{ width, height }} />;
}
