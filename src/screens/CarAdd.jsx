import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const CarAdd = () => {
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState('')
    const [marca,setMarca] = useState('')
    const [modelo,setModelo] = useState('')
    const [ano,setAno] = useState('')

     function carRegister() {
        console.log("Cadastrando Vecículo")
        const token = document.cookie.split('?').find((row) => row.startsWith('token='))?.split('=')[1]
        console.log("TOKEN DISPARADO PARA CADASTRO",token)
        axios.post('http://localhost:1337/car/register', {
            name: marca,
            modelo: modelo,
            ano: ano,
        },{headers: {Authorization: token}}).then((res) => {
           
            setErrorMsg("Veículo Cadastrado com sucesso!!")
            document.getElementById("messageCar").style = 'color : green';
        }).catch((error) => {
            setErrorMsg(error.response.data.msg)
            document.getElementById("messageCar").style = 'color : red';
            
        })
    }

    return (
        <div id="carRegister" className="carRegister">
            <div className="login-wrapper">
                <div className="text-sucess" id="messageCar">{errorMsg}</div>
                <div className="input-wrapper">
                    <input className="input" type="text" id="carnameCad" placeholder="Marca" value={marca} onChange={(e) => setMarca(e.target.value)}/>
                </div>
                <div className="input-wrapper">
                    <input className="input" type="text" id="modeloCad" placeholder="Modelo" value={modelo} onChange={(e) => setModelo(e.target.value)}/>
                </div>
                <div className="input-wrapper">
                    <input className="input" type="text" id="anoCad" placeholder="Ano" value={ano} onChange={(e) => setAno(e.target.value)}/>
                </div>
                <div className="button">
                    <button id="registerBtn" type="button" onClick={carRegister}
                        className="btn btn-outline-primary">Cadastrar!</button>
                </div>
                <div className="button">
                    <button type="button" className="btn btn-outline-primary" onClick={() => navigate(-1)}>
                        Voltar
                    </button>
                </div>
            </div>
        </div>
    )


}
export default CarAdd;