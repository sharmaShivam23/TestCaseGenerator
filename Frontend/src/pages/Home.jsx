import React from 'react'
import robot from "../assets/images/robot.svg"
import Tumnail from "../assets/images/Tumnail.svg"
import HomeMainPage from '../components/HomepageCores/HomeMainPage'
import Home2 from '../components/HomepageCores/Home2'
import Home3 from '../components/HomepageCores/Home3'
import Contact from './Contact'
import Testimonials from '../components/HomepageCores/Testimonials'
import Working from './Working'
import ScrollTop from './ScrollTop'
import Lenis from 'lenis'
const Home = () => {
  
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
  return (
   <>
    <div className='relative max-[770px]:h-[120vh] overflow-x-hidden max-[570px]:h-[130vh] min-h-screen h-auto '>
  <div className='absolute inset-0 -z-10 blur-sm'>
    <div className='w-full h-full bg-[linear-gradient(to_bottom,_#000_70%,_#460F9E_100%)]'>
    <img src={robot} className='absolute h-full z-10 sm:right-10' alt="" />
    </div>
  </div>


  <div className="relative z-10">
    <HomeMainPage />
  </div>
</div>

<Home2/>
<Working/>
<Home3/>
<Testimonials/>
<Contact/>
 </>
  )
}

export default Home
