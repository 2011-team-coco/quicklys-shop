import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import AllCandies from './components/AllCandies'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <AllCandies />
    </div>
  )
}

export default App
