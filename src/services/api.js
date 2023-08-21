const PATH = "https://norma.nomoreparties.space/api";

export const checkResponse = (res) => res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export async function getIngredientsRequest() {
  return await fetch(`${PATH}/ingredients`);;
};

export async function sendOrderRequest(items) {
  return await fetch(`${PATH}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      ingredients: items.map((item) => item._id)
    })
  });
};

