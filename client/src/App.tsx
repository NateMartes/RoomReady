import { useState } from 'react'
// assets import reactLogo from './assets/react.svg'
// public import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header/Header.tsx'
import ImageUploader from './ImageUploader/ImageUploader.tsx'
import Location from './Location/Location.tsx'

function App() {

  return (
    <>
      <Header/>
      <ImageUploader/>
      <Location/>
    </>
  ); 
}

export default App
