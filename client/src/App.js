import './App.css';
import {BrowserRouter as Router ,Routes, Route, Link} from 'react-router-dom';
import Navbar from './components/Navbar';
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';
import Landingscreen from './screens/Landingscreen';

function App() {
  return (
    <div className="App">
    <Navbar/>
    <Router>
    <Routes>
      <Route exact path='/home' element={<Homescreen />}/>
      <Route exact path='/book/:roomid/:fromdate/:todate' element={<Bookingscreen/>}/>
      <Route exact path='/register' element={<Registerscreen />}/>
      <Route exact path='/login' element={<Loginscreen />}/>
      <Route exact path='/profile' element={<Profilescreen/>}/>
      <Route exact path='/admin' element={<Adminscreen/>}/>
      <Route exact path='/' element={<Landingscreen/>}/>
      {/* <Route path="/bookings/:roomid" render={({ match }) => <Bookingscreen match={match} />} /> */}
      </Routes>
    </Router>
    {/* <Homescreen/> */}
    </div>
  );
}

export default App;
