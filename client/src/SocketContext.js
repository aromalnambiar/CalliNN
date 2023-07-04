import React, {createContext, useState, useRef, useEffect} from 'react';
import {io} from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('http://localhost:5000')

const ContextProvider = ({children}) => {

    // states
    const [stream, setStream] = useState(null);
    const [mine, setMine] = useState('');
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name , setCallName] = useState('');

    // ref for video iframe
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();
    
    // useeffect
    useEffect(() => {
      navigator.mediaDevices.getUserMedia({video: true, audio: true})   
        .then((userMedia) => {
            setStream(userMedia);
            // setting up the red
            myVideo.current.srcObject = userMedia;
        })

        // setting up the socket
        socket.on('me', (id) => setMine(id));

            // call settings
            socket.on('calluser', ({from, name: callerName, signal}) => {
                setCall({isRecivedCall: true, from, name: callerName, signal})
            })
    }, [])
    
    
    // for answer th call
    const answecall = () => {
        setCallAccepted(true);

        // setup peerjs
        const peer = new Peer({initiator: false, trickle: false});

        peer.on('signal', (data) => {
            socket.emit('answercall', {signal: data, to: call.from});
        })

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        })

        peer.signal(call.signal)

        connectionRef.current = peer;
    }

    // for call the user
    const callUser = (id) => {

            // setup peerjs
            const peer = new Peer({initiator: false, trickle: false});
            
            peer.on('signal', (data) => {
                socket.emit('calluser', {userTocall: id, signalData: data, from: mine, name});
            })
    
            peer.on('stream', (currentStream) => {
                userVideo.current.srcObject = currentStream;
            })
            
            socket.on('callaccepted', (signal) =>{
                setCallAccepted(true);
                peer.signal(signal);
            })

    }

    // for hungup the call
    const leaveCall = () => {
        setCallEnded(true);

        connectionRef.current.destroy();

        window.location.reload();
    }


    return(
        <SocketContext.Provider value={{ call, callAccepted, mine, name, myVideo, userVideo, stream, setCallName, callEnded, callUser, leaveCall, answecall }}>
            {children}
        </SocketContext.Provider>
    )

}

export {ContextProvider, SocketContext};