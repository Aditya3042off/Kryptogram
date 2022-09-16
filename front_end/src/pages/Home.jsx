import React from 'react'
import DisplayPosts from '../components/Home/DisplayPosts';

import UploadForm from '../components/Home/UploadForm';

import './Home.css';

const Home = () => {
  return (
    <div className="Home">
        <UploadForm />
        <DisplayPosts/>
    </div>
  )
}

export default Home