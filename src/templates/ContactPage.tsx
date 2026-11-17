import { SiteFrame } from './SiteFrame';
import { ContactPattern, type ContactPatternProps } from '../patterns/Contact/ContactPattern';

export interface ContactPageProps extends Pick<ContactPatternProps, 'onSubmit' | 'sent'> {
  email?: string;
}

/** Kontaktseite: Einleitung, Formular und ein direkter Weg per E-Mail. */
export function ContactPage({ onSubmit, sent, email = 'hallo@lichtung.example' }: ContactPageProps) {
  return (
    <SiteFrame currentId="kontakt">
      <section className="cp-template__section" aria-labelledby="tpl-kontakt">
        <div className="cp-tpl-prose">
          <h1 id="tpl-kontakt" className="cp-tpl-title">Kontakt</h1>
          <p className="cp-tpl-lead">Erzähl mir von deinem Projekt. Ich antworte innerhalb von zwei Werktagen.</p>
        </div>
        <ContactPattern onSubmit={onSubmit} sent={sent} />
      </section>
      <section className="cp-template__section" aria-labelledby="tpl-direkt">
        <h2 id="tpl-direkt" className="cp-tpl-heading cp-tpl-heading--small">Lieber direkt?</h2>
        <p className="cp-tpl-body"><a className="cp-tpl-link" href={`mailto:${email}`}>{email}</a> · Leipzig</p>
      </section>
    </SiteFrame>
  );
}
