import './App.css';
import './tailwind.css';

import React from 'react';

import CustomFooter from './components/Footer'
import Navigation from './components/Navigation'

import UserSchedule from './screens/UserSchedule';
import OffersScreen from './screens/Offers';
import Login from './screens/Login';
import MoaderationScreen from './screens/Moderation';


// import ErrorScreen from './error-screen';

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import * as moment from 'moment';

moment.updateLocale('en', {
    months : [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль",
        "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ]
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserSchedule />
  },
  {
    path: '/schedule',
    element: <UserSchedule />
  },
  {
    path: '/offers',
    element: <OffersScreen />
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/moderation',
    element: <MoaderationScreen />
  }
]);

function App() {
  return (
    <div className="App bg-slate-50">
      <Navigation/>

      <React.StrictMode>
        <RouterProvider router={router}/>
      </React.StrictMode>

      <CustomFooter/>
    </div>
  );
}

export default App;
