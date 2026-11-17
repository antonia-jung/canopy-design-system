import { useState, type FormEvent } from 'react';
import { Input } from '../../components/Input/Input';
import { Checkbox } from '../../components/Checkbox/Checkbox';
import { Link } from '../../components/Link/Link';
import { Button } from '../../components/Button/Button';
import { Divider } from '../../components/Divider/Divider';
import { Alert } from '../../components/Alert/Alert';
import './Login.css';

export interface LoginValues { email: string; password: string; remember: boolean }

export interface LoginPatternProps {
  onSubmit?: (values: LoginValues) => void | Promise<void>;
  onGoogle?: () => void;
  /** Fehler vom Server, etwa falsche Zugangsdaten */
  error?: string;
  loading?: boolean;
}

const emailOk = (v: string) => /^\S+@\S+\.\S+$/.test(v);

/** Anmeldeformular. Fehler stehen am Feld, ein Serverfehler oben im Formular. */
export function LoginPattern({ onSubmit, onGoogle, error, loading }: LoginPatternProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [touched, setTouched] = useState(false);
  const emailError = touched && !emailOk(email) ? (email ? 'Das ist keine gültige E-Mail-Adresse.' : 'Bitte gib deine E-Mail-Adresse ein.') : undefined;
  const passwordError = touched && !password ? 'Bitte gib dein Passwort ein.' : undefined;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (emailOk(email) && password) void onSubmit?.({ email, password, remember });
  };

  return (
    <div className="cp-container cp-pattern cp-login">
      <form className="cp-login__panel" onSubmit={submit} noValidate>
        <div className="cp-login__heading">
          <h2 className="cp-login__title">Anmelden</h2>
          <p className="cp-login__description">Willkommen zurück. Melde dich mit deinem Konto an.</p>
        </div>
        {error && <Alert intent="error" title="Anmeldung fehlgeschlagen">{error}</Alert>}
        <Input label="E-Mail" type="email" autoComplete="email" value={email} onChange={setEmail} isRequired validation={emailError ? 'error' : 'none'} hint={emailError} />
        <Input label="Passwort" type="password" autoComplete="current-password" value={password} onChange={setPassword} isRequired validation={passwordError ? 'error' : 'none'} hint={passwordError} />
        <div className="cp-login__options">
          <Checkbox isSelected={remember} onChange={setRemember}>Angemeldet bleiben</Checkbox>
          <Link href="#passwort-vergessen">Passwort vergessen?</Link>
        </div>
        <Button variant="outline" type="submit" status={loading ? 'loading' : 'idle'}>Anmelden</Button>
        <Divider label="oder" />
        <Button variant="outline" onPress={onGoogle}>Mit Google fortfahren</Button>
        <p className="cp-login__footer">Noch kein Konto? <Link href="#registrieren">Registrieren</Link></p>
      </form>
    </div>
  );
}
