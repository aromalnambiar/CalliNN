import React, { useContext, useState } from 'react'
import { SocketContext } from '../SocketContext'

function Options({children}) {
  // context
  const {callAccepted, name,  callEnded, mine, setName, leaveCall, callUser } = useContext(SocketContext);

  // state
  const [idToCall, setIdToCall] = useState();

  return (
    <div>
      <form action="">
        <p>Account Info</p>
      </form>
      <p>Options</p>
      {children}
    </div>
  )
}

export default Options