const url = "https://reqres.in/api/login"
let senha = document.querySelector('#pass')
let nome = document.querySelector('#user')
let pass = document.querySelector('#passCad')
let username = document.querySelector('#userCad')
let email = document.querySelector('#emailCad')
let titleErrors = document.querySelector('#error')
let button = document.querySelector('#loginBtn')
let visibilitySearch = document.querySelector('#search')
let visibilityLogin = document.querySelector('#login')
let visibilityRegister = document.querySelector('#register')
let visibilityCarRegister = document.querySelector('#carRegister')
let messageSucess = document.querySelector('#message-sucess')
let messageCar = document.querySelector('#messageCar')
let marca = document.querySelector("#carnameCad")
let modelo = document.querySelector("#modeloCad")
let ano = document.querySelector('#anoCad')
let foto = document.querySelector('#fotoCad')
let tipo = document.querySelector('#tipo')
let registerBtn = document.querySelector('#registerBtnCar')
let validSenha = false;
let validNome = false;
//let token = document.cookie


senha.value = '';
nome.value = '';
button.disabled = true;
pass.value = '';
username.value = '';
email.value = '';


//Validação dos Campos de senha e userId
nome.addEventListener('keyup', () => {
    if (nome.value.length < 3) {
        nome.setAttribute('style', 'border: solid red')
        validNome = false;
        button.disabled = true;

    } else {
        nome.setAttribute('style', 'none')
        validNome = true;

    }
});

senha.addEventListener('keyup', () => {
    if (senha.value.length < 3) {
        senha.setAttribute('style', 'border: solid red')
        validSenha = false;
        button.disabled = true;
    } else {
        senha.setAttribute('style', 'none')
        validSenha = true;
        button.disabled = false;
    }
});

button.addEventListener('click', () => {
    if (validNome === false || validSenha === false) {
        button.disabled = true;
    } else {
        titleErrors.innerHTML = '';
        button.disabled = false;
    }
});


function validaLogin() {
    const id = localStorage.getItem("user")
    if (id != null) {
        visibilityLogin.classList.toggle('hidden')
        visibilitySearch.classList.toggle('hidden')
    }
}

function login() {
    const payloud = {
        email: nome.value,
        password: senha.value
    };
    axios.post(url, payloud)
        .then(response => {
            localStorage.setItem("user", nome.value)
            if (!!response.data) {
                visibilityLogin.classList.toggle('hidden')
                visibilitySearch.classList.toggle('hidden')
            } else {
                titleErrors.style.color = '#FF0000';
                titleErrors.innerHTML = "Não aprovado"
            }
        })
        .catch((error) => {
            titleErrors.innerHTML = 'Verifique os campos e tente novamente'
        })
}

function register() {
    visibilityLogin.classList.toggle('hidden')
    visibilityRegister.classList.toggle('hidden')
}

function cadUser() {
    console.log("Cadastrando...")
    axios.post('http://localhost:1337/auth/register', {
        name: username.value,
        email: email.value,
        password: pass.value,
        tipo: tipo.value
    }).then((res) => {
        messageSucess.innerHTML = "Usuário Cadastrado com sucesso"
        messageSucess.style.color = "green";
        console.log("200OK", res)
    })
        .catch((error) => {
            messageSucess.innerHTML = "Verifique os campos e tente novamente"
            messageSucess.style.color = "red";
        })
}

function cadCar() {
    console.log("Cadastrando Vecículo")
    const token = document.cookie.split('?').find((row) => row.startsWith('token='))?.split('=')[1]
    console.log("TOKEN DISPARADO PARA CADASTRO",token)
    axios.post('http://localhost:1337/car/register', {
        name: marca.value,
        modelo: modelo.value,
        ano: ano.value,
        foto: foto.value,
    },{headers: {Authorization: token}}).then((res) => {
        messageCar.innerHTML = "Veículo Cadastrado com sucesso"
        messageCar.style.color = "green";
        console.log("200OK", res)
        console.log(res)
    }).catch((error) => {
        messageCar.innerHTML = ""
        messageCar.style.color = "red";
    })
    marca.value = ''
    modelo.value = ''
    ano.value = ''
    foto.value = ''
    messageCar.innerHTML = ''
}

function loginMongo() {
    axios.post('http://localhost:1337/auth/login', {
        email: nome.value,
        password: senha.value,
    }).then((res) => {
        visibilityLogin.classList.toggle('hidden')
        visibilitySearch.classList.toggle('hidden')
        console.log("Pegando tipo", res.data.tipo, res.data.token)
        const token = res.data.token
        const tipo = res.data.tipo
        
        document.cookie = "tipo="+tipo+"?token="+ token + ";";
        const userTipo= document.cookie.split('?').find((row) => row.startsWith('tipo='))?.split('=')[1]
        if (userTipo === 'notAdm'){
            console.log("tipoUserValidation" >> userTipo)
            registerBtn.classList.toggle('hidden')
        }
    
    })
        .catch((error) => {
            console.log(error)
        })
}

function carRegister() {
    visibilityCarRegister.classList.toggle('hidden')
    visibilitySearch.classList.toggle('hidden')
}


function testeApi() {
   
    const token = document.cookie.split('?').find((row) => row.startsWith('token='))?.split('=')[1]
    if (token) {
        visibilityLogin.classList.toggle('hidden')
        visibilitySearch.classList.toggle('hidden')
    }
    const userTipo= document.cookie.split('?').find((row) => row.startsWith('tipo='))?.split('=')[1]
    if (userTipo === 'notAdm'){
        console.log("tipoUserValidation" >> userTipo)
        registerBtn.classList.toggle('hidden')
    }
    
}


