import React from "react";
import style from "./index.scss";

const Home = () => {
  return (
    <div className={style.home}>
      <h3>Hello world!</h3>
      <p>Let's start coding</p>
    </div>
  );
};

export default {
  component: Home
};
