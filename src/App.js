import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchApiData();
  }, []);

  async function fetchApiData() {
    const { data } = await axios.get(
      `https://api.unsplash.com/photos/random/?client_id=MLy999IiOMk3f-7cwyilY5ncw_VsSf3FtwiZz-mSH9U`
    );
    console.log(page * 10, data.length, data);
    // if(page * 10 > data.length)
    setData((prev) => [...prev, ...data.map(({ urls: { raw } }) => raw)]);
  }

  return (
    <div className="container">
      <InfiniteScroll
        dataLength={data.length}
        next={() =>
          setPage((prev) => {
            fetchApiData(prev + 1);
            return prev + 1;
          })
        }
        hasMore={true}
        loader={<div className="loader"></div>}
      >
        {data.map((e, i) => {
          return (
            <div className="card" style={{ width: "18rem" }} key={i}>
              <img className="card-img-top" src={e} alt="Card image cap" />
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
}

export default App;
