// ===== Elementos da página =====
const botaoMenu = document.getElementById('botaoMenu');
const menuPrincipal = document.getElementById('menuPrincipal');
const botaoTema = document.getElementById('botaoTema');
const botaoTopo = document.getElementById('botaoTopo');
const listaProjetos = document.getElementById('listaProjetos');
const formularioContato = document.getElementById('formularioContato');
const mensagemSucesso = document.getElementById('mensagemSucesso');

// ===== Dados dos projetos (troque pelos seus trabalhos reais) =====
const projetos = [
  {
    titulo: 'Protótipo de app no Figma',
    descricao: 'Telas de um aplicativo de estudos, com fluxo de cadastro e tela inicial.',
    tecnologias: ['Figma'],
    link: '',
    imagem: 'img/projeto-figma.svg',
    alt: 'Ilustração de uma tela de celular em roxo com um botão vermelho'
  },
  {
    titulo: 'Página de apresentação',
    descricao: 'Primeira página do curso, feita só com HTML e CSS e organizada com tags semânticas.',
    tecnologias: ['HTML', 'CSS'],
    link: '',
    imagem: 'img/projeto-html.svg',
    alt: 'Ilustração de dois colchetes de código em roxo separados por uma barra vermelha'
  },
  {
    titulo: 'Exercícios de JavaScript',
    descricao: 'Pequenos programas com funções, condições e eventos, como a saudação deste site.',
    tecnologias: ['JavaScript'],
    link: '',
    imagem: 'img/projeto-js.svg',
    alt: 'Ilustração de chaves de código brancas dentro de um círculo roxo'
  }
];

// Retorna a saudação de acordo com a hora (0 a 23)
function obterSaudacao(hora) {
  if (hora >= 5 && hora < 12) {
    return 'Bom dia';
  } else if (hora >= 12 && hora < 18) {
    return 'Boa tarde';
  }
  return 'Boa noite';
}

// Escreve a saudação no início da página usando a hora atual
function mostrarSaudacao() {
  const saudacao = obterSaudacao(new Date().getHours());
  document.getElementById('saudacao').textContent = saudacao + ', eu sou';
}

// Insere o ano atual no rodapé
function mostrarAno() {
  document.getElementById('anoAtual').textContent = new Date().getFullYear();
}

// Abre ou fecha o menu no celular e atualiza os atributos de acessibilidade
function alternarMenu() {
  const aberto = menuPrincipal.classList.toggle('aberto');
  botaoMenu.setAttribute('aria-expanded', aberto);
  botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
}

// Fecha o menu depois de clicar em um link (celular)
function fecharMenu() {
  if (menuPrincipal.classList.contains('aberto')) {
    alternarMenu();
  }
}

// Atualiza o tema atual e salva a preferência no navegador.
function aplicarTema(escuro) {
  document.body.classList.toggle('tema-escuro', escuro);
  botaoTema.textContent = escuro ? '☀️' : '🌙';
  botaoTema.setAttribute('aria-label', escuro ? 'Ativar tema claro' : 'Ativar tema escuro');

  try {
    localStorage.setItem('temaPortfolio', escuro ? 'escuro' : 'claro');
  } catch (erro) {
    // Sem armazenamento disponível: o tema só vale nesta visita
  }
}

// Alterna entre tema escuro e claro ao clicar no botão.
function alternarTema() {
  const escuro = !document.body.classList.contains('tema-escuro');
  aplicarTema(escuro);
}

// Aplica o tema salvo na última visita ou mantém o claro como padrão.
function carregarTemaSalvo() {
  try {
    const temaSalvo = localStorage.getItem('temaPortfolio');
    const escuro = temaSalvo === 'escuro';
    aplicarTema(escuro);
  } catch (erro) {
    aplicarTema(false);
  }
}

// Cria um card <article> para cada projeto do array
function criarCards() {
  projetos.forEach(function (projeto) {
    const tags = projeto.tecnologias.map(function (tecnologia) {
      return '<li>' + tecnologia + '</li>';
    }).join('');
    const acao = projeto.link
      ? '<a class="card-link" href="' + projeto.link + '">Ver projeto</a>'
      : '<span class="card-link">Em breve</span>';

    listaProjetos.insertAdjacentHTML('beforeend',
      '<article class="card">' +
        '<img src="' + projeto.imagem + '" alt="' + projeto.alt + '" width="600" height="340">' +
        '<div class="card-corpo">' +
          '<h3>' + projeto.titulo + '</h3>' +
          '<p>' + projeto.descricao + '</p>' +
          '<ul class="lista-tags">' + tags + '</ul>' +
          acao +
        '</div>' +
      '</article>');
  });
}

// Mostra (ou limpa) o erro abaixo de um campo
function mostrarErro(idCampo, idErro, texto) {
  document.getElementById(idErro).textContent = texto;
  document.getElementById(idCampo).setAttribute('aria-invalid', texto ? 'true' : 'false');
}

// Valida o formulário: retorna true se tudo estiver certo e false se houver erro
function validarFormulario() {
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();
  const consentimento = document.getElementById('consentimento').checked;

  let erroNome = '';
  let erroEmail = '';
  let erroMensagem = '';
  const erroConsentimento = consentimento ? '' : 'Marque o consentimento para continuar.';

  if (nome === '') {
    erroNome = 'Preencha seu nome.';
  }

  if (email === '') {
    erroEmail = 'Preencha seu e-mail.';
  } else if (!email.includes('@') || !email.includes('.')) {
    erroEmail = 'Use um e-mail válido, como nome@exemplo.com.';
  }

  if (mensagem === '') {
    erroMensagem = 'Escreva uma mensagem.';
  } else if (mensagem.length < 20) {
    erroMensagem = 'A mensagem precisa ter 20 caracteres ou mais (agora tem ' + mensagem.length + ').';
  }

  mostrarErro('nome', 'erroNome', erroNome);
  mostrarErro('email', 'erroEmail', erroEmail);
  mostrarErro('mensagem', 'erroMensagem', erroMensagem);
  mostrarErro('consentimento', 'erroConsentimento', erroConsentimento);

  return !(erroNome || erroEmail || erroMensagem || erroConsentimento);
}

// Trata o envio: não envia de verdade, valida e mostra o resultado
function tratarEnvio(evento) {
  evento.preventDefault();
  mensagemSucesso.textContent = '';

  if (validarFormulario()) {
    mensagemSucesso.textContent = 'Mensagem recebida! Obrigado pelo contato, respondo assim que possível.';
    formularioContato.reset();
  }
}

// Mostra o botão "voltar ao topo" só depois de rolar a página
function controlarBotaoTopo() {
  botaoTopo.classList.toggle('visivel', window.scrollY > 400);
}

// ===== Início =====
carregarTemaSalvo();
mostrarSaudacao();
mostrarAno();
criarCards();

botaoMenu.addEventListener('click', alternarMenu);
menuPrincipal.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', fecharMenu);
});
botaoTema.addEventListener('click', alternarTema);
formularioContato.addEventListener('submit', tratarEnvio);
window.addEventListener('scroll', controlarBotaoTopo);