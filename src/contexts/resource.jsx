import * as React from "react";

const ResourceContext = React.createContext();

function resourceReducer(state, action) {
  console.log(action.type, action);
  switch (action.type) {
    case "USING_RESOURCE":
      return {
        [action.resource]: {
          data: [],
          loading: false,
          loaded: false,
          error: false,
          // params: ,
          // pagination: ,
          // pending: ,
        },
        ...state,
      };

    case "FETCH_STARTED":
      return {
        ...state,
        [action.resource]: {
          ...state[action.resource],
          loading: true,
        },
      };
    case "FETCH_SUCCEEDED":
      return {
        ...state,
        [action.resource]: {
          ...state[action.resource],
          loaded: true,
          loading: false,
          data: action.payload.data,
        },
      };
    case "FETCH_FAILED":
      return {
        ...state,
        [action.resource]: {
          ...state[action.resource],
          loaded: false,
          loading: false,
          error: action.payload.error,
        },
      };
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
}

function ResourceProvider(props) {
  const [resource, dispatchResource] = React.useReducer(resourceReducer, {});
  return (
    <ResourceContext.Provider value={[resource, dispatchResource]} {...props} />
  );
}

const useResource = (resource) => {
  const context = React.useContext(ResourceContext);
  if (!context) {
    throw new Error(`useResource must be used within a Provider`);
  }

  const [state, dispatch] = context;

  const get = () => {
    fetch(`./api/${resource}.json`) //this should feed from a routes object somewhere
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: "FETCH_SUCCEEDED",
          resource,
          payload: {
            data: data,
          },
        })
      )
      .catch((error) =>
        dispatch({
          type: "FETCH_FAILED",
          resource,
          payload: {
            error,
          },
        })
      );

    dispatch({ type: "FETCH_STARTED", resource });
  };

  if (!state[resource]) {
    dispatch({ type: "USING_RESOURCE", resource }); // TODO: This raises an error, OK let's keep it so far
  }

  return [
    state[resource] || {
      data: [],
      loading: false,
      loaded: false,
      error: false,
    },
    { get },
  ];
};

export { ResourceProvider, useResource };
