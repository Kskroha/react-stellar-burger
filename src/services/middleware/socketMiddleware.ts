import { Middleware, MiddlewareAPI } from "redux";
import { TWSActions } from "../../types/types";

export const socketMiddleware = (wsUrl: string, wsActions: TWSActions, isAuth: boolean ): Middleware => {
	return (store: MiddlewareAPI) => {
		let socket: WebSocket | null = null;

		return next => action => {
			const { dispatch } = store;
			const { type } = action;
			const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
			const accessToken = localStorage.getItem("accessToken")?.replace("Bearer ", "");

			if (type === wsInit) {
				if (!isAuth) {
					socket = new WebSocket(wsUrl);
				} else {
					socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
				}
			}

			if (socket) {
				if (type === onClose && socket.readyState === 1) {
          socket.close();
        }

				socket.onopen = event => {
					dispatch({ type: onOpen, payload: event });
				};

				socket.onerror = event => {
					dispatch({ type: onError, payload: event });
				};

				socket.onmessage = (event: MessageEvent) => {
					const { data } = event;
					const parsedData = JSON.parse(data);
					const { success, ...restParsedData } = parsedData;

					dispatch({ type: onMessage, payload: restParsedData });
				};

				socket.onclose = event => {
					dispatch({ type: onClose, payload: event });
				};
			}

			next(action);
		};
	};
};
