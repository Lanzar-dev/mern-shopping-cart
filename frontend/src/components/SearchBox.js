import React from "react";
import { useState } from "react";
import "./SearchBox.css";

const SearchBox = ({ history }) => {
  const [name, setName] = useState("");

  const submutHandler = (e) => {
    e.preventDefault();

    history.push(`/search/name/${name}`);
  };

  return (
    <form className="search" onSubmit={submutHandler}>
      <div className="row">
        <input
          type="text"
          name="q"
          id="q"
          placeholder="Search products, categories"
          onChange={(e) => setName(e.target.value)}
        />
        <button className="primary" type="submit">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
};

export default SearchBox;
