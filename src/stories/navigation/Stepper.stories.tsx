import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Stepper } from '../../components/Stepper/Stepper';
import { Button } from '../../components/Button/Button';
import { Page, Section } from '../foundations/helpers';

const steps = [
  { id: 'a', label: 'Kontakt' },
  { id: 'b', label: 'Projekt' },
  { id: 'c', label: 'Budget' },
  { id: 'd', label: 'Senden' },
];

const meta: Meta<typeof Stepper> = { title: 'Navigation/Stepper', component: Stepper, parameters: { layout: 'padded' }, args: { steps, current: 1 } };
export default meta;
type Story = StoryObj<typeof Stepper>;

export const Playground: Story = {};

const Flow = ({ orientation }: { orientation?: 'horizontal' | 'vertical' | 'auto' }) => {
  const [cur, setCur] = useState(0);
  return (
    <div style={{ display: 'grid', gap: 24, maxWidth: 800 }}>
      <Stepper steps={steps} current={cur} orientation={orientation} />
      <p className="cp-text-paragraph-medium" style={{ margin: 0 }}>Inhalt von Schritt {cur + 1}.</p>
      <div style={{ display: 'flex', gap: 12 }}>
        {cur > 0 && <Button variant="outline" onPress={() => setCur((c) => c - 1)}>Zurück</Button>}
        {cur < steps.length - 1 && <Button onPress={() => setCur((c) => c + 1)}>Weiter</Button>}
      </div>
    </div>
  );
};

/** Mobil: 375 px breiter Rahmen. Der Stepper reagiert auf seine Breite und ordnet die Schritte untereinander an. */
export const Mobile: Story = {
  render: () => (
    <div style={{ width: 375, border: '1px solid var(--cp-border-default)', margin: 24, padding: 24, boxSizing: 'border-box' }}>
      <Flow />
    </div>
  ),
};

export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Stepper" intro="Zeigt den Fortschritt durch einen mehrstufigen Ablauf. Die Linie füllt sich, erledigte Schritte zeigen ein Häkchen.">
      <Section title="Mit Zurück und Weiter">
        <Flow />
      </Section>
      <Section title="Mobil" note="Unter 768 px Breite stehen die Schritte untereinander (orientation=&quot;auto&quot;). Mit orientation=&quot;vertical&quot; lässt sich das erzwingen.">
        <div style={{ width: 375, border: '1px solid var(--cp-border-default)', borderRadius: 'var(--cp-radius-lg)', padding: 24, boxSizing: 'border-box' }}>
          <Flow />
        </div>
      </Section>
      <Section title="Zustände">
        <div style={{ display: 'grid', gap: 24 }}>
          <Stepper steps={steps} current={0} />
          <Stepper steps={steps} current={2} />
          <Stepper steps={steps} current={2} errorAt={1} />
          <Stepper steps={[{ id: 'a', label: 'Kontakt', description: 'Name und E-Mail' }, ...steps.slice(1)]} current={1} orientation="vertical" />
        </div>
      </Section>
    </Page>
  ),
};
