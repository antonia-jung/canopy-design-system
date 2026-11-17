import type { SearchItem } from '../../patterns/Search/SearchPattern';
import type { GalleryItem } from '../../patterns/Gallery/GalleryPattern';
import type { DataRow } from '../../patterns/DataPage/DataPagePattern';

export const searchItems: SearchItem[] = [
  { id: '1', title: 'Canopy Design System', description: 'Komponenten, Tokens und Dokumentation', category: 'Projekte' },
  { id: '2', title: 'Fallstudie: Lichtung App', description: 'UX-Konzept und Prototyp', category: 'Projekte' },
  { id: '3', title: 'Artikel: Tokens in Figma', description: 'Warum Abstände konstant bleiben', category: 'Artikel', icon: 'list' },
  { id: '4', title: 'Über mich', description: 'Designerin und Entwicklerin in Leipzig', category: 'Artikel', icon: 'person' },
  { id: '5', title: 'Atelier-Nord-Website', description: 'Konzeption und Design für ein Kreativstudio', category: 'Projekte' },
  { id: '6', title: 'Artikel: Blob-Bewegung im Code', description: 'Federn statt Zwischenzustände', category: 'Artikel', icon: 'list' },
];

export const galleryItems: GalleryItem[] = [
  { id: '1', title: 'Canopy System', description: 'Komponentenbibliothek mit Tokens und Dokumentation.', category: 'Systeme', href: '#canopy' },
  { id: '2', title: 'Lichtung App', description: 'UX-Konzept, Prototyp und Usability-Test.', category: 'Apps', href: '#lichtung' },
  { id: '3', title: 'Atelier Nord', description: 'Website-Konzeption und Design für ein Kreativstudio.', category: 'Websites', href: '#atelier' },
  { id: '4', title: 'Stadt-App', description: 'Veranstaltungen, Busse und Öffnungszeiten.', category: 'Apps', href: '#stadt' },
  { id: '5', title: 'Sammel-App', description: 'Alltägliches sammeln wie Karten.', category: 'Apps', href: '#sammeln' },
  { id: '6', title: 'Portfolio', description: 'Das Spiel-Thema für diese Seite.', category: 'Websites', href: '#portfolio' },
];

export const dataRows: DataRow[] = [
  { id: '1', name: 'Max Muster', topic: 'Webdesign', status: 'Neu', date: '12.11.2026' },
  { id: '2', name: 'Anna Beispiel', topic: 'App-Konzept', status: 'Offen', date: '10.11.2026' },
  { id: '3', name: 'Jonas Test', topic: 'Branding', status: 'Erledigt', date: '08.11.2026' },
  { id: '4', name: 'Lea Probe', topic: 'Website', status: 'Offen', date: '05.11.2026' },
  { id: '5', name: 'Tim Demo', topic: 'Videoschnitt', status: 'Neu', date: '03.11.2026' },
  { id: '6', name: 'Mia Muster', topic: 'UX-Review', status: 'Erledigt', date: '01.11.2026' },
];
