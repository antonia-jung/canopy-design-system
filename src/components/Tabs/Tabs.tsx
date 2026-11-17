import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Tabs as AriaTabs, TabList, Tab, TabPanel, type Key } from 'react-aria-components';
import { Icon, type IconName } from '../Icon/Icon';
import { useBlob } from '../../motion/useBlob';
import './Tabs.css';

export interface TabDef {
  id: string;
  label: string;
  icon?: IconName;
  disabled?: boolean;
  content?: ReactNode;
}
export interface TabsProps {
  tabs: TabDef[];
  selectedKey?: Key;
  defaultSelectedKey?: Key;
  onSelectionChange?: (key: Key) => void;
  'aria-label': string;
}

/** Gleichrangige Ansichten. Pfeiltasten wechseln den Tab, die Unterstreichung wandert als Blob. */
export function Tabs({ tabs, selectedKey, defaultSelectedKey, onSelectionChange, 'aria-label': ariaLabel }: TabsProps) {
  const [inner, setInner] = useState<Key>(defaultSelectedKey ?? tabs.find((t) => !t.disabled)?.id ?? tabs[0].id);
  const current = selectedKey ?? inner;
  const list = useRef<HTMLDivElement>(null);
  const blob = useRef<HTMLSpanElement>(null);
  // React Aria baut die Tab-Liste erst nach dem ersten Rendern auf, der Blob setzt sich dann ohne Bewegung an seinen Platz
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  useBlob(blob, list, () => list.current?.querySelector<HTMLElement>('[data-selected] .cp-tabs__anchor') ?? null, `${current}-${ready}`, { axis: 'x', teleport: !ready });
  return (
    <AriaTabs
      selectedKey={current}
      onSelectionChange={(k) => {
        setInner(k);
        onSelectionChange?.(k);
      }}
      className="cp-tabs"
    >
      <div className="cp-tabs__listwrap" ref={list}>
        <span ref={blob} className="cp-blob cp-tabs__blob" aria-hidden="true" style={{ top: 0, left: 0 }} />
        <TabList aria-label={ariaLabel} className="cp-tabs__list">
        {tabs.map((t) => (
          <Tab key={t.id} id={t.id} isDisabled={t.disabled} className="cp-tabs__tab">
            {t.icon && <Icon name={t.icon} size={20} />}
            <span>{t.label}</span>
            <span className="cp-tabs__anchor" aria-hidden="true" />
          </Tab>
        ))}
        </TabList>
      </div>
      {tabs.map((t) => (
        <TabPanel key={t.id} id={t.id} className="cp-tabs__panel">
          {t.content}
        </TabPanel>
      ))}
    </AriaTabs>
  );
}
