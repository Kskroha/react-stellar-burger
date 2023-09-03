const PATH = "https://norma.nomoreparties.space/api";

export const checkResponse = (res) =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export async function getIngredientsRequest() {
  return await fetch(`${PATH}/ingredients`);
}

export async function sendOrderRequest(items) {
  return await fetch(`${PATH}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      ingredients: items.map((item) => item._id),
    }),
  });
}

export async function register(userData) {
  return await fetch(`${PATH}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(userData),
  });
}

export const refreshToken = () => {
  return fetch(`${PATH}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};

const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getUserData = () => {
  return fetchWithRefresh(`${PATH}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "authorization": localStorage.getItem("accessToken")
    }
  });
};

export const update = async (userData) => {
  return await fetch(`${PATH}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "authorization": localStorage.getItem("accessToken")
    },
    body: JSON.stringify(userData),
  });
};

export const logout = async () => {
  return await fetch(`${PATH}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

export const login = async (userData) => {
  return await fetch(`${PATH}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(userData),
  });
};

export const requestChange = async (userEmail) => {
  return await fetch(`${PATH}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(userEmail),
  });
};

export const reset = async (userData) => {
  return await fetch(`${PATH}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(userData),
  });
};
