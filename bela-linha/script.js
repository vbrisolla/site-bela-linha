// Número do WhatsApp com DDI + DDD, só números
const WHATSAPP = '5512992582542';

const linkWhats = (mensagem) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;

// Botões gerais: a mensagem fica no atributo data-wa
document.querySelectorAll('[data-wa]').forEach((el) => {
  el.href = linkWhats(el.dataset.wa);
});

// Botão de cada peça: monta a mensagem com o nome e o tipo
document.querySelectorAll('.peca').forEach((peca) => {
  const nome = peca.querySelector('h3').textContent.trim();
  const tipo = peca.querySelector('.peca__tipo').textContent.trim().toLowerCase();
  peca.querySelector('a').href = linkWhats(
    `Olá! Vi no site a peça "${nome}" (${tipo}) e quero saber valor e disponibilidade.`
  );
});

// Filtro da vitrine
const filtros = document.querySelectorAll('.filtro');
const pecas = document.querySelectorAll('.peca');

function filtrar(categoria) {
  filtros.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filtro === categoria)));
  pecas.forEach((p) => { p.hidden = categoria !== 'todas' && p.dataset.cat !== categoria; });
}

filtros.forEach((b) => b.addEventListener('click', () => filtrar(b.dataset.filtro)));

// Círculos de categoria: filtram e rolam até a vitrine
document.querySelectorAll('[data-ir-filtro]').forEach((b) => {
  b.addEventListener('click', () => {
    filtrar(b.dataset.irFiltro);
    document.getElementById('pecas').scrollIntoView({ behavior: 'smooth' });
  });
});

// Card da peça: abre ao clicar na foto
const zoom = document.getElementById('zoom');
const zoomArea = zoom.querySelector('.zoom__area');
const zoomImg = zoom.querySelector('.zoom__img');
const zoomTipo = zoom.querySelector('.peca__tipo');
const zoomNome = zoom.querySelector('.zoom__nome');
const zoomTamanho = zoom.querySelector('.zoom__tamanho');
const zoomSuporte = zoom.querySelector('.zoom__suporte');
const zoomLink = zoom.querySelector('.zoom__info a');
let zoomLista = [];
let zoomAtual = 0;

function afastar() {
  zoom.classList.remove('zoom--perto');
  zoomImg.style.width = '';
}

function mostrarPeca(indice) {
  zoomAtual = (indice + zoomLista.length) % zoomLista.length;
  const peca = zoomLista[zoomAtual];
  const foto = peca.querySelector('.peca__foto img');
  afastar();
  zoomImg.src = foto.src;
  zoomImg.alt = foto.alt;
  zoomTipo.textContent = peca.querySelector('.peca__tipo').textContent;
  zoomNome.textContent = peca.querySelector('h3').textContent;
  zoomTamanho.textContent = peca.dataset.tamanho;
  zoomSuporte.hidden = peca.dataset.cat !== 'bastidores';
  zoomLink.href = peca.querySelector('a').href;
}

function abrirZoom(peca) {
  // Só navega pelas peças visíveis no filtro atual
  zoomLista = [...pecas].filter((p) => !p.hidden);
  zoom.classList.toggle('zoom--unica', zoomLista.length < 2);
  mostrarPeca(zoomLista.indexOf(peca));
  zoom.showModal();
}

// Aproxima mantendo sob o cursor (ou dedo) o ponto clicado
function aproximar(e) {
  const foto = zoomImg.getBoundingClientRect();
  const x = (e.clientX - foto.left) / foto.width;
  const y = (e.clientY - foto.top) / foto.height;
  zoomImg.style.width = `${Math.max(zoomImg.naturalWidth, foto.width * 2)}px`;
  zoom.classList.add('zoom--perto');
  const area = zoomArea.getBoundingClientRect();
  zoomArea.scrollLeft = x * zoomImg.offsetWidth - (e.clientX - area.left);
  zoomArea.scrollTop = y * zoomImg.offsetHeight - (e.clientY - area.top);
}

pecas.forEach((peca) => {
  const foto = peca.querySelector('.peca__foto');
  const nome = peca.querySelector('h3').textContent.trim();
  foto.tabIndex = 0;
  foto.setAttribute('role', 'button');
  foto.setAttribute('aria-label', `Ver detalhes de ${nome}`);
  foto.addEventListener('click', () => abrirZoom(peca));
  foto.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      abrirZoom(peca);
    }
  });
});

zoomImg.addEventListener('click', (e) => {
  if (zoom.classList.contains('zoom--perto')) afastar();
  else aproximar(e);
});

// Com mouse, a foto aproximada acompanha o cursor; no celular, é só arrastar
zoomArea.addEventListener('pointermove', (e) => {
  if (e.pointerType !== 'mouse' || !zoom.classList.contains('zoom--perto')) return;
  const area = zoomArea.getBoundingClientRect();
  zoomArea.scrollLeft = ((e.clientX - area.left) / area.width) * (zoomArea.scrollWidth - area.width);
  zoomArea.scrollTop = ((e.clientY - area.top) / area.height) * (zoomArea.scrollHeight - area.height);
});

// Clicar fora do card fecha
zoom.addEventListener('click', (e) => {
  if (e.target === zoom) zoom.close();
});

zoom.querySelector('.zoom__fechar').addEventListener('click', () => zoom.close());
zoom.querySelector('.zoom__ant').addEventListener('click', () => mostrarPeca(zoomAtual - 1));
zoom.querySelector('.zoom__prox').addEventListener('click', () => mostrarPeca(zoomAtual + 1));
zoom.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') mostrarPeca(zoomAtual - 1);
  if (e.key === 'ArrowRight') mostrarPeca(zoomAtual + 1);
});

document.getElementById('ano').textContent = new Date().getFullYear();
