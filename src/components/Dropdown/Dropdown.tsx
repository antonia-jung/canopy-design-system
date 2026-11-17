import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  Select,
  SelectValue,
  Button as AriaButton,
  Popover,
  ListBox,
  ListBoxItem,
  ListBoxSection,
  Header,
  Text,
  type Key,
} from 'react-aria-components';
import { Label } from '../Label/Label';
import { Icon, type IconName } from '../Icon/Icon';
import { MenuItemContent, type MenuGroup } from '../Menu/Menu';
import type { FieldValidation } from '../Field/Field';
import '../Field/Field.css';
import '../Input/Input.css';
import '../Menu/Menu.css';
import './Dropdown.css';

export interface DropdownProps {
  label: ReactNode;
  help?: string;
  groups: MenuGroup[];
  placeholder?: string;
  hint?: ReactNode;
  validation?: FieldValidation;
  size?: 'S' | 'M' | 'L';
  iconLeft?: IconName;
  isRequired?: boolean;
  isDisabled?: boolean;
  /** Suchfeld oben im Menü; filtert die Einträge, Enter wählt den ersten Treffer */
  searchable?: boolean;
  emptyText?: string;
  selectedKey?: Key | null;
  defaultSelectedKey?: Key;
  onSelectionChange?: (key: Key | null) => void;
}

/** Auswahlfeld: sieht aus wie ein Input, öffnet ein Menü. Pfeiltasten und Tippen wählen, Enter bestätigt, Esc schließt. */
export function Dropdown({
  label,
  help,
  groups,
  placeholder = 'Bitte wählen',
  hint,
  validation = 'none',
  size = 'M',
  iconLeft,
  isRequired,
  isDisabled,
  searchable,
  emptyText = 'Nichts gefunden',
  selectedKey,
  defaultSelectedKey,
  onSelectionChange,
  ...rest
}: DropdownProps) {
  const [inner, setInner] = useState<Key | null>(defaultSelectedKey ?? null);
  const current = selectedKey !== undefined ? selectedKey : inner;
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  // React Aria fokussiert beim Öffnen die Liste; bei Suche soll der Fokus ins Suchfeld
  useEffect(() => {
    if (!open || !searchable) return;
    const t = window.setTimeout(() => searchRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [open, searchable]);
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((g) => ({ ...g, items: g.items.filter((i) => i.label.toLowerCase().includes(q)) }))
      .filter((g) => g.items.length > 0);
  }, [groups, query]);
  const pick = (k: Key | null) => {
    setInner(k);
    onSelectionChange?.(k);
  };
  return (
    <Select
      {...rest}
      selectedKey={current}
      onSelectionChange={pick}
      isOpen={open}
      onOpenChange={(o) => { setOpen(o); if (!o) setQuery(''); }}
      placeholder={placeholder}
      isRequired={isRequired}
      isDisabled={isDisabled}
      isInvalid={validation === 'error'}
      className="cp-dropdown"
      data-validation={validation === 'none' ? undefined : validation}
    >
      <Label required={isRequired} help={help}>{label}</Label>
      <AriaButton className="cp-fieldbox cp-dropdown__trigger" data-size={size} data-validation={validation === 'none' ? undefined : validation}>
        {iconLeft && <Icon name={iconLeft} />}
        <SelectValue className="cp-dropdown__value">{({ selectedText }) => selectedText || placeholder}</SelectValue>
        <Icon name="chevronRight" size={16} className="cp-dropdown__chevron" />
      </AriaButton>
      {hint && (
        <Text slot={validation === 'error' ? 'errorMessage' : 'description'} className="cp-hint">{hint}</Text>
      )}
      <Popover className="cp-dropdown__popover" offset={8}>
        <div className="cp-menu">
          {searchable && (
            <div className="cp-menu__search">
              <Icon name="search" size={20} />
              <input
                type="text"
                aria-label="Einträge filtern"
                placeholder="Suchen"
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    (listRef.current?.querySelector('[role="option"]:not([aria-disabled])') as HTMLElement | null)?.focus();
                  } else if (e.key === 'Enter') {
                    e.preventDefault();
                    const first = shown.flatMap((g) => g.items).find((i) => !i.disabled);
                    if (first) {
                      pick(first.id);
                      setOpen(false);
                    }
                  } else if (e.key !== 'Escape') {
                    e.stopPropagation();
                  }
                }}
              />
            </div>
          )}
          {shown.length === 0 && <p className="cp-menu__empty" role="status">{emptyText}</p>}
          <div ref={listRef} style={{ display: 'contents' }}>
          <ListBox className="cp-menu__list" selectionMode="single" aria-label="Optionen">
            {shown.map((g, gi) => (
              <ListBoxSection key={g.title ?? gi} className="cp-menu__section">
                {g.title && <Header className="cp-menu__header">{g.title}</Header>}
                {g.items.map((it) => (
                  <ListBoxItem key={it.id} id={it.id} textValue={it.label} isDisabled={it.disabled} className="cp-menu__item">
                    {({ isSelected }) => <MenuItemContent entry={it} mode="single" selected={isSelected} />}
                  </ListBoxItem>
                ))}
              </ListBoxSection>
            ))}
          </ListBox>
          </div>
        </div>
      </Popover>
    </Select>
  );
}
