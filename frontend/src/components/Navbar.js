import { Link } from 'react-router-dom'
import './Navbar.css';

const Navbar = () => {



  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>WORKOUT LOG</h1>
        </Link>
        <Link to="/tips" style={{ "textDecoration": "none" }}>
          <button>Tips</button>
        </Link>
      </div>
    </header>
  )
}



export default Navbar