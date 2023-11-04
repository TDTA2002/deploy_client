import { useNavigate } from 'react-router-dom';
import './navbar.scss'
import logo from '@/images/logo.svg'
import lmobileogo from '@/images/menu-mobile.svg'
import Cart from '@/components/Cart';
import Search from '@/components/Search';

export default function Navbar() {

  const navigate = useNavigate()

  return (
    <header className="header">
      <nav id="nav">
        <div className="logo">
          <div id="menu-mobile">
            <img
              className="menu-mobile"
              src={lmobileogo}
              alt="menu do dispositivo mobile"
            />
          </div>
          <img
            className="logo-img"
            src={logo}
            alt="logo do PlayStation"
          />
          <h2 className="logo-titulo">PlayStation</h2>
        </div>
        <div className="menu">
          <ul className="links">
            <li className="nav-link">
              <div onClick={() => navigate('/')}> Home</div>
            </li>
            <li className="nav-link">
              <div onClick={() => navigate('/about')}> About</div>
            </li>
            <li className="nav-link">
              <div onClick={() => navigate('/products')}> Products</div>
            </li>
            <li className="nav-link">
              <a href="#faq"> FAQs</a>
            </li>
            <li className="nav-link">
              <div onClick={() => navigate('contact')}> Contact</div>
            </li>
          </ul>
        </div>
        <div className='effect'>
          <Cart />
          <Search />
        </div>
      </nav>
    </header>
  )
}
