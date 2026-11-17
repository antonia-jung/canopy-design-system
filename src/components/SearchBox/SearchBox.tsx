import { SearchField, Input as AriaInput, Button as AriaButton, type SearchFieldProps } from 'react-aria-components';
import { Icon } from '../Icon/Icon';
import { Kbd } from '../Kbd/Kbd';
import '../Field/Field.css';
import './SearchBox.css';

export interface SearchBoxProps extends Omit<SearchFieldProps, 'className' | 'style' | 'children'> {
  /** Platzhalter, auch Name für Screenreader, wenn kein aria-label gesetzt ist */
  placeholder?: string;
  /** Tastenkürzel, das rechts angezeigt wird, etwa ['⌘', 'K'] */
  shortcut?: string[];
  'aria-label'?: string;
}

/** Suchfeld mit Lupe, Löschen-Button und optionalem Tastenkürzel. Escape leert das Feld, Enter löst onSubmit aus. */
export function SearchBox({ placeholder = 'Suchen', shortcut, 'aria-label': ariaLabel, ...rest }: SearchBoxProps) {
  return (
    <SearchField {...rest} type="text" aria-label={ariaLabel ?? placeholder} className="cp-searchbox">
      <div className="cp-fieldbox">
        <Icon name="search" />
        <AriaInput className="cp-fieldbox__input" placeholder={placeholder} role="searchbox" />
        <AriaButton className="cp-searchbox__clear" aria-label="Eingabe löschen">
          <Icon name="close" />
        </AriaButton>
        {shortcut && shortcut.length > 0 && (
          <span className="cp-searchbox__shortcut" aria-hidden="true">
            {shortcut.map((k) => (
              <Kbd key={k} size="S">{k}</Kbd>
            ))}
          </span>
        )}
      </div>
    </SearchField>
  );
}
