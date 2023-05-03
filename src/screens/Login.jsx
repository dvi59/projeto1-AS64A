import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import '../js/login.js';

const loginURL = "http://localhost:1337/auth/login"

const Login = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [msgError, setMsgError] = useState('');

    function loginMongo() {
        console.log(">>> LOGIN START" + user + pass)
        axios.post(loginURL, {
            email: user,
            password: pass,
        }).then((res) => {
            //console.log("Vamos lá", res.data)
            const token = res.data.token
            const tipo = res.data.tipo
            document.cookie = "tipo=" + tipo + "?token=" + token + ";";
            navigate('/carsearch')

        })
            .catch((error) => {
                //console.log("Vamos lá", error.response.data.msg)
                setMsgError(error.response.data.msg)
                //console.log(error.data)0
            })
    }

    useEffect(() => {
        console.log(user);
    }, [user]);


    return (
        <div id="login" className="login">
            <div className="login-wrapper">
                <form action="" className="login-form">
                    <span id="title" className="login-title">Login</span>
                    <div id="error" className="error-title">{msgError}</div>
                    <div className="input-wrapper">
                        <input className="input" type="text" id="user" placeholder="Nome de Usuário" value={user} onChange={(e) => setUser(e.target.value)} />
                    </div>
                    <div className="input-wrapper">
                        <input className="input" type="password" id="pass" placeholder="Senha" value={pass} onChange={(e) => setPass(e.target.value)} />
                    </div>
                    <div className="button">
                        <button id="loginBtn" type="button" onClick={loginMongo}
                            className="btn btn-outline-secondary">Entrar</button>
                    </div>
                    <div className="button">

                        <button id="registerBtn" type="button" onClick={() => navigate('/register')}
                            className="btn btn-outline-primary">Cadastre-se</button>
                    </div>

                </form>
            </div>
        </div>
    )

}

export default Login;