import { LOG_DATA, LOG_IN, SHOW_LOADER } from "./actions";

const initialState = {
  isLoggedIn: false,
  isLoggedData: {},
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case LOG_IN: {
      return {
        ...state,
        isLoggedIn: payload,
      };
    }
    case LOG_DATA: {
      return {
        ...state,
        isLoggedData: payload,
      };
    }
    case SHOW_LOADER: {
      return {
        ...state,
        showLoader: payload,
      };
    }
    default:
      throw new Error();
  }
};

export { reducer, initialState };
