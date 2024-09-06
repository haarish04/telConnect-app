//import React from 'react'
import NavBar from './components/NavBar'
import './App.css'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'

const App = () => {
  return (
    <div className=''>
      <NavBar></NavBar>
      {/* <HomePage></HomePage> */}
      <ProfilePage></ProfilePage>
    </div>
  )
}

export default App

