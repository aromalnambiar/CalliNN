import React, {createContext, useState, useRef, useEffect} from 'react';
import {io} from 'socket.io-client';
import Peer from 'simple-peer';

const socketContext = createContext();

const socket = io('http://localhost:5000')

const ContextProvider = ({childer}) => {

    // states
    const [stream, setStream] = useState(null);
    const [mine, setMine] = useState('');
    const [call, setCall] = useState({});

    // ref for video iframe
    const myVideo = useRef();
    
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

    }

    // for call the user
    const callUser = () => {

    }

    // for hungup the call
    const leaveCall = () => {

    }

}