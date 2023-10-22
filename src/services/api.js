const PATH = "https://norma.nomoreparties.space/api";

export const checkResponse = (res) =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

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

function request(url, options) {
  const baseUrl = PATH;
  return fetch(`${baseUrl}/${url}`, options).then(checkResponse)
};

export async function getIngredientsRequest() {
  return await request("ingredients");
}

export async function sendOrderRequest(items) {
  return await request("orders", {
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
  return await request("auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(userData),
  });
}

export const refreshToken = () => {
  return request("auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
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
  return await request("auth/user", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "authorization": localStorage.getItem("accessToken")
    },
    body: JSON.stringify(userData),
  });
};

export const logout = async () => {
  return await request("auth/logout", {
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
  return await request("auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(userData),
  });
};

export const requestChange = async (userEmail) => {
  return await request("password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(userEmail),
  });
};

export const reset = async (userData) => {
  return await request("password-reset/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(userData),
  });
};
