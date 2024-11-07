import { useQuery } from '@tanstack/react-query';

export default function UserListRQ() {
  const { isPending, error, data } = useQuery({
    queryKey: ['userData'],
    queryFn: async () => {
      const response = await fetch(
        './api/users.json',
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
