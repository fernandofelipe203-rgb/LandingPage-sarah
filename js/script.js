const WHATS = "5511986911037";

// Header ao rolar
const header = document.getElementById("topo");
window.addEventListener("scroll", () => header.classList.toggle("rolou", window.scrollY > 40));

// Menu mobile
const menu = document.getElementById("menu");
document.getElementById("hamburguer").addEventListener("click", () => menu.classList.toggle("aberto"));
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => menu.classList.remove("aberto")));

// Animação ao rolar
const io = new IntersectionObserver((entradas) => {
  entradas.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visivel"); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Filtro de serviços
const abas = document.querySelectorAll(".aba");
const cards = document.querySelectorAll(".card-servico");
abas.forEach(aba => aba.addEventListener("click", () => {
  abas.forEach(a => a.classList.remove("ativa"));
  aba.classList.add("ativa");
  const f = aba.dataset.filtro;
  cards.forEach(c => c.classList.toggle("some", f !== "todos" && c.dataset.cat !== f));
}));

// Clicar no serviço abre o WhatsApp já com o nome dele
cards.forEach(card => card.addEventListener("click", (e) => {
  e.preventDefault();
  const msg = `Olá Sarah! Vi seu site e gostaria de agendar: ${card.dataset.nome}.`;
  window.open(`https://wa.me/${WHATS}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
}));

// Link ativo no menu
const secoes = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll("nav a");
const ioMenu = new IntersectionObserver((entradas) => {
  entradas.forEach(e => {
    if (e.isIntersecting) links.forEach(l => l.classList.toggle("ativo", l.getAttribute("href") === "#" + e.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
secoes.forEach(s => ioMenu.observe(s));

// Lightbox da galeria
const lb = document.getElementById("lightbox");
const lbImg = lb.querySelector("img");
document.querySelectorAll(".galeria-trabalhos img").forEach(img => img.addEventListener("click", () => {
  lbImg.src = img.src; lb.classList.add("aberto");
}));
lb.addEventListener("click", () => lb.classList.remove("aberto"));
document.addEventListener("keydown", e => { if (e.key === "Escape") lb.classList.remove("aberto"); });
