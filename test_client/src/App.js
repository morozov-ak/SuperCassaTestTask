import React from 'react';
import './App.css';
import { connect } from 'react-redux'
import  AuthPage  from './pages/AuthPage';
import { useDispatch } from 'react-redux'
import { setCodes, setPhones } from './redux/actions';
import { message } from './utilites/message';


const ws = new WebSocket(`ws://${window.location.hostname}:5000`)

function App() {
  const dispatch = useDispatch()

  ws.onopen=()=>{console.log("подключились:")}
    
    ws.onmessage=(load)=>{
        let payload = JSON.parse(load.data)
        if(payload.codes){
          dispatch(setCodes(payload.codes))
        }
        if(payload.error){
          message(payload.error)
        }
        if(payload.phones){
          dispatch(setPhones(payload.phones))
        }
        console.log(payload)
    }

  return (
        <div className="container">
          <AuthPage ws={ws}/>
        </div>
  );
}


export default connect(null,null)(App)

//export default App;
