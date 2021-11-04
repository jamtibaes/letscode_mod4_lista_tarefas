// Seletores
const btnAdicionar = document.querySelector('#btn-adicionar');
const btnApagar = document.querySelector('#btn-remover');
const btnCancelar = document.querySelector('#btn-cancelar');
const btnConfirmarAdicionar = document.querySelector('#btn-enviar');
const btnConfirmarApagar = document.querySelector('#btn-confirmar-exclusao');
const btnConfirmarCancelar = document.querySelector('#btn-confirmar-cancelamento');
const listItem = document.querySelector('#list-item');
const inputAdicionar = document.querySelector('#adicionar-tarefa');
const aparecerBtnAdicionar = document.querySelector('#formulario');
const aparecerBtnApagar = document.querySelector('#exclusao');
const aparecerBntCancelar = document.querySelector('#cancelamento');
const mensagemAlerta = document.querySelector('#mensagem');
const botoes = document.querySelectorAll('button');
const checkboxInput = document.querySelectorAll('.form-check-input')


// Variáveis
const tarefas = []
let lista = []
let btnAdicionarPressionado = false
let btnApagarPressionado = false
let btnCancelarPressionado = false
const btnAd = botoes[3]
const btnAp = botoes[4]
const btnCa = botoes[5]
btnAd.disabled = false
btnAp.disabled = false
btnCa.disabled = false



// Funções
const condicaoInicial = () => {

    if(!buscarDadosStorage('tarefas')){
        btnAp.disabled = true
        btnCa.disabled = true
    } else {
        btnAd.disabled = false
        btnAp.disabled = false
        btnCa.disabled = false
    }

    btnAdicionar.textContent = 'Adicionar Tarefas'
    btnApagar.textContent = 'Apagar Tarefas'
    btnCancelar.textContent = 'Cancelar Tarefas'

    aparecerBtnAdicionar.classList.add('visually-hidden')
    aparecerBtnApagar.classList.add('visually-hidden')
    aparecerBntCancelar.classList.add('visually-hidden')
    removerSelecaoNasTarefas()
}

const adicionarNovaTarefa = ({tarefa, cancelado}) => {
    return `
        <li class="list-group-item">
            <input class="form-check-input me-1 visually-hidden" type="checkbox">
            <span class=${cancelado ? "text-decoration-line-through" : ""}>${tarefa}</span> 
        </li>
    `
}

const preencherLista = (tarefas) => {
    if(!tarefas){
        return
    } else {
        const lista = tarefas
        .map(tarefa => adicionarNovaTarefa(tarefa))
        .join('')
        listItem.innerHTML = lista
    }
}

const enviarAlerta = (tipo, mensagem) => {
    mensagemAlerta.innerHTML = `
        <div class="alert alert-${tipo}" role="alert">
            ${mensagem}
        </div>
    `
    setTimeout(()=>{
        mensagemAlerta.innerHTML = ''
    }, 3000)
}

const adicionarSelecaoNasTarefas = () => {
    document.querySelectorAll('.form-check-input').forEach((entrada)=>{
        entrada.classList.remove('visually-hidden')
    })
}

const removerSelecaoNasTarefas = () => {
    document.querySelectorAll('.form-check-input').forEach((entrada)=>{
        entrada.classList.add('visually-hidden')
    })
}


// Eventos de Botão
btnAdicionar.addEventListener('click', function(evento){
    condicaoInicial()
    if(!btnAdicionarPressionado){
        btnAdicionarPressionado = true
        aparecerBtnAdicionar.classList.remove('visually-hidden')
        btnAdicionar.textContent = 'Cancelar'
        inputAdicionar.focus()
        btnAp.disabled = true
        btnCa.disabled = true
    } else {
        btnAdicionarPressionado = false
        aparecerBtnAdicionar.classList.add('visually-hidden')
    }
});

btnApagar.addEventListener('click', function(evento){
    condicaoInicial()
    const listaAtual = document.querySelectorAll('.form-check-input')
    listaAtual.forEach((item, indice)=>(listaAtual[indice].checked = false))    

    if(!btnApagarPressionado){
        btnApagarPressionado = true
        aparecerBtnApagar.classList.remove('visually-hidden')
        btnApagar.textContent = 'Cancelar'
        adicionarSelecaoNasTarefas()
        btnAd.disabled = true
        btnCa.disabled = true
    } else {
        btnApagarPressionado = false
        aparecerBtnApagar.classList.add('visually-hidden')
        removerSelecaoNasTarefas()
    }
});

