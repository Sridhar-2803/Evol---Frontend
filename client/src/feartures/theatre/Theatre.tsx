import { useFetchTheatresQuery } from "../home/homeApi";
import TheatreList from "./TheatreList";




export default function Theatre() {

const {data, isLoading} = useFetchTheatresQuery();

if (!data || isLoading) return <div>Loading...</div>

  return (
    <>
    <TheatreList theatre={data} />
    </>
  )
}