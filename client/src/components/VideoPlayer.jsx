import React, {useContext} from 'react'
import { SocketContext } from '../SocketContext'

function VideoPlayer() {

  const {call, callAccepted, name, myVideo, userVideo, stream,  callEnded, } = useContext(SocketContext);

  return (
    <>
    <p> Name </p> 
    <div className='flex flex-wrap justify-center '>
           
           {/* me video */}
           <span>
              <video playsInline muted ref={myVideo} autoPlay className='rounded-xl transform -scale-x-100 ' />
           </span>
           
           
           

           {/* another user video */}
           <span>
              <video playsInline muted ref={userVideo} autoPlay className='rounded-xl transform -scale-x-100 ' />
           </span>
    </div>
    </>
    
  )
}

export default VideoPlayer