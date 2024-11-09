export type RegistryUserType = {
  email: string | null;
  password?: string;
};

export type ErrorData = {
  error: {
    message: string;
    data: {
      errors: {
        password: string;
      };
    };
  };
};

const BASE_URL = 'https://webdev-music-003b5b991590.herokuapp.com';

export const createUser = async ({ email, password }: RegistryUserType) => {
  const response = await fetch(BASE_URL + '/user/signup/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, username: email }),
  });
  const data = await response.json();
  if (response.status === 403) {
    console.warn(response.status);
    throw new Error(data.message);
  }

  if (!response.ok) {
    console.log(data);
    if ('data' in data) {
      throw new Error(Object.values(data.data.errors).toString());
    } else {
      throw new Error(data.message.message);
    }
  }
  return data;
};

export const signinUser = async ({ email, password }: RegistryUserType) => {
  const response = await fetch(BASE_URL + '/user/login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    if ('data' in data) {
      throw new Error(Object.values(data.data.errors).toString());
    } else {
      throw new Error(data.message);
    }
  }
  return data;
};

export const getToken = async ({ email, password }: RegistryUserType) => {
  const response = await fetch(BASE_URL + '/user/token/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data);
  return data;
};

export const updateToken = async (refresh: string) => {
  const response = await fetch(BASE_URL + '/user/token/refresh/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh: refresh }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data);
  return data.access;
};
