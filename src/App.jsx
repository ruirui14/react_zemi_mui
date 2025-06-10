import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import StockList from './pages/stock_list';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/app" element={<StockList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
