import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchApiData();
  }, []);
  async function fetchApiData() {
    const { data: meals } = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/search.php?f=a"
    );
    setData(meals.meals);
  }
  return (
    <div className="container">
      {data.map((e) => {
        const { idMeal, strMealThumb, strMeal, strYoutube, strInstructions } =
          e;
        return (
          <div className="card" style={{ width: "18rem" }} key={idMeal}>
            <img
              className="card-img-top"
              src={strMealThumb}
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">{strMeal}</h5>
              <p className="card-text">{strInstructions.slice(0, 100).concat("...")}</p>
              <div className="button_ref">
                <a href={strYoutube} className="btn btn-primary">
                  Youtube
                </a>
                <a href={strYoutube} className="btn btn-primary">
                  Know more
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
