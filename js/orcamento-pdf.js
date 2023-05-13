window.addEventListener('load', () => {
    carregarDados()
})

let itens
let empresa
let cliente

let btnDownload = document.getElementById('btn-download')

function downloadPDF() {
    let content = document.querySelector('.content')
    let optionsPDF = {
        enableLinks: true,
        margin: 0,
        filename: "orcamento.pdf",
        html2canvas: { scale: 1.5 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    }

    // let optionsPDF = {
    //     filename: 'orcamento.pdf',
    //     image: {
    //         type: "jpeg",
    //         quality: 1.0,
    //     },
    //     html2canvas: {
    //         scale: 1.5,
    //         dpi: 192,
    //         letterRendering: true,
    //         allowTaint: true,
    //     },
    //     jsPDF: {
    //         unit: "mm",

    //         format: [260, 280],
    //         orientation: "portrait",
    //         compress: true
    //     },
    // }

    html2pdf().set(optionsPDF).from(content).toContainer().toCanvas().toImg().toPdf().save()
}


btnDownload.addEventListener('click', () => {
    downloadPDF()
})

function carregarDados() {

    let dados = JSON.parse(localStorage.getItem('dadosDaEmpresaEDoCliente'))
    empresa = dados['empresa']
    cliente = dados['cliente']

    itens = JSON.parse(localStorage.getItem('orcamento'))
    console.log(itens)

    carregarEmpresa()
    carregarCliente()
    carregarItens()
    carregarData()

}

function carregarEmpresa() {

    let nomeDaEmpresa = document.querySelector("[data-id='nome_da_empresa'")
    nomeDaEmpresa.innerText = empresa.nome

    let enderecoDaEmpresa = document.querySelector("[data-id='endereco_da_empresa'")
    enderecoDaEmpresa.innerText = empresa.endereco

    let telefoneDaEmpresa = document.querySelector("[data-id='telefone_da_empresa'")
    telefoneDaEmpresa.innerText = empresa.telefone

}

function carregarCliente() {

    let nomeDoCliente = document.querySelector("[data-id='nome_do_cliente'")
    nomeDoCliente.innerText = cliente.nome

    let enderecoDoCliente = document.querySelector("[data-id='endereco_do_cliente'")
    enderecoDoCliente.innerText = cliente.endereco

    let telefoneDoCliente = document.querySelector("[data-id='telefone_do_cliente'")
    telefoneDoCliente.innerText = cliente.telefone

}

function carregarItens() {

    let tabela = document.getElementById('tabela-body')
    let tabelaTotal = document.getElementById('tabela-total')

    let total = 0

    itens.forEach(item => {
        tabela.appendChild(novoItem(item))
        total += item['total']
    })

    tabelaTotal.innerHTML = `
    <td class="td__format" colspan="3" style="text-align: right;">
        <strong>Total</strong>
    </td>
    <td class="td__format">
        <strong>R$ <span id="total">${total.toFixed(2)}</span></strong>
    </td>
`


}

function novoItem(item) {

    let novaTag = document.createElement('tr')

    novaTag.innerHTML = `
    <td>${item['descricao']}</td>
    <td class="td__format">${item['quantidade']}</td>
    <td class="td__format">R$ ${item['valor-un'].toFixed(2)}</td>
    <td class="td__format">R$ ${item['total'].toFixed(2)}</td>
    `

    return novaTag

}

function carregarData() {
 
    let dataText = document.getElementById('data')

    let data = new Date();
    let dia = data.getDate().toString().padStart(2, '0');
    let mes = (data.getMonth() + 1).toString().padStart(2, '0');
    let ano = data.getFullYear();
    let dataFormatada = dia + '/' + mes + '/' + ano;

    dataText.innerText = dataFormatada

}