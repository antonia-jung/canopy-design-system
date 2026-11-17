import type { ReactNode } from 'react';
import { Disclosure, DisclosureGroup, DisclosurePanel, Heading, Button as AriaButton } from 'react-aria-components';
import { Icon } from '../Icon/Icon';
import './Accordion.css';

export interface AccordionItemProps {
  /** Eindeutig innerhalb einer Gruppe */
  id?: string;
  title: ReactNode;
  children: ReactNode;
  defaultExpanded?: boolean;
  isExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  disabled?: boolean;
  /** Überschriftenebene des Titels */
  headingLevel?: 2 | 3 | 4;
}

/** Aufklappbarer Abschnitt mit Titel. Enter und Leertaste öffnen und schließen. */
export function Accordion({ id, title, children, defaultExpanded, isExpanded, onExpandedChange, disabled, headingLevel = 3 }: AccordionItemProps) {
  return (
    <Disclosure id={id} className="cp-accordion" defaultExpanded={defaultExpanded} isExpanded={isExpanded} onExpandedChange={onExpandedChange} isDisabled={disabled}>
      <Heading level={headingLevel} className="cp-accordion__heading">
        <AriaButton slot="trigger" className="cp-accordion__header">
          <span className="cp-accordion__title">{title}</span>
          <Icon name="expandMore" size={24} className="cp-accordion__chevron" />
        </AriaButton>
      </Heading>
      <DisclosurePanel className="cp-accordion__panel">
        <div className="cp-accordion__content">{children}</div>
      </DisclosurePanel>
    </Disclosure>
  );
}

export interface AccordionGroupProps {
  children: ReactNode;
  /** Mehrere Abschnitte gleichzeitig offen */
  allowsMultiple?: boolean;
  defaultExpandedKeys?: Iterable<string>;
}

/** Gruppe von Abschnitten. Standardmäßig ist immer nur einer offen. */
export function AccordionGroup({ children, allowsMultiple, defaultExpandedKeys }: AccordionGroupProps) {
  return (
    <DisclosureGroup className="cp-accordiongroup" allowsMultipleExpanded={allowsMultiple} defaultExpandedKeys={defaultExpandedKeys}>
      {children}
    </DisclosureGroup>
  );
}
