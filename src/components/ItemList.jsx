import { useEffect } from "react";
import { useResource } from "../contexts/resource";

export default function ItemList() {
  const [itemResource, itemApi] = useResource('items');
  useEffect( () =>{
    if (!itemResource.loaded && !itemResource.loading && !itemResource.error) {
      itemApi.get();
      console.log('GET');
    }
  }, []);
  console.log(itemResource);

  return (
    <>
      {itemResource.loaging && <strong>loading</strong>}
      {itemResource.error && <strong>Error</strong>}
      {itemResource.loaded && itemResource.data.map((data, key) => <div key={key}>{data.name}</div>)}
    </>
  );
}
