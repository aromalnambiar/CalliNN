import React from 'react'
import VideoPlayer from './components/VideoPlayer'
import Notification from './components/Notification'
import Options from './components/Options'

function App() {
  return (
    <div>
        <VideoPlayer/>
        <Options>
            <Notification/>
        </Options>
    </div>
    

  )
}

export default App