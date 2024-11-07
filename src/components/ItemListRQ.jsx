import { useQuery } from '@tanstack/react-query';

export default function ItemListRQ() {
  const { isPending, error, data } = useQuery({
    queryKey: ['itemData'],
    queryFn: async () => {
      const response = await fetch(
        './api/items.json',
      )
      return await response.json()
    },
  })

  return (
    <>
      {isPending && <strong>loading</strong>}
      {error && <strong>Error</strong>}
      {data && data.map((data, key) => <div key={key}>{data.name}</div>)}
    </>
  );
}
