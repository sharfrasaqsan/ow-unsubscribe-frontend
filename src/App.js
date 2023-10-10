import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UnsubscribeForm from "./components/unsubscribeform";
import UnsubscribeSuccess from "./components/success";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UnsubscribeForm />} />
          <Route path="/success" element={<UnsubscribeSuccess />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
