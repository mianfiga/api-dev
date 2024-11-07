import { useEffect } from "react";
import { useResource } from "../contexts/resource";

export default function UserList() {
  const [userResource, userApi] = useResource('users');
  useEffect( () =>{
    if (!userResource.loaded && !userResource.loading && !userResource.error) {
      userApi.get();
      console.log('GET');
    }
  }, []);
  console.log(userResource);

  return (
    <>
      {userResource.loaging && <strong>loading</strong>}
      {userResource.error && <strong>Error</strong>}
      {userResource.loaded && userResource.data.map((data, key) => <div key={key}>{data.name}</div>)}
    </>
  );
}
