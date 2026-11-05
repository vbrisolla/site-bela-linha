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

document.getElementById('ano').textContent = new Date().getFullYear();
