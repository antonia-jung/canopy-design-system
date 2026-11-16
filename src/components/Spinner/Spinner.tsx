import './Spinner.css';

export interface SpinnerProps {
  size?: 'S' | 'M' | 'L';
  /** On action: hell, für dunkle oder grüne Flächen */
  tone?: 'default' | 'on-action';
  /** Text für Screenreader. Leer, wenn der umgebende Button schon Bescheid gibt. */
  label?: string;
}

const px = { S: 16, M: 24, L: 32 };

export function Spinner({ size = 'S', tone = 'default', label = 'Lädt' }: SpinnerProps) {
  return (
    <span
      className="cp-spinner"
      role={label ? 'status' : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      data-style={tone}
      style={{ ['--cp-spinner-size' as string]: `${px[size]}px` }}
    />
  );
}
