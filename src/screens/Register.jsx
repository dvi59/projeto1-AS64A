import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState('')
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [type, setType] = useState('');

    function cadUser() {
        console.log("Cadastrando...", type)
        axios.post('http://localhost:1337/auth/register', {
            name: name,
            email: email,
            password: pass,
            tipo: type
        }).then((res) => {
            
            setErrorMsg("Usuário cadastrado!!")
        })
            .catch((error) => { 
                setErrorMsg(error.response.data.msg)
                
            })
    }

    useEffect(() => {
        console.log(type);

    }, [type]);


    return (
        <div>
            <div id="register" className="register">
                <div className="login-wrapper">
                    <div className="text-sucess" id="message-sucess">{errorMsg}</div>
                    <div className="input-wrapper">
                        <input className="input" type="text" id="userCad" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="input-wrapper">
                        <input className="input" type="text" id="emailCad" placeholder="E-Mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input-wrapper">
                        <input className="input" type="password" id="passCad" placeholder="Senha" value={pass} onChange={(e) => setPass(e.target.value)} />
                    </div>
                    <div className="input-wrapper" style={{ display: 'inline-flex', justifyContent: 'center' }}>
                        <select value={type} onChange={(e) => setType(e.target.value)} className="form-select" name="tipo" id="tipo">
                            <option value="0">Selecione...</option>
                            <option value="1">Administrador</option>
                            <option value="2">Usuário</option>
                        </select>
                    </div>

                    <div className="button">
                        <button id="registerBtn" type="button" onClick={cadUser}
                            className="btn btn-outline-primary">Cadastrar!</button>
                    </div>
                    <div className="button">
                        <button type="button" className="btn btn-outline-primary" onClick={() => navigate(-1)}>
                            Voltar
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Register;
