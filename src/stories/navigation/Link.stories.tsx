import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from '../../components/Link/Link';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Page, Section } from '../foundations/helpers';

const meta: Meta<typeof Link> = { title: 'Navigation/Link', component: Link, parameters: { layout: 'padded' }, args: { children: 'Zum Projekt', href: '#' } };
export default meta;
type Story = StoryObj<typeof Link>;

export const Playground: Story = {};

export const Uebersicht: Story = {
  name: 'Übersicht',
  render: () => (
    <Page title="Link und Breadcrumbs" intro="Links führen zu einer anderen Seite oder Stelle. Für Aktionen den Button nehmen. Breadcrumbs zeigen den Weg durch die Seitenstruktur.">
      <Section title="Link" note="Unterstrichen, beim Hover in Action-Farbe. Externe Links öffnen in neuem Tab und zeigen ein Icon.">
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <Link href="#">Standard</Link>
          <Link href="#" iconLeft="home">Mit Icon</Link>
          <Link href="#" isExternal>Extern</Link>
          <Link href="#" isDisabled>Deaktiviert</Link>
        </div>
      </Section>
      <Section title="Breadcrumbs" note="Der letzte Eintrag ist die aktuelle Seite und kein Link mehr.">
        <Breadcrumbs
          items={[
            { id: 'home', label: 'Start', href: '#' },
            { id: 'projekte', label: 'Projekte', href: '#' },
            { id: 'canopy', label: 'Canopy', href: '#' },
          ]}
        />
      </Section>
    </Page>
  ),
};
