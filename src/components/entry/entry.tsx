'use client';

import { FormEvent, useEffect, useState } from 'react';
import styles from './entry.module.css';
import Link from 'next/link';
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
  const navigate = useRouter();

  const { error, authState, status } = useAppSelector(state => state.auth);

  const handleClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !pass) {
      setIsEmptyField(true);
      return;
    }

    try {
      await dispatch(loginUser({ email: email, password: pass }));
      await dispatch(
        getTokenThunk({
          email: email,
          password: pass,
        })
      );
    } catch (error) {
      if (error instanceof Error) console.log(error);
    }
  };

  useEffect(() => {
    dispatch(errorNull());
  }, []);

  useEffect(() => {
    console.log('authState', authState);
    authState && navigate.push('/trackPages/base');
  }, [authState]);

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
        <button name='login' type='submit' className={styles.entry_button}>
          Войти
        </button>
        <Link href={'/entryPages/registry'}>
          <button
            name='reg'
            className={styles['entry_button-registry']}
            style={{ marginTop: '20px' }}
          >
            Зарегистрироваться
          </button>
        </Link>
        {isEmptyField && (
          <h3 className={styles.entry_password_error}>Заполните все поля!</h3>
        )}
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
