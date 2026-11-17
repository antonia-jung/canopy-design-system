import { useState, type ReactNode } from 'react';
import './Avatar.css';

export type AvatarSize = 'XS' | 'S' | 'M' | 'L' | 'XL';

export interface AvatarProps {
  /** Vollständiger Name. Daraus entstehen die Initialen, und er dient als Beschreibung. */
  name: string;
  /** Bild. Fehlt es oder lädt nicht, erscheinen die Initialen. */
  src?: string;
  size?: AvatarSize;
  shape?: 'circle' | 'rounded';
}

export function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

/** Person oder Konto als Bild oder Initialen. */
export function Avatar({ name, src, size = 'M', shape = 'circle' }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const showImage = !!src && !failed;
  return (
    <span className="cp-avatar" data-size={size} data-shape={shape} role="img" aria-label={name}>
      {showImage ? (
        <img src={src} alt="" className="cp-avatar__img" onError={() => setFailed(true)} />
      ) : (
        <span className="cp-avatar__initials" aria-hidden="true">{initialsOf(name)}</span>
      )}
    </span>
  );
}

export interface AvatarLabelProps extends AvatarProps {
  /** Zweite Zeile, etwa die Rolle */
  secondary?: ReactNode;
}

/** Avatar mit Name daneben. */
export function AvatarLabel({ secondary, ...avatar }: AvatarLabelProps) {
  return (
    <span className="cp-avatarlabel" data-size={avatar.size ?? 'M'}>
      <Avatar {...avatar} />
      <span className="cp-avatarlabel__text">
        <span className="cp-avatarlabel__name">{avatar.name}</span>
        {secondary && <span className="cp-avatarlabel__secondary">{secondary}</span>}
      </span>
    </span>
  );
}

export interface AvatarGroupProps {
  people: { name: string; src?: string }[];
  /** Wie viele Avatare sichtbar sind, der Rest wird als +N gezählt */
  max?: number;
  size?: 'S' | 'M' | 'L';
}

/** Überlappende Avatare, der Rest als Zähler. */
export function AvatarGroup({ people, max = 5, size = 'M' }: AvatarGroupProps) {
  const shown = people.slice(0, max);
  const rest = people.length - shown.length;
  return (
    <span className="cp-avatargroup" data-size={size} role="group" aria-label={`${people.length} Personen`}>
      {shown.map((p) => (
        <Avatar key={p.name} {...p} size={size} />
      ))}
      {rest > 0 && (
        <span className="cp-avatar" data-size={size} data-shape="circle" role="img" aria-label={`und ${rest} weitere`}>
          <span className="cp-avatar__initials" aria-hidden="true">+{rest}</span>
        </span>
      )}
    </span>
  );
}
