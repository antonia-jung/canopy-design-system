import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState, type ReactNode } from 'react';
import { Button, type ButtonStatus, type ButtonVariant } from '../../components/Button/Button';
import { iconNames } from '../../components/Icon/Icon';
import { Page, Section } from '../foundations/helpers';

const meta: Meta<typeof Button> = {
  title: 'Actions/Button',
  component: Button,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'inverse', 'outline', 'transparent'] },
    status: { control: 'inline-radio', options: ['idle', 'loading', 'success', 'error'] },
    iconLeft: { control: 'select', options: [undefined, ...iconNames] },
    iconRight: { control: 'select', options: [undefined, ...iconNames] },
    isDisabled: { control: 'boolean' },
  },
  args: { children: 'Projekte ansehen', variant: 'default', status: 'idle' },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

const Row = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>{children}</div>
);

/** Fläche in Action-Farbe, auf der Outline automatisch die hellen Farben nutzt */
const ActionPanel = ({ children }: { children: ReactNode }) => (
  <div
    data-context="on-action"
    style={{ background: 'var(--cp-surface-action)', color: 'var(--cp-text-on-action)', borderRadius: 'var(--cp-radius-lg)', padding: 24, display: 'grid', gap: 16 }}
  >
    {children}
  </div>
);

const variants: { v: ButtonVariant; note: string }[] = [
  { v: 'default', note: 'Weich erhaben, auf Seitenflächen' },
  { v: 'inverse', note: 'Hauptaktion neben einem Default-Button' },
  { v: 'outline', note: 'Auf Karten, Panels und grünen Flächen' },
  { v: 'transparent', note: 'Abbrechen, Schließen, Zurücksetzen' },
];

export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page
      title="Button"
      intro="Löst eine Aktion aus. Pro Ansicht höchstens eine Hauptaktion. Hover, gedrückt, Fokus und deaktiviert kommen von React Aria als data-Attribute."
    >
      {variants.map(({ v, note }) => (
        <Section key={v} title={v[0].toUpperCase() + v.slice(1)} note={note}>
          <Row>
            <Button variant={v}>Speichern</Button>
            <Button variant={v} iconLeft="add">Hinzufügen</Button>
            <Button variant={v} iconRight="arrowForward">Weiter</Button>
            <Button variant={v} isDisabled>Deaktiviert</Button>
          </Row>
        </Section>
      ))}
      <Section title="Auf Action-Flächen" note='data-context="on-action" schaltet Outline und Transparent auf helle Farben und einen schwächeren Verlauf.'>
        <ActionPanel>
          <strong className="cp-text-heading-h5">Lass uns zusammenarbeiten</strong>
          <Row>
            <Button variant="outline" iconRight="mail">Kontakt</Button>
            <Button variant="transparent">Später</Button>
          </Row>
        </ActionPanel>
      </Section>
    </Page>
  ),
};

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Speichern: Spinner, dann Erfolg auf dem Button, danach zurück */
const SaveFlow = ({ fail = false, idle, done, failed }: { fail?: boolean; idle: string; done: string; failed: string }) => {
  const [status, setStatus] = useState<ButtonStatus>('idle');
  const tries = useRef(0);
  const label = status === 'loading' ? 'Speichert …' : status === 'success' ? done : status === 'error' ? failed : idle;
  return (
    <Button
      variant="inverse"
      iconLeft={fail ? 'mail' : 'save'}
      status={status}
      onPress={async () => {
        setStatus('loading');
        await wait(1400);
        tries.current += 1;
        // Der erste Versuch schlägt beim Fehlerbeispiel fehl, der zweite klappt
        const ok = !fail || tries.current % 2 === 0;
        setStatus(ok ? 'success' : 'error');
        if (ok) {
          await wait(1800);
          setStatus('idle');
        }
      }}
    >
      {label}
    </Button>
  );
};

export const Dynamisch: Story = {
  name: 'Dynamischer Button',
  render: () => (
    <Page
      title="Dynamischer Button"
      intro="Der Button zeigt Laden und Ergebnis direkt an sich selbst. Die Breite gleitet mit leichtem Nachfedern mit, das Statusicon poppt kurz auf. Bei reduzierter Bewegung wechselt alles ohne Animation."
    >
      <Section title="Speichern" note="Laden, dann Erfolg. Nach kurzer Zeit zurück in den Ausgangszustand.">
        <Row>
          <SaveFlow idle="Speichern" done="Gespeichert" failed="Fehlgeschlagen" />
        </Row>
      </Section>
      <Section title="Senden mit Fehler" note="Der erste Versuch scheitert, der Button bietet direkt den neuen Versuch an.">
        <Row>
          <SaveFlow fail idle="Senden" done="Gesendet" failed="Erneut versuchen" />
        </Row>
      </Section>
      <Section title="Alle Zustände" note="status: idle, loading, success, error">
        <Row>
          <Button status="idle" iconLeft="save">Speichern</Button>
          <Button status="loading">Speichert …</Button>
          <Button status="success">Gespeichert</Button>
          <Button status="error">Fehlgeschlagen</Button>
        </Row>
        <Row>
          <Button variant="outline" status="success">Gespeichert</Button>
          <Button variant="outline" status="error">Fehlgeschlagen</Button>
          <Button variant="inverse" status="loading">Sendet …</Button>
        </Row>
      </Section>
    </Page>
  ),
};
