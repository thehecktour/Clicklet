const fs = require('fs');
const xlsx = require('xlsx');


const arquivoEntrada = 'dados_cnpj.txt';
const arquivoSaida = 'resultado.xlsx';


function processarArquivoTXT(caminho) {
    const conteudo = fs.readFileSync(caminho, 'utf8');
    const blocos = conteudo.split('===============================\n').filter(bloco => bloco.trim());

    const dados = blocos.map(bloco => {
        const extrairCampo = (chave) => {
            const regex = new RegExp(`${chave}: (.*)`, 'i');
            const match = bloco.match(regex);
            return match ? match[1].trim() : '';
        };

        return {
            CNPJ: extrairCampo('CNPJ'),
            Nome: extrairCampo('Nome'),
            Fantasia: extrairCampo('Fantasia'),
            'Atividade Principal': extrairCampo('Atividade Principal'),
            Situação: extrairCampo('Situação'),
            Abertura: extrairCampo('Abertura'),
            Telefone: extrairCampo('Telefone'),
            Email: extrairCampo('Email'),
            Endereço: extrairCampo('Endereço'),
            'Capital Social': extrairCampo('Capital Social'),
            'Quadro de Sócios': extrairCampo('Quadro de Sócios')
        };
    });

    return dados;
}


function salvarEmExcel(dados, caminhoSaida) {
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(dados);

    xlsx.utils.book_append_sheet(workbook, worksheet, 'CNPJs');
    xlsx.writeFile(workbook, caminhoSaida);
    console.log(`Arquivo Excel salvo como ${caminhoSaida}`);
}


const dadosExtraidos = processarArquivoTXT(arquivoEntrada);
salvarEmExcel(dadosExtraidos, arquivoSaida);
