import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const CarSearch = () => {



    const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState('')
    const [carname, setCarname] = useState('')
    const [datacar, setDatacar] = useState([])

    useEffect(() => {
        console.log("EFFECT >> ", datacar)
    }, [datacar])


    function carQuery() {

        const token = document.cookie.split('?').find((row) => row.startsWith('token='))?.split('=')[1]
        if (3 <= carname.length)
            axios.get('http://localhost:1337/car/search', { headers: { Authorization: token } })
                .then((res) => {
                    const carList = res.data.car.map((car) => {
                        if ((car.name.toLowerCase()).includes(carname.toLowerCase()))
                            return car;
                    }).filter(e => e);
                    setErrorMsg("");
                    setDatacar(carList);

                })
        else
            setErrorMsg("Preencha ao menos 3 caracteres")
    }
    const handleQualquer = (event) => {

        if (event.key === 'Enter') {
            carQuery()
        }
    }

    return (
        <div id="search" className="search">
            <div className="car-error" id="carNameError">{errorMsg}</div>
            <div className="input-search">
                <input className="form-control" type="input" value={carname} onChange={(e) => setCarname(e.target.value)} onKeyDown={handleQualquer} />
                <button id="searchBtn" type="button" className="btn btn-outline-secondary" onClick={carQuery}>Buscar</button>
                <button className="btn btn-outline-secondary" id="registerBtnCar" onClick={() => navigate('/caradd')} >+</button>
                <button className="btn btn-outline-secondary" id="registerBtnCar" onClick={() => navigate('/logger')} >Logger</button>
            </div>
            <table id="result" className="table">
                <tr>
                    <th>Fabricante</th>
                    <th>Modelo</th>
                    <th>Ano</th>
                </tr>

                {datacar?.length > 0 && datacar?.map((cart) => {

                    return <tbody>

                        <tr>
                            <td>{cart.name}</td>
                            <td>{cart.modelo}</td>
                            <td>{cart.ano}</td>
                        </tr>
                    </tbody>
                })

                }



            </table>
        </div>
    )
}


export default CarSearch;