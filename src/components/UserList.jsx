import { useEffect } from "react";
import { useUserResource } from "../contexts/user-resource";

export default function UserList() {
  const [userResource, userApi] = useUserResource();
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
