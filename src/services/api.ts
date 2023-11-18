import { TIngredient, TInputValue } from "../types/types";

const PATH = "https://norma.nomoreparties.space/api";

export const checkResponse = (res: Response) =>
  res.ok
    ? res.json()
    : res.json().then((err: { errorMessage: string }) => Promise.reject(err));

const fetchWithRefresh = async (url: string, options: RequestInit) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      const requestHeaders = new Headers(options.headers);
      requestHeaders.set("Authorization", refreshData.accessToken);
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

async function request(url: string, options?: RequestInit) {
  const baseUrl = PATH;
  const res = await fetch(`${baseUrl}/${url}`, options);
  return checkResponse(res);
}

export async function getOrderRequest(orderNumber: string) {
  return await request(`orders/${orderNumber}`);
}

export async function getIngredientsRequest() {
  return await request("ingredients");
}

export async function sendOrderRequest(items: TIngredient[]) {
  return await request("orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Authorization": localStorage.getItem("accessToken")!,
    },
    body: JSON.stringify({
      ingredients: items.map((item) => item._id),
    }),
  });
}

export async function register(userData: TInputValue) {
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

export const getUserData = (): Promise<void> => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  requestHeaders.set("Authorization", localStorage.getItem("accessToken")!);
  return fetchWithRefresh(`${PATH}/auth/user`, {
    method: "GET",
    headers: requestHeaders,
  });
};

export const update = async (userData: TInputValue) => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  requestHeaders.set("Authorization", localStorage.getItem("accessToken")!);
  return await request("auth/user", {
    method: "PATCH",
    headers: requestHeaders,
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

export const login = async (userData: TInputValue) => {
  return await request("auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(userData),
  });
};

export const requestChange = async (userData: TInputValue) => {
  return await request("password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(userData),
  });
};

export const reset = async (userData: TInputValue) => {
  return await request("password-reset/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(userData),
  });
};
