const axios = require('axios');
const fs = require('fs');


const arquivoEntrada = 'cnpjs.txt'; 
const arquivoSaida = 'dados_cnpj.txt';


async function buscarCNPJ(cnpj) {
  const url = `https://receitaws.com.br/v1/cnpj/${cnpj}`;
  
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar o CNPJ ${cnpj}:`, error.message);
    return null;
  }
}


function salvarTXT(dados) {
  const socios = dados.qsa
    ? dados.qsa.map(socio => `${socio.nome} - ${socio.qual}`).join('; ')
    : 'Não informado';

  const dadosFormatados = `
===============================
CNPJ: ${dados.cnpj}
Nome: ${dados.nome}
Fantasia: ${dados.fantasia || 'Não informado'}
Atividade Principal: ${dados.atividade_principal.map(a => a.text).join(', ')}
Situação: ${dados.situacao}
Abertura: ${dados.abertura}
Telefone: ${dados.telefone}
Email: ${dados.email || 'Não informado'}
Endereço: ${dados.logradouro}, ${dados.numero}, ${dados.bairro} - ${dados.municipio}/${dados.uf}
Capital Social: R$ ${dados.capital_social || 'Não informado'}
Quadro de Sócios: ${socios}
===============================\n`;

  fs.appendFileSync(arquivoSaida, dadosFormatados, 'utf8');
  console.log(`Dados do CNPJ ${dados.cnpj} salvos no arquivo.`);
}


async function processarCNPJs() {
  if (!fs.existsSync(arquivoEntrada)) {
    console.log(`Arquivo ${arquivoEntrada} não encontrado.`);
    return;
  }

  const cnpjs = fs.readFileSync(arquivoEntrada, 'utf8')
    .split('\n')
    .map(cnpj => cnpj.replace(/\D/g, '').trim())
    .filter(cnpj => cnpj.length === 14);

  if (cnpjs.length === 0) {
    console.log('Nenhum CNPJ válido encontrado no arquivo.');
    return;
  }

  console.log(`Iniciando busca para ${cnpjs.length} CNPJs...`);

  for (const cnpj of cnpjs) {
    console.log(`Buscando informações do CNPJ: ${cnpj}...`);
    const dadosCNPJ = await buscarCNPJ(cnpj);

    if (dadosCNPJ && dadosCNPJ.status === 'OK') {
      salvarTXT(dadosCNPJ);
    } else {
      console.log(`Não foi possível encontrar dados para o CNPJ: ${cnpj}`);
    }

    console.log('Aguardando 2 segundos antes da próxima busca...\n');
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('Processamento concluído.');
}


processarCNPJs();
