import React from "react";
import "./publish.scss";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header.js";

const Publish = () => {
  return (
    <>
      <Header />
      <section className="publish">
        <div className="publish__title-container">
          <h1 className="publish__title">SUCCESS!!</h1>
        </div>
        <div>
          <span className="publish__logo" aria-label="a rocket" role="img">
            🚀
          </span>
        </div>
      </section>
      <div className="button__wrapper">
        <Link to={"/"} className="button__link">
          <button className="button">Home</button>
        </Link>
      </div>
    </>
  );
};

export default Publish;
