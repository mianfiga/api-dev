import * as React from "react";

const UserResourceContext = React.createContext();

function userResourceReducer(state, action) {
  switch (action.type) {
    case "USER_FETCH_STARTED":
      return {
        ...state,
        loading: true,
      };
    case "USER_FETCH_SUCCEEDED":
      return {
        ...state,
        loaded: true,
        loading: false,
        data: action.payload.data,
      };
    case "USER_FETCH_FAILED":
      return {
        ...state,
        loaded: false,
        loading: false,
        error: action.payload.error,
      };
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
}

function UserResourceProvider(props) {
  const [userResource, dispatchUserResource] = React.useReducer(
    userResourceReducer,
    {
      data: [],
      loading: false,
      loaded: false,
      error: false,
      // params: ,
      // pagination: ,
      // pending: ,
    }
  );
  return (
    <UserResourceContext.Provider
      value={[userResource, dispatchUserResource]}
      {...props}
    />
  );
}

function useUserResource() {
  const context = React.useContext(UserResourceContext);
  if (!context) {
    throw new Error(`useUserResource must be used within a UserResourceProvider`);
  }

  const [state, dispatch] = context;

  const get = () => {
    fetch("./api/users.json")
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: "USER_FETCH_SUCCEEDED",
          payload: {
            data: data,
          },
        })
      )
      .catch((error) =>
        dispatch({
          type: "USER_FETCH_FAILED",
          payload: {
            error,
          },
        })
      );

    dispatch({ type: "USER_FETCH_STARTED" });
  };
  return [state, {get}];
}

export { UserResourceProvider, useUserResource };
