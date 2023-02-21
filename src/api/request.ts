const BASE_URL = './api/products';

const wait = (delay: number) => new Promise(resolve => {
  setTimeout(resolve, delay);
});

export const request = async (url: string) => {
  return wait(500)
    .then(() => fetch(BASE_URL + url))
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};
