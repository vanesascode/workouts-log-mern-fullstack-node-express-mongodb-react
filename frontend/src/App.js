import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

// pages & components
import Home from './pages/Home';
import Tips from './pages/Tips';
import Navbar from './components/Navbar'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/tips"
              element={<Tips />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;