// configurações da api
var firebaseConfig = {
    apiKey: "AIzaSyBJwjQ8GowAUtrRz8ay_bVk4Xq4sfAf_Gc",
    authDomain: "ranking-64dcf.firebaseapp.com",
    databaseURL: "https://ranking-64dcf-default-rtdb.firebaseio.com",
    projectId: "ranking-64dcf",
    storageBucket: "ranking-64dcf.appspot.com",
    messagingSenderId: "422700748618",
    appId: "1:422700748618:web:cabcf09904bf89dd42bbb3",
    measurementId: "G-FQG11S6YCE"
};

// inicializar banco de dados
firebase.initializeApp(firebaseConfig);

// instancia da tabela do banco de dados
const db = firebaseRef = firebase.database().ref("cabo").orderByChild('nota');

// corpo da tabela
const tbody = document.querySelector('#tbody')

db.on('value', (snapshot) => {
    // adiciona os dados em uma variável 
    let equipeList = Object.values(snapshot.val())

    // ordena os dados por tempo caso a nota seja igual
    equipeList.sort((a, b) => {
        if (a.nota > b.nota) return -1;
        if (a.nota < b.nota) return 1;
        if (a.tempo < b.tempo) return -1;
        if (a.tempo > b.tempo) return 1;
        return 0;
      });


    // insere os dados no html de cima pra baixo
    // normalmente um loop coloca os dados de baixo pra cima, deixando na ordem errada
    // por isso o loop está invertido
    for (let index = equipeList.length - 1; index >= 0; index--) {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');

        td1.innerText = equipeList[index].nome;
        td2.innerText = equipeList[index].nota;
        td3.innerText = equipeList[index].tempo;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tbody.prepend(tr);
    }
})

function Atualizar() {
    window.location.reload();
}