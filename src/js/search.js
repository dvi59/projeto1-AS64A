let carName = document.querySelector('#carName')
let tableResult = document.querySelector('#result')
let errors = document.querySelector('#carNameError')
let searchBtn = document.querySelector('#searchBtn')
//let registerBtn = document.querySelector('#registerBtnCar')

carName.value = '';
searchBtn.disabled = true;

carName.addEventListener('keyup', () => {
    if (carName.value.length < 3) {
        errors.innerHTML = 'Digite ao menos 3 letras';
        searchBtn.disabled = true;
    } else {
        errors.innerHTML = '';
        searchBtn.disabled = false;
    }
});


function consultar() {
    var child = tableResult.lastElementChild;
    while (child) {
        if (child.tagName !== "TBODY") {
            tableResult.removeChild(child);
            child = tableResult.lastElementChild;
        } else {
            break;
        }
    }
   
    const token = document.cookie.split('?').find((row) => row.startsWith('token='))?.split('=')[1]
    console.log("TOKEN DISPARADO PARA CONSULTA",token)
    axios.get('http://localhost:1337/car/search', {  headers: {Authorization: token}})
        .then((res) => {
            
            console.log("Rodou",res.data.car[2])
            for (let i = 0; i < res.data.car.length; i++) {
                console.log("Entrou no laço")
                if (carName.value === res.data.car[i].name) {
                    console.log("Entrou no if")
                    var tr = document.createElement('tr')
                    var td1 = document.createElement('td')
                    var td2 = document.createElement('td')
                    var td3 = document.createElement('td')
                    td1.innerHTML = res.data.car[i].name
                    td2.innerHTML = res.data.car[i].ano
                    td3.innerHTML = res.data.car[i].modelo
                    tableResult.append(tr)
                    tr.appendChild(td1)
                    tr.appendChild(td2)
                    tr.appendChild(td3)
                }
            }
        }).catch((error) => {
            console.log("ERRO EM CONSUMIR DADOS", error)
        })
}





