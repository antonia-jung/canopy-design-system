import type { ReactNode } from 'react';
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
  ...rest
}: DropdownProps) {
  return (
    <Select
      {...rest}
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
          <ListBox className="cp-menu__list" selectionMode="single">
            {groups.map((g, gi) => (
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
      </Popover>
    </Select>
  );
}