btnCancelar.addEventListener('click', function(evento){
    const dadosCapturados = buscarDadosStorage('tarefas')
    const listaAtual = document.querySelectorAll('.form-check-input')
    condicaoInicial()

    if(!btnCancelarPressionado){
        btnCancelarPressionado = true
        aparecerBntCancelar.classList.remove('visually-hidden')
        btnCancelar.textContent = 'Cancelar'
        btnAd.disabled = true
        btnAp.disabled = true
        adicionarSelecaoNasTarefas()
        dadosCapturados.forEach((item, indice)=>{
            if(item.cancelado){
                listaAtual[indice].checked = true 
            }
        })
    } else {
        btnCancelarPressionado = false
        aparecerBntCancelar.classList.add('visually-hidden')
        removerSelecaoNasTarefas()
    }
});

btnConfirmarAdicionar.addEventListener('click', function(evento){
    lista = []
    if(inputAdicionar.value != ''){
        const dado = {tarefa: inputAdicionar.value, cancelado: false}        
        lista.push(dado)

        preencherLista(tarefas);
        adicionarArrayAoStorage('tarefas', JSON.stringify(lista))
        enviarAlerta('success', 'Salvo com sucesso!')
        
        aparecerBtnAdicionar.classList.add('visually-hidden')
        inputAdicionar.value = ''
    } else {
        aparecerBtnAdicionar.classList.add('visually-hidden')
        enviarAlerta('danger', 'Campo Vazio!')
    }
    condicaoInicial()
    btnAdicionarPressionado = false
});

btnConfirmarApagar.addEventListener('click', function(evento){
    
    const listaAtual = document.querySelectorAll('.form-check-input')
    const dadosCapturados = buscarDadosStorage('tarefas')

    listaAtual
        .forEach((item, indice)=>{
            if(item.checked){
                dadosCapturados[indice].deletar = true
            }
        })
    const novaTarefas = dadosCapturados.filter(item => !item.deletar)
    salvarDadosStorage('tarefas', JSON.stringify(novaTarefas));

    enviarAlerta('success', 'Apagado com sucesso!')
    preencherLista(novaTarefas)
    
    condicaoInicial()
    btnApagarPressionado = false

});

btnConfirmarCancelar.addEventListener('click', function(evento){
    condicaoInicial()

    const listaAtual = document.querySelectorAll('.form-check-input')
    const dadosCapturados = buscarDadosStorage('tarefas')
    
    listaAtual.forEach((item, indice)=>{
        if(item.checked || !dadosCapturados[indice].cancelado){
            dadosCapturados[indice].cancelado = true
        } 
        if(!item.checked){
            console.log('teste')
            dadosCapturados[indice].cancelado = false
        }
    })

    salvarDadosStorage('tarefas', JSON.stringify(dadosCapturados));

    enviarAlerta('success', 'Atualizado com sucesso!')
    preencherLista(dadosCapturados)
    btnCancelarPressionado = false
    
});


const buscarDadosStorage = (storageName) => {
    return JSON.parse(localStorage.getItem(storageName))
}

const salvarDadosStorage = (storageName, dados) => {
    localStorage.setItem(storageName, dados) 
}

const adicionarArrayAoStorage = (storageName, novosItems) => {

    let dadosAtuais = buscarDadosStorage(storageName) || [];

    console.log('lista', lista)
    console.log('novos itens', JSON.parse(novosItems))
    console.log('dados atuais', dadosAtuais)

    const novaLista = dadosAtuais.concat(JSON.parse(novosItems))

    //const novaLista = lista.concat(novosItems);
    //const novaLista = [...novosItems, ...dadosAtuais]

    console.log(novaLista)
    salvarDadosStorage(storageName, JSON.stringify(novaLista));

    preencherLista(novaLista);

};

const rodaAutomaticamenteAoInicializar = () => {
    const dadosCapturados = buscarDadosStorage('tarefas')
    preencherLista(dadosCapturados)
    lista = dadosCapturados
  }

rodaAutomaticamenteAoInicializar()
condicaoInicial()

