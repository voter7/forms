import { useState, useRef, useEffect } from 'react'
import styles from './app.module.css'

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [repeatPasswordError, setRepeatPasswordError] = useState(null);

  const buttonRef = useRef(null); // реф на кнопку


  const handleChange = (setter, validator, compareValue) => ({ target }) => {
    const value = target.value;
    setter(value);

    // Валидация текущего поля
    if (target.name === 'email') {
      setEmailError(validator ? validator(value) : null);
    } else if (target.name === 'password') {
      setPasswordError(validator ? validator(value) : null);
      if (repeatPassword !== '') {
        setRepeatPasswordError(
          value !== repeatPassword ? 'Пароли не совпадают' : null
        );
      }
    } else if (target.name === 'repeatPassword') {
      setRepeatPasswordError(
        compareValue !== undefined && compareValue !== null ? value !== compareValue ? 'Пароли не совпадают' : null : null
      );
    }
  };

  const validateEmail = (value) => {
    if (!value) return 'Email обязателен';
    if (!/@/.test(value)) return 'Некорректный email';
    return null;
  };

  const validatePassword = (value) => {
    if (!value) return 'Пароль обязателен';
    if (value.length < 6) return 'Пароль должен быть не менее 6 символов';
    return null;
  };

  const validateRepeatPassword = (value) => {
    if (value !== password) return 'Пароли не совпадают';
    return null;
  };

  const isFormValid = () => {
    return (
      email &&
      password &&
      repeatPassword &&
      !emailError &&
      !passwordError &&
      !repeatPasswordError
    );
  };

  // Автофокус при валидной форме
  useEffect(() => {
    if (isFormValid() && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [email, password, repeatPassword, emailError, passwordError, repeatPasswordError]);

  // Обработка отправки формы
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Данные формы:', {
      email,
      password,
      repeatPassword,
    });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} noValidate onSubmit={handleSubmit}>
        {/* Поле email */}
        <input
          className={styles.input}
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChange(setEmail, validateEmail)}
        />
        {emailError && <div className={styles.error}>{emailError}</div>}

        {/* Поле пароль */}
        <input
          className={styles.input}
          name="password"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={handleChange(setPassword, validatePassword)}
        />
        {passwordError && <div className={styles.error}>{passwordError}</div>}

        {/* Повтор пароля */}
        <input
          className={styles.input}
          name="repeatPassword"
          type="password"
          placeholder="Повтор пароля"
          value={repeatPassword}
          onChange={handleChange(setRepeatPassword, validateRepeatPassword, password)}
        />
        {repeatPasswordError && (
          <div className={styles.error}>{repeatPasswordError}</div>
        )}

        {/* Кнопка зарегистрироваться */}
        <button
          className={styles.button}
          ref={buttonRef}
          type="submit"
          disabled={!isFormValid()}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default App;
