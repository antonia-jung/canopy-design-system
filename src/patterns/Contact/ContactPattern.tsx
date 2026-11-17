import { useState, type FormEvent } from 'react';
import { Input } from '../../components/Input/Input';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { TextArea } from '../../components/TextArea/TextArea';
import { Checkbox } from '../../components/Checkbox/Checkbox';
import { Button } from '../../components/Button/Button';
import { Alert } from '../../components/Alert/Alert';
import '../Login/Login.css';
import './Contact.css';

export interface ContactValues { name: string; email: string; topic: string; message: string }

export interface ContactPatternProps {
  topics?: { id: string; label: string }[];
  onSubmit?: (values: ContactValues) => void | Promise<void>;
  onCancel?: () => void;
  /** Zeigt nach dem Senden eine Bestätigung statt des Formulars */
  sent?: boolean;
}

const defaultTopics = [{ id: 'projekt', label: 'Neues Projekt' }, { id: 'zusammenarbeit', label: 'Zusammenarbeit' }, { id: 'sonstiges', label: 'Sonstiges' }];
const emailOk = (v: string) => /^\S+@\S+\.\S+$/.test(v);

/** Kontaktformular mit Anliegen, Nachricht und Einwilligung. Fehler erscheinen erst nach dem Absenden. */
export function ContactPattern({ topics = defaultTopics, onSubmit, onCancel, sent }: ContactPatternProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState(false);
  const errors = {
    name: touched && !name.trim() ? 'Bitte gib deinen Namen ein.' : undefined,
    email: touched && !emailOk(email) ? 'Bitte gib eine gültige E-Mail-Adresse ein.' : undefined,
    topic: touched && !topic ? 'Bitte wähle ein Thema.' : undefined,
    message: touched && !message.trim() ? 'Bitte schreib kurz, worum es geht.' : undefined,
    consent: touched && !consent,
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (name.trim() && emailOk(email) && topic && message.trim() && consent) void onSubmit?.({ name, email, topic, message });
  };

  if (sent) {
    return (
      <div className="cp-container cp-pattern cp-contact">
        <div className="cp-contact__panel">
          <Alert intent="success" title="Nachricht gesendet">Danke für deine Nachricht. Ich melde mich innerhalb von zwei Werktagen.</Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="cp-container cp-pattern cp-contact">
      <form className="cp-contact__panel" onSubmit={submit} noValidate>
        <div className="cp-login__heading">
          <h2 className="cp-login__title">Kontakt aufnehmen</h2>
          <p className="cp-login__description">Erzähl mir kurz von deinem Projekt. Ich melde mich innerhalb von zwei Werktagen.</p>
        </div>
        <div className="cp-contact__row">
          <Input label="Name" autoComplete="name" value={name} onChange={setName} isRequired validation={errors.name ? 'error' : 'none'} hint={errors.name} />
          <Input label="E-Mail" type="email" autoComplete="email" value={email} onChange={setEmail} isRequired validation={errors.email ? 'error' : 'none'} hint={errors.email} />
        </div>
        <Dropdown label="Thema" placeholder="Bitte wählen" isRequired groups={[{ items: topics }]} selectedKey={topic} onSelectionChange={(k) => setTopic(k as string | null)} validation={errors.topic ? 'error' : 'none'} hint={errors.topic} />
        <TextArea label="Nachricht" value={message} onChange={setMessage} maxLength={1000} showCount isRequired hint={errors.message ?? 'Worum geht es, und bis wann?'} validation={errors.message ? 'error' : 'none'} />
        <div className="cp-contact__consent">
          <Checkbox isSelected={consent} onChange={setConsent} isInvalid={errors.consent}>Ich stimme der Verarbeitung meiner Daten zu</Checkbox>
          {errors.consent && <span className="cp-contact__error" role="alert">Ohne Einwilligung kann ich die Nachricht nicht annehmen.</span>}
        </div>
        <div className="cp-contact__actions">
          <Button variant="transparent" onPress={onCancel}>Abbrechen</Button>
          <Button variant="outline" type="submit">Nachricht senden</Button>
        </div>
      </form>
    </div>
  );
}
