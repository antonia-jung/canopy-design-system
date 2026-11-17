import { useMemo, useState, type ReactNode } from 'react';
import {
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuSection,
  Header,
  Separator,
  type Key,
  type Selection,
} from 'react-aria-components';
import { Icon, type IconName } from '../Icon/Icon';
import './Menu.css';

export interface MenuEntry {
  id: string;
  label: string;
  icon?: IconName;
  /** Kurzbefehl rechts, rein zur Anzeige */
  shortcut?: string;
  disabled?: boolean;
  /** Zusatzzeile unter dem Label */
  description?: string;
}
export interface MenuGroup {
  /** Überschrift der Gruppe, optional. Zwischen Gruppen steht eine Trennlinie. */
  title?: string;
  items: MenuEntry[];
}

export interface MenuProps {
  /** Einträge, flach oder in Gruppen */
  groups: MenuGroup[];
  /** none = normale Aktionen, single = ein Häkchen, multiple = Checkboxen */
  selectionMode?: 'none' | 'single' | 'multiple';
  selectedKeys?: Iterable<Key>;
  defaultSelectedKeys?: Iterable<Key>;
  onSelectionChange?: (keys: Selection) => void;
  onAction?: (id: Key) => void;
  /** Suchfeld oben; filtert die Einträge */
  searchable?: boolean;
  /** Text, wenn nichts gefunden wird */
  emptyText?: string;
  /** Höhe, ab der die Liste scrollt */
  maxHeight?: number;
  /** Fokus beim Öffnen auf die Liste setzen, sinnvoll im Popover */
  autoFocus?: boolean;
  'aria-label': string;
}

/** Inhalt eines Menü-Eintrags: Häkchen oder Checkbox, Icon, Label, Kurzbefehl. Wird auch vom Dropdown benutzt. */
export function MenuItemContent({
  entry,
  mode,
  selected,
}: {
  entry: MenuEntry;
  mode: 'none' | 'single' | 'multiple';
  selected: boolean;
}): ReactNode {
  return (
    <>
      {mode === 'multiple' && (
        <span className="cp-menu__box" aria-hidden="true" data-checked={selected || undefined}>
          {selected && <Icon name="check" size={14} />}
        </span>
      )}
      {entry.icon && <Icon name={entry.icon} size={20} />}
      <span className="cp-menu__text">
        <span className="cp-menu__label">{entry.label}</span>
        {entry.description && <span className="cp-menu__desc">{entry.description}</span>}
      </span>
      {entry.shortcut && <kbd className="cp-menu__shortcut">{entry.shortcut}</kbd>}
      {mode === 'single' && (
        <span className="cp-menu__tick" aria-hidden="true">
          {selected && <Icon name="check" size={20} />}
        </span>
      )}
    </>
  );
}

/** Auswahlmenü mit Gruppen, Icons, Häkchen oder Checkboxen und optionaler Suche. Tastatur: Pfeile, Pos1/Ende, Tippen springt zum Eintrag. */
export function Menu({
  groups,
  selectionMode = 'none',
  selectedKeys,
  defaultSelectedKeys,
  onSelectionChange,
  onAction,
  searchable,
  emptyText = 'Nichts gefunden',
  maxHeight,
  autoFocus = false,
  'aria-label': ariaLabel,
}: MenuProps) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((g) => ({ ...g, items: g.items.filter((i) => i.label.toLowerCase().includes(q)) }))
      .filter((g) => g.items.length > 0);
  }, [groups, query]);

  return (
    <div className="cp-menu" style={maxHeight ? { maxHeight } : undefined}>
      {searchable && (
        <div className="cp-menu__search">
          <Icon name="search" size={20} />
          <input
            type="text"
            aria-label="Einträge filtern"
            placeholder="Suchen"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                (e.currentTarget.closest('.cp-menu')?.querySelector('[role^="menuitem"]:not([aria-disabled])') as HTMLElement | null)?.focus();
              }
            }}
          />
        </div>
      )}
      {filtered.length === 0 ? (
        <p className="cp-menu__empty" role="status">{emptyText}</p>
      ) : (
        <AriaMenu
          aria-label={ariaLabel}
          className="cp-menu__list"
          selectionMode={selectionMode}
          selectedKeys={selectedKeys}
          defaultSelectedKeys={defaultSelectedKeys}
          onSelectionChange={onSelectionChange}
          onAction={onAction}
          autoFocus={autoFocus && !searchable}
        >
          {filtered.map((g, gi) => (
            <MenuSection key={g.title ?? gi} className="cp-menu__section">
              {gi > 0 && <Separator className="cp-menu__sep" />}
              {g.title && <Header className="cp-menu__header">{g.title}</Header>}
              {g.items.map((it) => (
                <AriaMenuItem
                  key={it.id}
                  id={it.id}
                  textValue={it.label}
                  isDisabled={it.disabled}
                  className="cp-menu__item"
                >
                  {({ isSelected }) => <MenuItemContent entry={it} mode={selectionMode} selected={isSelected} />}
                </AriaMenuItem>
              ))}
            </MenuSection>
          ))}
        </AriaMenu>
      )}
    </div>
  );
}
