import { SiteFrame } from './SiteFrame';
import { Button } from '../components/Button/Button';
import { Card } from '../components/Card/Card';
import { ImageFrame } from '../components/ImageFrame/ImageFrame';
import { Avatar } from '../components/Avatar/Avatar';

export interface LandingProject { id: string; title: string; description: string; href?: string; image?: string }

export interface LandingPageProps {
  projects?: LandingProject[];
  onContact?: () => void;
}

const defaultProjects: LandingProject[] = [
  { id: 'canopy', title: 'Canopy System', description: 'Komponentenbibliothek mit Tokens und Dokumentation.' },
  { id: 'lichtung', title: 'Lichtung App', description: 'UX-Konzept, Prototyp und Usability-Test.' },
  { id: 'kaesslight', title: 'Kaesslight', description: 'Website-Konzeption und Design für eine Live-Band.' },
];

/** Startseite: Hero, ausgewählte Projekte, Kurzvorstellung und Einladung zum Kontakt. */
export function LandingPage({ projects = defaultProjects, onContact }: LandingPageProps) {
  return (
    <SiteFrame currentId="start" onContact={onContact}>
      <section id="start" className="cp-template__section cp-tpl-hero">
        <div className="cp-tpl-hero__text">
          <h1 className="cp-tpl-title">Gestaltung mit Ruhe und Klarheit.</h1>
          <p className="cp-tpl-lead">Ich gestalte und entwickle digitale Produkte, die sich einfach anfühlen und sauber gebaut sind.</p>
          <div className="cp-tpl-actions">
            <Button variant="inverse">Projekte ansehen</Button>
            <Button variant="outline" onPress={onContact}>Kontakt</Button>
          </div>
        </div>
        <ImageFrame ratio="16:9" alt="Vorschau eines Projekts" />
      </section>

      <section id="projekte" className="cp-template__section" aria-labelledby="tpl-projekte">
        <h2 id="tpl-projekte" className="cp-tpl-heading">Ausgewählte Projekte</h2>
        <ul className="cp-tpl-grid cp-tpl-grid--3">
          {projects.map((p) => (
            <li key={p.id}>
              <Card
                title={p.title}
                description={p.description}
                href={p.href ?? `#${p.id}`}
                media={<ImageFrame ratio="16:9" src={p.image} alt={p.image ? p.title : ''} rounded={false} />}
                action={<span className="cp-tpl-more">Mehr erfahren</span>}
              />
            </li>
          ))}
        </ul>
      </section>

      <section id="ueber-mich" className="cp-template__section" aria-labelledby="tpl-ueber">
        <div className="cp-tpl-about">
          <Avatar name="Toni Jung" size="XL" />
          <div className="cp-tpl-about__text">
            <h2 id="tpl-ueber" className="cp-tpl-heading">Hallo, ich bin Toni.</h2>
            <p className="cp-tpl-body">Ich studiere Medientechnik in Leipzig und arbeite als freiberufliche Designerin und Entwicklerin. Mein Schwerpunkt liegt auf UX und Frontend.</p>
            <div><Button variant="transparent">Mehr über mich</Button></div>
          </div>
        </div>
      </section>

      <section className="cp-template__section" aria-labelledby="tpl-cta">
        <div className="cp-tpl-panel">
          <h2 id="tpl-cta" className="cp-tpl-heading">Lass uns zusammenarbeiten.</h2>
          <p className="cp-tpl-body">Du hast ein Projekt im Kopf? Schreib mir, ich melde mich innerhalb von zwei Werktagen.</p>
          <div><Button variant="outline" onPress={onContact}>Nachricht senden</Button></div>
        </div>
      </section>
    </SiteFrame>
  );
}
