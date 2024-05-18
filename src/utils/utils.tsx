import AsyncStorage from '@react-native-async-storage/async-storage';

export const BASE_URL = 'https://apis.winnersinstitute.in';

export const apiPost = (url: string, data: any) => {
  return new Promise((resolve, reject) => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let payload = JSON.stringify({
      ...data,
    });
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: payload,
      redirect: 'follow',
    };
    fetch(BASE_URL + url, requestOptions)
      .then(response => response.json())
      .then(result => resolve(result))
      .catch(error => reject(error));
  });
};

export const apiGet = (url: string) => {
  return new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    fetch(BASE_URL + url, requestOptions)
      .then(response => response.json())
      .then(result => resolve(result))
      .catch(error => reject(error));
  });
};

export const apiPut = (url: string, data: any) => {
  return new Promise((resolve, reject) => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let payload = JSON.stringify({
      ...data,
    });
    let requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: payload,
      redirect: 'follow',
    };
    fetch(BASE_URL + url, requestOptions)
      .then(response => response.json())
      .then(result => resolve(result))
      .catch(error => reject(error));
  });
};

// Local Storage

export function setItem(key, data) {
  data = JSON.stringify(data);
  return AsyncStorage.setItem(key, data);
}

export function getItem(key) {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key)
      .then(data => {
        resolve(JSON.parse(data));
      })
      .then(err => reject(err));
  });
}

export function removeItem(key) {
  return AsyncStorage.removeItem(key);
}

export function clearAsyncStorage() {
  return AsyncStorage.clear();
}
