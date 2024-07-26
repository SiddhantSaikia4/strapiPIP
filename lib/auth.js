import Router from 'next/router';
import Cookies from 'js-cookie';
import { fetcher } from './api';

export const setToken = (data, successCallback, fallbackCallback) => {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    Cookies.set('id', data.user.id);
    Cookies.set('username', data.user.username);
    Cookies.set('jwt', data.jwt);

    if (Cookies.get('username')) {
      Router.reload('/');
      if (successCallback) successCallback();
    }
  } catch (error) {
    console.error(error);
    if (fallbackCallback) fallbackCallback(error);
  }
};

export const unsetToken = (successCallback, fallbackCallback) => {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    Cookies.remove('id');
    Cookies.remove('jwt');
    Cookies.remove('username');

    Router.reload('/');
    if (successCallback) successCallback();
  } catch (error) {
    console.error(error);
    if (fallbackCallback) fallbackCallback(error);
  }
};

export const getUserFromLocalCookie = async (successCallback, fallbackCallback) => {
  const jwt = getTokenFromLocalCookie();
  if (jwt) {
    try {
      const data = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (successCallback) successCallback(data.username);
      return data.username;
    } catch (error) {
      console.error(error);
      if (fallbackCallback) fallbackCallback(error);
      return null;
    }
  } else {
    return null;
  }
};

export const getIdFromLocalCookie = async (successCallback, fallbackCallback) => {
  const jwt = getTokenFromLocalCookie();
  if (jwt) {
    try {
      const data = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (successCallback) successCallback(data.id);
      return data.id;
    } catch (error) {
      console.error(error);
      if (fallbackCallback) fallbackCallback(error);
      return null;
    }
  } else {
    return null;
  }
};

export const getTokenFromLocalCookie = () => {
  return Cookies.get('jwt');
};

export const getTokenFromServerCookie = (req, successCallback, fallbackCallback) => {
  try {
    if (!req.headers.cookie) {
      if (fallbackCallback) fallbackCallback(new Error('No cookie found'));
      return null;
    }
    const jwtCookie = req.headers.cookie
      .split(';')
      .find((c) => c.trim().startsWith('jwt='));
    if (!jwtCookie) {
      if (fallbackCallback) fallbackCallback(new Error('No JWT cookie found'));
      return null;
    }
    const jwt = jwtCookie.split('=')[1];
    if (successCallback) successCallback(jwt);
    return jwt;
  } catch (error) {
    console.error(error);
    if (fallbackCallback) fallbackCallback(error);
    return null;
  }
};

export const getIdFromServerCookie = (req, successCallback, fallbackCallback) => {
  try {
    if (!req.headers.cookie) {
      if (fallbackCallback) fallbackCallback(new Error('No cookie found'));
      return null;
    }
    const idCookie = req.headers.cookie
      .split(';')
      .find((c) => c.trim().startsWith('id='));
    if (!idCookie) {
      if (fallbackCallback) fallbackCallback(new Error('No ID cookie found'));
      return null;
    }
    const id = idCookie.split('=')[1];
    if (successCallback) successCallback(id);
    return id;
  } catch (error) {
    console.error(error);
    if (fallbackCallback) fallbackCallback(error);
    return null;
  }
};
