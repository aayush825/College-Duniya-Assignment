import { useState } from "react";
import CollegeList from "./components/college";
import './App.css'

function App() {
  return (
    <>
      <div className="App">
        <h1>College Rankings</h1>
        <CollegeList />
      </div>
    </>
  );
}

export default App;
