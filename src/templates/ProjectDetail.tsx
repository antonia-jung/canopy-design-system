import { SiteFrame } from './SiteFrame';
import { Button } from '../components/Button/Button';
import { ImageFrame } from '../components/ImageFrame/ImageFrame';
import { sampleHero, sampleCanopy, sampleLichtung } from './sampleImages';

export interface ProjectDetailProps {
  category?: string;
  title?: string;
  intro?: string;
  meta?: { label: string; value: string }[];
  sections?: { heading: string; body: string }[];
  nextProject?: string;
  onNext?: () => void;
  onContact?: () => void;
}

const defaultMeta = [{ label: 'Rolle', value: 'Design und Entwicklung' }, { label: 'Zeitraum', value: '2026' }, { label: 'Werkzeuge', value: 'Figma, Tokens' }];
const defaultSections = [
  { heading: 'Ausgangslage', body: 'Das Portfolio braucht eine konsistente visuelle Sprache, die sich schnell erweitern lässt.' },
  { heading: 'Lösung', body: 'Ein Token-basiertes System mit Brand-, Alias- und Mapped-Variablen, Komponenten mit Zuständen und einer lebendigen Dokumentation.' },
  { heading: 'Ergebnis', body: 'Über 60 Komponenten, Light und Dark Mode, dokumentiert und barrierearm.' },
];

/** Fallstudie: Titel mit Eckdaten, Hauptbild, Abschnitte, Galerie und Verweis auf das nächste Projekt. */
export function ProjectDetail({
  category = 'Projekt',
  title = 'Canopy – Designsystem für Portfolio und Web',
  intro = 'Eine schlanke, vollständige Komponentenbibliothek mit Tokens, Light/Dark und Dokumentation.',
  meta = defaultMeta,
  sections = defaultSections,
  nextProject = 'Lichtung App',
  onNext,
  onContact,
}: ProjectDetailProps) {
  return (
    <SiteFrame currentId="projekte" onContact={onContact}>
      <article>
        <header className="cp-template__section cp-tpl-head">
          <p className="cp-tpl-eyebrow">{category}</p>
          <h1 className="cp-tpl-title">{title}</h1>
          <p className="cp-tpl-lead">{intro}</p>
          <dl className="cp-tpl-meta">
            {meta.map((m) => (
              <div key={m.label}><dt>{m.label}</dt><dd>{m.value}</dd></div>
            ))}
          </dl>
        </header>
        <div className="cp-template__section cp-tpl-tight"><ImageFrame ratio="16:9" src={sampleHero} alt="Hauptbild des Projekts" /></div>
        {sections.map((s) => (
          <section key={s.heading} className="cp-template__section" aria-label={s.heading}>
            <div className="cp-tpl-prose">
              <h2 className="cp-tpl-heading">{s.heading}</h2>
              <p className="cp-tpl-body">{s.body}</p>
            </div>
          </section>
        ))}
        <section className="cp-template__section" aria-label="Galerie">
          <div className="cp-tpl-grid cp-tpl-grid--2">
            <ImageFrame ratio="4:3" src={sampleCanopy} alt="Detailansicht 1" />
            <ImageFrame ratio="4:3" src={sampleLichtung} alt="Detailansicht 2" />
          </div>
        </section>
      </article>
      <aside className="cp-template__section" aria-label="Nächstes Projekt">
        <div className="cp-tpl-next">
          <h2 className="cp-tpl-heading cp-tpl-heading--small">Nächstes Projekt: {nextProject}</h2>
          <Button variant="outline" iconRight="chevronRight" onPress={onNext}>Ansehen</Button>
        </div>
      </aside>
    </SiteFrame>
  );
}
