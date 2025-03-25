const axios = require('axios');
const readline = require('readline');
const XLSX = require('xlsx');

// Configuração do readline para receber o CNPJ
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Função para buscar o CNPJ na API
async function buscarCNPJ(cnpj) {
  const url = `https://receitaws.com.br/v1/cnpj/${cnpj}`;
  
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar o CNPJ:', error);
    return null;
  }
}

// Função para salvar os dados no formato XLSX
function salvarXLSX(dados) {
  // Organiza os dados em formato adequado para as colunas
  const ws_data = [];
  
  // 1ª Linha com os títulos dos campos
  const campos = Object.keys(dados);
  ws_data.push(campos);

  // 2ª Linha com os valores correspondentes a cada campo
  const valores = campos.map(campo => {
    if (typeof dados[campo] === 'object' && !Array.isArray(dados[campo])) {
      return JSON.stringify(dados[campo]); // Caso o campo seja um objeto
    } else if (Array.isArray(dados[campo])) {
      return dados[campo].map(item => item.text).join(', '); // Caso o campo seja uma lista
    }
    return dados[campo]; // Caso o campo seja simples
  });

  ws_data.push(valores);

  // Cria a planilha
  const ws = XLSX.utils.aoa_to_sheet(ws_data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Dados CNPJ');

  // Salva o arquivo XLSX
  XLSX.writeFile(wb, 'dados_cnpj.xlsx');
  console.log('Arquivo XLSX gerado com sucesso!');
}

// Função principal
async function main() {
  rl.question('Digite o CNPJ (somente números): ', async (cnpj) => {
    const cnpjFormatado = cnpj.replace(/\D/g, '');  // Remove qualquer caractere não numérico

    if (cnpjFormatado.length !== 14) {
      console.log('CNPJ inválido! Deve ter 14 dígitos.');
      rl.close();
      return;
    }

    console.log('Buscando informações do CNPJ...');
    const dadosCNPJ = await buscarCNPJ(cnpjFormatado);

    if (dadosCNPJ && dadosCNPJ.status === 'OK') {
      console.log('Dados encontrados. Gerando arquivo XLSX...');
      salvarXLSX(dadosCNPJ);
    } else {
      console.log('Não foi possível encontrar dados para este CNPJ.');
    }

    rl.close();
  });
}

main();
