import React from 'react';

import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
    const role = localStorage.getItem('role')
    const username = localStorage.getItem('username')
  return (
      <div className='hero-container'>
          <video src='/videos/video-1.mp4' autoPlay loop muted />
          <h1>Selamat Datang {username}</h1>
          <h2></h2>
          <p>Sebagai {role} Skuy kerja</p>
            <div className='hero-btns'>
                <Button className='btns' 
                buttonStyle='btn--outline'
                buttonSize='btn--large'>Mulai bekerja
                <i className='far fa-play-circle'/>
                </Button>

                {/* <Button
                className='btns' 
                buttonStyle='btn--primary'
                buttonSize='btn--large'>
                    Mulai bekerja <i className='far fa-play-circle'/>
                </Button> */}
            </div>   
            
      </div>
  )
}

export default HeroSection;
