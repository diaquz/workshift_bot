import logo from './logo.svg';
import './App.css';

import {Footer} from 'flowbite-react'

import CustomDatepicker from './datepicker'
import Navigation from './navbar';
import Calendar from './calendar';

function App() {

  return (
    <div className="App bg-slate-50">
      <Navigation/>
      <Calendar />
      <Footer container={true}>
        <Footer.Copyright by="Андрей Федин" year={2023}/>
        <Footer.LinkGroup>
          <Footer.Link>About</Footer.Link>
          <Footer.Link>Privacy Policy</Footer.Link>
          <Footer.Link>Licensing</Footer.Link>
          <Footer.Link>Contact</Footer.Link>
        </Footer.LinkGroup>
      </Footer>
    </div>
  );
}

export default App;
