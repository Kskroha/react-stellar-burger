const PATH = "https://norma.nomoreparties.space/api";

const checkResponse = (res) => res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

function getData(onSuccess, onError, onFinally) {
  fetch(`${PATH}/ingredients`)
    .then((res) => checkResponse(res))
    .then((data) => onSuccess(data))
    .catch((err) => onError())
    .finally(() => onFinally());
}

export default getData;
