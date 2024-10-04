'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from '@/components/entry/entry.module.css';
import stylesPage from '../../page.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { errorNull, registryNewUser } from '@/store/features/authSlice';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type EntryType = {
  email: string;
  pass: string;
  rePass: string;
  matchPasswords: boolean;
  isEmptyField: boolean;
};

const Form = () => {
  const [entry, setEntry] = useState<EntryType>({
    email: '',
    pass: '',
    rePass: '',
    matchPasswords: true,
    isEmptyField: false,
  });
  const { email, pass, rePass, matchPasswords, isEmptyField } = entry;

  const { status, error } = useAppSelector(state => state.auth);

  const navigate = useRouter();

  const dispatch = useAppDispatch();

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEntry({
      ...entry,
      [e.target.name]: e.target.value,
      matchPasswords: true,
      isEmptyField: false,
    });
  };

  const regUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !pass || !rePass) {
      setEntry({ ...entry, isEmptyField: true });
      return;
    }

    try {
      if (pass === rePass) {
        await dispatch(
          registryNewUser({
            email: email,
            password: pass,
          })
        );
        navigate.push('/entryPages/login');
      } else {
        setEntry({ ...entry, matchPasswords: false });
        throw new Error('Пароли не совпадают');
      }
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
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
      <form onSubmit={regUser} className={styles.entry_form}>
        <input
          className={styles.entry_input}
          type='text'
          name='email'
          onChange={inputChange}
          onFocus={() => {
            setEntry({ ...entry, isEmptyField: false });
            dispatch(errorNull());
          }}
          placeholder='Логин'
        />
        <input
          className={styles.entry_input}
          type='password'
          name='pass'
          onChange={inputChange}
          onFocus={() => {
            setEntry({ ...entry, isEmptyField: false });
            dispatch(errorNull());
          }}
          placeholder='Пароль'
        />
        <input
          className={styles.entry_input}
          type='password'
          name='rePass'
          onChange={inputChange}
          onFocus={() => {
            setEntry({ ...entry, isEmptyField: false });
            dispatch(errorNull());
          }}
          placeholder='Повторить пароль'
        />
        <div className={styles.entry_password_error_container}>
          {isEmptyField && (
            <h3 className={styles.entry_password_error}>Заполните все поля!</h3>
          )}
          {!matchPasswords && (
            <h3 className={styles.entry_password_error}>Пароли не совпадают</h3>
          )}
        </div>
        <button name='reg' className={styles.entry_button} type='submit'>
          Зарегистрироваться
        </button>
        {status === 'rejected' && (
          <h3 className={styles.entry_password_error}>{error}</h3>
        )}
      </form>
    </div>
  );
};

const Registry = () => {
  return (
    <div className={stylesPage.wrapper}>
      <div className={stylesPage.container}>
        <main className={stylesPage.main}>
          <Form />
        </main>
      </div>
    </div>
  );
};
export default Registry;
