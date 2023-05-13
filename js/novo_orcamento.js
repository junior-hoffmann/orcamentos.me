window.addEventListener('load', () => carregarDados())

let itens = []

let btnAdicionar = document.getElementById('btn-adicionar')
let btnZerarDados = document.getElementById('btn-zerar-dados')
let btnGerarOrcamento = document.getElementById('btn-gerar-orcamento')

let campoDescricao = document.getElementById('novo__item-nome')
let campoQuantidade = document.getElementById('novo__item-quantidade')
let campoValor = document.getElementById('novo__item-valor')

let tabela = document.getElementById('tabela-body')
let tabelaTotal = document.getElementById('tabela-total')

btnGerarOrcamento.addEventListener('click', ()=>{
    gerarOrcamento()
})


btnAdicionar.addEventListener('click', function () {

    let novoItem = {
        'id': Date.now(),
        'descricao': campoDescricao.value,
        'quantidade': parseFloat(campoQuantidade.value),
        'valor-un': parseFloat(campoValor.value),
        'total': parseFloat(campoQuantidade.value) * parseFloat(campoValor.value)
    }

    itens.push(novoItem)

    let novaTag = document.createElement('tr')
    novaTag.setAttribute('data-id', novoItem['id'])
    novaTag.innerHTML = `
    <td>${novoItem['descricao']}</td>
    <td class="td__format">${novoItem['quantidade']}</td>
    <td class="td__format">R$ ${novoItem['valor-un'].toFixed(2)}</td>
    <td class="td__format">R$ ${novoItem['total'].toFixed(2)}</td>
    `

    novaTag.appendChild(botaoDeleta(novoItem['id']))

    tabela.appendChild(novaTag)

    let total = 0
    itens.forEach(item => total += item['total'])

    tabelaTotal.innerHTML = `
    <td class="td__format" colspan="3" style="text-align: right;">
        <strong>Total</strong>
    </td>
    <td class="td__format">
        <strong>R$ <span id="total">${total.toFixed(2)}</span></strong>
    </td>
`

    campoDescricao.value = ""
    campoQuantidade.value = ""
    campoValor.value = ""

    campoDescricao.focus()
})

function botaoDeleta(id){
    
    const elementoBotao = document.createElement('button')
    elementoBotao.innerHTML = '<i class="fa-solid fa-trash"></i>'
    elementoBotao.classList.add("btn")
    elementoBotao.classList.add("btn-remover") 
    elementoBotao.addEventListener('click', function (){
        deletarElemento(this.parentNode, id)
    })
    
    return elementoBotao
}

function deletarElemento(tag, id){

    tag.remove()
    itens.splice(itens.findIndex(elemento => elemento.id === id,), 1)

    let total = 0
    itens.forEach(item => total += item['total'])


    let spanTotal = document.getElementById('total')

    spanTotal.innerText = `${total.toFixed(2)}`

}

// Dados da empresa
let empresa
let cliente



function carregarDados() {



    let dados = JSON.parse(localStorage.getItem('dadosDaEmpresaEDoCliente'))
    localStorage.setItem('orcamento', '')

    empresa = dados['empresa']
    cliente = dados['cliente']

    // campos da empresa
    let nomeDaEmpresa = document.querySelector("[data-id='nome_da_empresa'")
    nomeDaEmpresa.innerText = empresa.nome

    let enderecoDaEmpresa = document.querySelector("[data-id='endereco_da_empresa'")
    enderecoDaEmpresa.innerText = empresa.endereco

    let telefoneDaEmpresa = document.querySelector("[data-id='telefone_da_empresa'")
    telefoneDaEmpresa.innerText = empresa.telefone

    // campos do cliente
    let nomeDoCliente = document.querySelector("[data-id='nome_do_cliente'")
    nomeDoCliente.innerText = cliente.nome

    let enderecoDoCliente = document.querySelector("[data-id='endereco_do_cliente'")
    enderecoDoCliente.innerText = cliente.endereco

    let telefoneDoCliente = document.querySelector("[data-id='telefone_do_cliente'")
    telefoneDoCliente.innerText = cliente.telefone

}

function zerarDados() {
    itens = []
    campoDescricao.value = ""
    campoQuantidade.value = ""
    campoValor.value = ""
    tabela.innerHTML = ""
    tabelaTotal.innerHTML = ""
}

function gerarOrcamento(){
    
    localStorage.setItem('orcamento', JSON.stringify(itens))
    document.location.replace('../pages/orcamento.html')

}

btnZerarDados.addEventListener('click', () => { zerarDados() })