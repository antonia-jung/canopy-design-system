import { useMemo, useState, type ReactNode } from 'react';
import { Card } from '../../components/Card/Card';
import { SegmentedControl } from '../../components/SegmentedControl/SegmentedControl';
import { Pagination } from '../../components/Pagination/Pagination';
import { ImageFrame } from '../../components/ImageFrame/ImageFrame';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import '../Login/Login.css';
import './Gallery.css';

export interface GalleryItem { id: string; title: string; description: string; category: string; href?: string; image?: string; action?: ReactNode }

export interface GalleryPatternProps {
  title?: string;
  items: GalleryItem[];
  /** Segmente des Filters, „Alle“ kommt automatisch davor */
  categories: string[];
  pageSize?: number;
}

/** Bildraster aus Cards mit Filter und Seitenwechsel. Das Raster passt die Spalten an die Breite des Bereichs an. */
export function GalleryPattern({ title = 'Projekte', items, categories, pageSize = 3 }: GalleryPatternProps) {
  const [category, setCategory] = useState('Alle');
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => items.filter((i) => category === 'Alle' || i.category === category), [items, category]);
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pages);
  const shown = filtered.slice((current - 1) * pageSize, current * pageSize);

  return (
    <div className="cp-container cp-pattern cp-gallery">
      <div className="cp-gallery__inner">
        <div className="cp-gallery__header">
          <h2 className="cp-login__title" style={{ fontSize: 32 }}>{title}</h2>
          <div className="cp-gallery__filter"><SegmentedControl aria-label="Kategorie" segments={['Alle', ...categories].map((c) => ({ id: c, label: c }))} selectedKey={category} onSelectionChange={(k) => { setCategory(String(k)); setPage(1); }} /></div>
        </div>
        {shown.length > 0 ? (
          <ul className="cp-gallery__grid">
            {shown.map((i) => (
              <li key={i.id}><Card title={i.title} description={i.description} href={i.href} action={i.action} media={i.image ? <img src={i.image} alt="" style={{ objectFit: 'cover', height: '100%' }} /> : <ImageFrame ratio="16:9" rounded={false} />} /></li>
            ))}
          </ul>
        ) : <EmptyState title="Nichts in dieser Kategorie" description="Wähle eine andere Kategorie." />}
        {pages > 1 && <Pagination total={pages} page={current} onPageChange={setPage} type="numbered" aria-label="Seiten der Galerie" />}
      </div>
    </div>
  );
}
