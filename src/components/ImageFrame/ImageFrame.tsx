import { Icon } from '../Icon/Icon';
import './ImageFrame.css';

export interface ImageFrameProps {
  src?: string;
  /** Beschreibung des Bildes. Leer lassen, wenn es nur Schmuck ist. */
  alt?: string;
  ratio?: '1:1' | '4:3' | '16:9' | '3:4';
  rounded?: boolean;
  /** Breite, sonst füllt der Rahmen den Platz */
  width?: number | string;
}

/** Bildrahmen mit festem Seitenverhältnis. Ohne Bild zeigt er einen Platzhalter, so springt das Layout beim Laden nicht. */
export function ImageFrame({ src, alt = '', ratio = '4:3', rounded = true, width }: ImageFrameProps) {
  return (
    <div className="cp-imageframe" data-ratio={ratio} data-rounded={rounded || undefined} style={width ? { width } : undefined}>
      {src ? (
        <img src={src} alt={alt} loading="lazy" className="cp-imageframe__img" />
      ) : (
        <span className="cp-imageframe__placeholder" role={alt ? 'img' : undefined} aria-label={alt || undefined} aria-hidden={alt ? undefined : true}>
          <Icon name="image" size={32} />
        </span>
      )}
    </div>
  );
}
