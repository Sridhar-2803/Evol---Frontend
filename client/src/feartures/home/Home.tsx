import Movielist from "./Movielist";
import { useFetchMoviesQuery } from "./homeApi";



export default function Home() {
  const {data, isLoading } = useFetchMoviesQuery();

  if(isLoading || !data) return <div>Loading...</div>
  return (
    <>
    
    <Movielist movie={data} />
    
    </>
  )
}