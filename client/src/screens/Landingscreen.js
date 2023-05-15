import React from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({
  duration : 2000
});

const Landingscreen = () => {
  return (
    <div>
      <div className='row landing text-center'>
        <div className='col-md-12'>
            <h2 data-aos='zoom-in' style={{color:'white' , fontSize:'130px'}}>Hotelify</h2>
            <h1 data-aos='zoom-out' style={{color:'white'}}>"Discover your world, book your stay with Hotelify."</h1>
            <Link to='/home'>
            <button className='btn landingbtn'>Get Started</button>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default Landingscreen
