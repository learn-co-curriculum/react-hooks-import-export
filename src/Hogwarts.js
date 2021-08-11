import React from "react";
import whoseHouse from "./houses/whoseHouse";

function Hogwarts() {
  whoseHouse(); // => "HAGRID'S HOUSE!"

  return <h1>Welcome to Hogwarts!</h1>;
}
