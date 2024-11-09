'use client';

import { FormEvent, useEffect, useState } from 'react';
import styles from './entry.module.css';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  errorNull,
  getTokenThunk,
  loginUser,
} from '@/store/features/authSlice';
import Image from 'next/image';

const Form = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isEmptyField, setIsEmptyField] = useState(false);
  const router = useRouter();

  const { error, authState, status } = useAppSelector(state => state.auth);

  const handleClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !pass) {
      setIsEmptyField(true);
      return;
    }

    try {
      await dispatch(loginUser({ email: email, password: pass })).unwrap();
      await dispatch(
        getTokenThunk({
          email: email,
          password: pass,
        })
      ).unwrap();
      router.push('/trackPages');
    } catch (error) {
      if (error instanceof Error) console.warn(error);
    }
  };

  useEffect(() => {
    dispatch(errorNull());
  }, []);

  return (
    <div className={styles.container}>
      <Image
        src='/img/logo_modal.png'
        className={styles.logo}
        alt='logo'
        width={140}
        height={21}
      />
      <form onSubmit={handleClick} className={styles.entry_form}>
        <input
          className={styles.entry_input}
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
          onFocus={() => {
            setIsEmptyField(false);
            dispatch(errorNull());
          }}
          placeholder='Логин'
        />
        <input
          className={styles.entry_input}
          type='password'
          value={pass}
          onChange={e => {
            setPass(e.target.value);
          }}
          onFocus={() => {
            setIsEmptyField(false);
            dispatch(errorNull());
          }}
          placeholder='Пароль'
        />
        <div className={styles.entry_password_error_container}>
          {isEmptyField && (
            <h3 className={styles.entry_password_error}>Заполните все поля!</h3>
          )}
        </div>
        <button name='login' type='submit' className={styles.entry_button}>
          Войти
        </button>
        <button
          name='reg'
          className={styles['entry_button-registry']}
          onClick={() => router.push('/entryPages/registry')}
        >
          Зарегистрироваться
        </button>
        {status === 'rejected' && (
          <h3 className={styles.entry_password_error}>{error}</h3>
        )}
      </form>
    </div>
  );
};

const Entry = () => {
  return <Form />;
};
export default Entry;
