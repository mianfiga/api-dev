import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { UserResourceProvider } from "./contexts/user-resource";
import { ResourceProvider } from "./contexts/resource";
import UserList from "./components/UserList";
import UserList2 from "./components/UserList2";
import ItemList from "./components/ItemList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <UserResourceProvider>
        {count % 2 ? <UserList /> : null}
      </UserResourceProvider>
      <h2>here we are using the new thing</h2>
      <ResourceProvider>
        <h3>Users</h3>
        {count % 2 ? <UserList2 /> : null}
        <h3>Items</h3>
        {count % 2 ? <ItemList /> : null}
      </ResourceProvider>
    </>
  );
}

export default App;
