import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  let page = 1;

  useEffect(() => {
    fetchApiData();
  }, []);

  async function fetchApiData() {
    const { data } = await axios.get(
      `https://api.thecatapi.com/v1/images/search?limit=10&page=${page}&order=Desc`
    );
    setImages((prev) => [...prev, ...data.map(({ url }) => url)]);
  }

  function imageClick(idx) {
    setPhotoIndex(idx);
    setIsOpen((prev) => !prev);
  }
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key == "ArrowRight" && isOpen) {
      let btn = document.getElementsByClassName("carousel-control-next")[0];
      btn.click();
    } else if (e.key == "ArrowLeft" && isOpen) {
      let btn = document.getElementsByClassName("carousel-control-prev")[0];
      btn.click();
    }
  });
  return (
    <>
      {isOpen && (
        <>
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              {images.map((e, i) => {
                return (
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to={i}
                    className={`${i === photoIndex ? "active" : ""}`}
                  />
                );
              })}
            </ol>
            <div className="carousel-inner">
              {images.map((e, i) => {
                return (
                  <div
                    className={`carousel-item ${
                      i === photoIndex ? "active" : ""
                    }`}
                  >
                    <img className="d-block w-100" src={e} alt={`${i} slide`} />
                  </div>
                );
              })}
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
          <div className="closeButton">
            <button onClick={() => setIsOpen((prev) => !prev)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </>
      )}
      {!isOpen && (
        <InfiniteScroll
          dataLength={images.length}
          next={() => {
            page++;
            fetchApiData();
          }}
          hasMore={true}
          loader={<div className="loader"></div>}
        >
          <div className="flex-container">
            {images.map((e, i) => {
              return (
                <div className="card-box" key={i} onClick={() => imageClick(i)}>
                  <img className="card-img-top img-fluid" src={e} />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      )}
    </>
  );
}

export default App;
