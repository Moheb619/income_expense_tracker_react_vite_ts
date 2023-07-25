import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import IncomePage from "./IncomePage";
import ExpensePage from "./ExpensePage";

function App() {
  return (
    <>
      <Router>
        <div className="bg-gray-100 min-h-screen">
          <nav className="bg-blue-500 p-4 mb-4">
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="text-white hover:underline">
                  Income
                </Link>
              </li>
              <li>
                <Link to="/expenses" className="text-white hover:underline">
                  Expenses
                </Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" Component={IncomePage} />
            <Route path="/expenses" Component={ExpensePage} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
