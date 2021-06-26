import React, { useState } from 'react'
import { message } from '../utilites/message.js'
import { connect } from 'react-redux'
import PhonesList from '../pages/PhonesList';

const AuthPage = ({codes,ws}) => {

    const [phoneNumber,setPhoneNumber] = useState({code:7,number:""})

    const changeHandler = event => {
        try{
            if(event.target.value.match(/\D/)){
                setPhoneNumber(phoneNumber)
                throw new Error("Недопустимый символ")
            }
            if(event.target.value.length>10){
                throw new Error("Больше 10 знаков")
            }
            else{
                setPhoneNumber({ ...phoneNumber, [event.target.name]: event.target.value })
            }
        }
        catch(err){
            message(err.message)
        }
    }

    const sendOnServer =()=>{
        try{
            if((phoneNumber.number===null)||(phoneNumber.number.length===0)){
                throw new Error("Введите номер")
            }
            if((phoneNumber.number.length<3)||(phoneNumber.number.length>10)){
                throw new Error("Длина номера должна быть от 3 до 10 символов")
            }
            ws.send(JSON.stringify({newPhoneNumber:phoneNumber.code+phoneNumber.number}))
            setPhoneNumber({ ...phoneNumber, number:""})
        }
        catch(err){
            message(err.message)
        }
    }
    
    const clearDataBase =()=>{
        try{
            ws.send(JSON.stringify({clearDataBase:true}))
        }
        catch(err){
            message(err.message)
        }
    }






    return (

        <div className="rel">
            <div className="auth" onSubmit={(event) => { event.preventDefault() }}>
            
                <div className="input-group mb-3">
                    <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">+{phoneNumber.code}</button>
                    <ul className="dropdown-menu">
                        {codes.map(code=>{
                            return <li key={code} onClick={()=>setPhoneNumber({...phoneNumber,code})} className="dropdown-item">{code}</li>
                        })}


                    </ul>
                    <input 
                        onKeyPress={(e)=>{if(e.key==="Enter"){sendOnServer()}}}
                        onChange={(event)=>changeHandler(event)} 
                        type="text" 
                        className="form-control" 
                        aria-label="Text input with dropdown button" 
                        placeholder="phone number" 
                        name="number" 
                        value={phoneNumber.number}  />
                </div>

                <div className="auth-buttons">
                    <button onClick={sendOnServer} className="btn btn-success mybtn">Добавить номер</button>
                    <button onClick={clearDataBase} className="btn btn-danger mybtn">Очистить базу</button>
                </div>
            <PhonesList/>
            </div>
        
        </div>
    )
}

const mapStateToProps = state =>{
    return {codes: state.app.codes}
}

export default connect(mapStateToProps,null)(AuthPage)
