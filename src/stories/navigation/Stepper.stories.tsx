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

const Flow = () => {
  const [cur, setCur] = useState(0);
  return (
    <div style={{ display: 'grid', gap: 24, maxWidth: 800 }}>
      <Stepper steps={steps} current={cur} />
      <p className="cp-text-paragraph-medium" style={{ margin: 0 }}>Inhalt von Schritt {cur + 1}.</p>
      <div style={{ display: 'flex', gap: 12 }}>
        {cur > 0 && <Button variant="outline" onPress={() => setCur((c) => c - 1)}>Zurück</Button>}
        {cur < steps.length - 1 && <Button onPress={() => setCur((c) => c + 1)}>Weiter</Button>}
      </div>
    </div>
  );
};

export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Stepper" intro="Zeigt den Fortschritt durch einen mehrstufigen Ablauf. Die Linie füllt sich, erledigte Schritte zeigen ein Häkchen. Am Handy stehen die Schritte untereinander.">
      <Section title="Mit Zurück und Weiter">
        <Flow />
      </Section>
      <Section title="Zustände">
        <div style={{ display: 'grid', gap: 24 }}>
          <Stepper steps={steps} current={0} />
          <Stepper steps={steps} current={2} />
          <Stepper steps={steps} current={2} errorAt={1} />
        </div>
      </Section>
    </Page>
  ),
};
