const botaoMenu = document.getElementById('botaoMenu');
const menuPrincipal = document.getElementById('menuPrincipal');
const botaoTema = document.getElementById('botaoTema');
const botaoTopo = document.getElementById('botaoTopo');
const listaProjetos = document.getElementById('listaProjetos');
const formularioContato = document.getElementById('formularioContato');
const mensagemSucesso = document.getElementById('mensagemSucesso');
const modalProjeto = document.getElementById('modalProjeto');
const modalImagem = document.getElementById('modalImagem');
const modalTitulo = document.getElementById('modalTitulo');
const modalDescricao = document.getElementById('modalDescricao');
const fecharModal = document.getElementById('fecharModal');


const projetos = [
  {
    titulo: 'Protótipo de app no Figma',
    descricao: 'Telas de um aplicativo de estudos, com fluxo de cadastro e tela inicial.',
    tecnologias: ['Figma'],
    link: '',
    imagem: 'projeto-figma-exemplo.svg',
    alt: 'Ilustração mais detalhada de um protótipo de app em Figma com telas de cadastro e painel',
    exemplo: 'projeto-figma-exemplo.svg'
  },
  {
    titulo: 'Página de apresentação',
    descricao: 'Primeira página do curso, feita só com HTML e CSS e organizada com tags semânticas.',
    tecnologias: ['HTML', 'CSS'],
    link: '',
    imagem: 'projeto-html-exemplo.svg',
    alt: 'Ilustração mais detalhada de uma landing page com cabeçalho, cards e botões em estilo responsivo',
    exemplo: 'projeto-html-exemplo.svg'
  },
  {
    titulo: 'Exercícios de JavaScript',
    descricao: 'Pequenos programas com funções, condições e eventos, como a saudação deste site.',
    tecnologias: ['JavaScript'],
    link: '',
    imagem: 'projeto-js-exemplo.svg',
    alt: 'Ilustração mais detalhada de uma interface de exercícios em JavaScript com editor e botões interativos',
    exemplo: 'projeto-js-exemplo.svg'
  }
];


function obterSaudacao(hora) {
  if (hora >= 5 && hora < 12) {
    return 'Bom dia';
  } else if (hora >= 12 && hora < 18) {
    return 'Boa tarde';
  }
  return 'Boa noite';
}

function mostrarSaudacao() {
  const saudacao = obterSaudacao(new Date().getHours());
  document.getElementById('saudacao').textContent = saudacao + ', eu sou';
}


function mostrarAno() {
  document.getElementById('anoAtual').textContent = new Date().getFullYear();
}


function alternarMenu() {
  const aberto = menuPrincipal.classList.toggle('aberto');
  botaoMenu.setAttribute('aria-expanded', aberto);
  botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
}

function fecharMenu() {
  if (menuPrincipal.classList.contains('aberto')) {
    alternarMenu();
  }
}


function aplicarTema(escuro) {
  document.body.classList.toggle('tema-escuro', escuro);
  botaoTema.textContent = escuro ? '☀️' : '🌙';
  botaoTema.setAttribute('aria-label', escuro ? 'Ativar tema claro' : 'Ativar tema escuro');

  try {
    localStorage.setItem('temaPortfolio', escuro ? 'escuro' : 'claro');
  } catch (erro) {
    
  }
}


function alternarTema() {
  const escuro = !document.body.classList.contains('tema-escuro');
  aplicarTema(escuro);
}


function carregarTemaSalvo() {
  try {
    const temaSalvo = localStorage.getItem('temaPortfolio');
    const escuro = temaSalvo === 'escuro';
    aplicarTema(escuro);
  } catch (erro) {
    aplicarTema(false);
  }
}


function abrirProjeto(projeto) {
  modalImagem.src = projeto.exemplo;
  modalImagem.alt = projeto.alt;
  modalTitulo.textContent = projeto.titulo;
  modalDescricao.textContent = projeto.descricao;
  modalProjeto.classList.add('ativo');
  modalProjeto.setAttribute('aria-hidden', 'false');
}

function fecharProjetoModal() {
  modalProjeto.classList.remove('ativo');
  modalProjeto.setAttribute('aria-hidden', 'true');
}

function criarCards() {
  projetos.forEach(function (projeto) {
    const tags = projeto.tecnologias.map(function (tecnologia) {
      return '<li>' + tecnologia + '</li>';
    }).join('');
    const acao = projeto.link
      ? '<a class="card-link" href="' + projeto.link + '">Ver projeto</a>'
      : '<span class="card-link">Abrir exemplo</span>';

    const card = document.createElement('article');
    card.className = 'card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Abrir projeto ' + projeto.titulo);
    card.innerHTML =
      '<img src="' + projeto.imagem + '" alt="' + projeto.alt + '" width="600" height="340">' +
      '<div class="card-corpo">' +
        '<h3>' + projeto.titulo + '</h3>' +
        '<p>' + projeto.descricao + '</p>' +
        '<ul class="lista-tags">' + tags + '</ul>' +
        acao +
      '</div>';

    card.addEventListener('click', function () {
      abrirProjeto(projeto);
    });

    card.addEventListener('keydown', function (evento) {
      if (evento.key === 'Enter' || evento.key === ' ') {
        evento.preventDefault();
        abrirProjeto(projeto);
      }
    });

    listaProjetos.appendChild(card);
  });
}

// Mostra (ou limpa) o erro abaixo de um campo
function mostrarErro(idCampo, idErro, texto) {
  document.getElementById(idErro).textContent = texto;
  document.getElementById(idCampo).setAttribute('aria-invalid', texto ? 'true' : 'false');
}


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


function tratarEnvio(evento) {
  evento.preventDefault();
  mensagemSucesso.textContent = '';

  if (validarFormulario()) {
    mensagemSucesso.textContent = 'Mensagem recebida! Obrigado pelo contato, respondo assim que possível.';
    formularioContato.reset();
  }
}


function controlarBotaoTopo() {
  botaoTopo.classList.toggle('visivel', window.scrollY > 400);
}


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
fecharModal.addEventListener('click', fecharProjetoModal);
modalProjeto.addEventListener('click', function (evento) {
  if (evento.target === modalProjeto) {
    fecharProjetoModal();
  }
});
document.addEventListener('keydown', function (evento) {
  if (evento.key === 'Escape' && modalProjeto.classList.contains('ativo')) {
    fecharProjetoModal();
  }
});
window.addEventListener('scroll', controlarBotaoTopo);