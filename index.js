// Crie uma instância da fila
let minhaFila = new FilaCircular(5);

// Função para adicionar um elemento à fila
function adicionarElemento() {
  const nome = document.getElementById("txtnovoNome").value;
  const cpf = document.getElementById("txtnovoCpf").value;
  const data = obterDataAtual();
  const hora = obterHoraAtual();

  if (cpf === "" || nome === "") {
    alert("Preencha todos os campos!");
  } else {
    const novoAtendimento = new Atendimento(nome, cpf, data, hora);
    if (minhaFila.enqueue(novoAtendimento)) {
    } else {
      alert("Fila cheia!");
    }
  }
  atualizarFila();
  limparCampos();
}
//--------------------------------------------------------------------------------------------
// Função para remover o primeiro elemento da fila
function removerElemento() {
  if (minhaFila.isEmpty()) {
    alert("Fila está vazia!")
  } else {
    let pessoaAtendida = minhaFila.dequeue();
    mostrarMensagemRemocao(pessoaAtendida);

  }

  atualizarFila();
  limparCampos();
}
//--------------------------------------------------------------------------------
function buscarCpf() {

  let cpfEncontrado = false;
  let posicao = 1;
  let cpfBuscado = document.getElementById("txtnovoCpf").value;

  for (let pessoa of minhaFila) {
    if (pessoa.cpf === cpfBuscado) {
      cpfEncontrado = true;
      break;
    }
    posicao++;
  }

  if (cpfEncontrado) {
    alert("CPF encontrado na fila! Posição: " + posicao);
  } else {
    alert("CPF não encontrado.");
  }

  limparCampos();
}
//--------------------------------------------------------------------------------------------
function mostrarMensagemRemocao(pessoaAtendida) {
  let horarioAtend = obterHoraAtual();
  let tempoEspera = calcularDiferencaHoras(pessoaAtendida.hora, horarioAtend);
  let mensagemRem = document.getElementById("mensagem-remocao");

  mensagemRem.innerHTML = `Chamando para ser atendido(a): ${pessoaAtendida.nome}
  às ${pessoaAtendida.hora}, está sendo atendido(a) às ${horarioAtend}. 
  Tempo de espera: ${tempoEspera}.`;

  if (mensagemRem.innerHTML.trim() !== "") {
    mensagemRem.style.display = "block";
  } else {
    mensagemRem.style.display = "none";
  }
}
//--------------------------------------------------------------------------------------------
// Função para atualizar a exibição da fila
function atualizarFila() {
  const listaFila = document.getElementById("listFila");
  listaFila.innerHTML = "";
  if (minhaFila.qtd === 0) {
    document.getElementById("lblPessoasFila").textContent = "Fila vazia!";
  } else {
    document.getElementById("lblPessoasFila").textContent = "Pessoas na fila: ";
  }
  document.getElementById("listFila").innerHTML = minhaFila.toString();

}
//--------------------------------------------------------------------------------------------
function limparCampos() {
  document.getElementById("txtnovoNome").value = "";
  document.getElementById("txtnovoCpf").value = "";
  document.getElementById("txtnovoNome").focus();
}
//--------------------------------------------------------------------------------------------
// funcao data
function obterDataAtual() {
  let dataAtual = new Date();
  let dia = dataAtual.getDate();
  let mes = dataAtual.getMonth() + 1; // Adiciona 1 porque o mês inicia do zero
  let ano = dataAtual.getFullYear();
  // Formata a data como "dd/mm/aaaa"
  let dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
  return dataFormatada;
}
//--------------------------------------------------------------------------------------------
function obterHoraAtual() {
  const data = new Date();
  const hora = data.getHours().toString().padStart(2, '0');
  const minuto = data.getMinutes().toString().padStart(2, '0');
  const segundo = data.getSeconds().toString().padStart(2, '0');
  return `${hora}:${minuto}:${segundo}`;
}
//--------------------------------------------------------------------------------------------
function calcularDiferencaHoras(hora1, hora2) {
  const [h1, m1, s1] = hora1.split(':').map(Number);
  const [h2, m2, s2] = hora2.split(':').map(Number);

  const diferencaSegundos = (h2 * 3600 + m2 * 60 + s2) - (h1 * 3600 + m1 * 60 + s1);

  const horas = Math.floor(diferencaSegundos / 3600);
  const minutos = Math.floor((diferencaSegundos % 3600) / 60);
  const segundos = diferencaSegundos % 60;

  return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}