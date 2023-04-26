import "./styles.css";
import React, { useState, useEffect } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    let res = await fetch("https://dummyjson.com/products?limit=100");
    let data = await res.json();
    console.log(data.products);
    setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectedPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      page !== selectedPage
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <div className="App">
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((item, inx) => {
            return (
              <span className="single__products" key={inx}>
                <img src={item.thumbnail} alt={item.title} />
                <span>{item.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {
        <div className="pagination">
          <span
            onClick={() => selectedPageHandler(page - 1)}
            className={page > 1 ? " " : "pagination__disable"}
          >
            ◀
          </span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                onClick={() => selectedPageHandler(i + 1)}
                key={i}
                className={page === i + 1 ? "pagination__selected" : ""}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            onClick={() => selectedPageHandler(page - 1)}
            className={
              page < products.length / 10 ? " " : "pagination__disable"
            }
          >
            ▶
          </span>
        </div>
      }
    </div>
  );
}
