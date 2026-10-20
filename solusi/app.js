// SMART RETAIL • PERTEMUAN 9 • DOM + EVENTS + DYNAMIC UI
// Vanilla JS. Fokus: selector, event listener, state, render, debug.
"use strict";
const products = [
  { id: 1, name: "Kopi Susu", category: "minuman", price: 18000, emoji: "☕" },
  { id: 2, name: "Roti Cokelat", category: "makanan", price: 12000, emoji: "🥐" },
  { id: 3, name: "Air Mineral", category: "minuman", price: 6000, emoji: "💧" },
  { id: 4, name: "Tas Belanja", category: "alat", price: 9000, emoji: "🛍️" },
];

// MISI 1 • DOM DETECTIVE: pilih elemen sesuai id pada index.html.
const $ = (selector) => document.querySelector(selector);
const els = {
  productGrid: $("#productGrid"),
  productCount: $("#productCount"),
  searchInput: $("#searchInput"),
  categorySelect: $("#categorySelect"),
  cartCount: $("#cartCount"),
  itemsKpi: $("#itemsKpi"),
  totalKpi: $("#totalKpi"),
  cartList: $("#cartList"),
  cartTotal: $("#cartTotal"),
  cartBadge: $("#cartBadge"),
  toast: $("#toast"),
  emptyState: $("#emptyState"),
  nameInput: $("#nameInput"),
  namePreview: $("#namePreview"),
  mainTitle: $("#mainTitle"),
  renameBtn: $("#renameBtn"),
  themeBtn: $("#themeBtn"),
  cartBtn: $("#cartBtn"),
  checkoutBtn: $("#checkoutBtn"),
  modal: $("#checkoutModal"),
  closeModalBtn: $("#closeModalBtn"),
  modalTotal: $("#modalTotal"),
  paymentInput: $("#paymentInput"),
  paymentError: $("#paymentError"),
  payBtn: $("#payBtn"),
  resetBtn: $("#resetBtn"),
};

// MISI 3 • STATE MASTER: sumber data; jangan menyimpan cart count terpisah.
const state = { cart: [], search: "", category: "all", darkMode: false, titleChanged: false };
const rupiah = (n) => "Rp" + n.toLocaleString("id-ID");
const itemCount = () => state.cart.reduce((sum, item) => sum + item.qty, 0);
const cartTotal = () => state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
let toastTimer;
function showToast(message) {
  els.toast.textContent = message;
  els.toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (els.toast.hidden = true), 2400);
}
function renderProducts() {
  const keyword = state.search.trim().toLowerCase();
  const visible = products.filter((p) => p.name.toLowerCase().includes(keyword) && (state.category === "all" || p.category === state.category));
  // text static berasal dari data lokal internal; DOM node dibuat tanpa innerHTML dari input user.
  els.productGrid.replaceChildren();
  visible.forEach((p) => {
    const card = document.createElement("article");
    card.className = "product";
    const emoji = document.createElement("div");
    emoji.className = "product-icon";
    emoji.textContent = p.emoji;
    const title = document.createElement("h3");
    title.textContent = p.name;
    const category = document.createElement("div");
    category.className = "cat";
    category.textContent = p.category;
    const foot = document.createElement("div");
    foot.className = "product-foot";
    const price = document.createElement("strong");
    price.textContent = rupiah(p.price);
    const btn = document.createElement("button");
    btn.className = "small-btn";
    btn.textContent = "+ Tambah";
    btn.dataset.id = String(p.id);
    btn.setAttribute("aria-label", "Tambah " + p.name + " ke keranjang");
    foot.append(price, btn);
    card.append(emoji, title, category, foot);
    els.productGrid.append(card);
  });
  els.emptyState.hidden = visible.length !== 0;
  els.productCount.textContent = products.length;
}
function renderCart() {
  const count = itemCount(),
    total = cartTotal();
  els.cartCount.textContent = count;
  els.itemsKpi.textContent = count;
  els.cartBadge.textContent = count + " item";
  els.cartTotal.textContent = rupiah(total);
  els.totalKpi.textContent = rupiah(total);
  els.checkoutBtn.disabled = count === 0;
  els.cartList.replaceChildren();
  if (count === 0) {
    const p = document.createElement("p");
    p.className = "muted";
    p.textContent = "Keranjang masih kosong.";
    els.cartList.append(p);
    return;
  }
  state.cart.forEach((item) => {
    const row = document.createElement("div");
    row.className = "cart-row";
    const name = document.createElement("div");
    name.textContent = item.name;
    const subtitle = document.createElement("small");
    subtitle.textContent = rupiah(item.price * item.qty);
    name.append(document.createElement("br"), subtitle);
    const controls = document.createElement("div");
    controls.className = "qty";
    const minus = document.createElement("button");
    minus.textContent = "−";
    minus.dataset.action = "minus";
    minus.dataset.id = String(item.id);
    minus.setAttribute("aria-label", "Kurangi " + item.name);
    const number = document.createElement("span");
    number.textContent = item.qty;
    const plus = document.createElement("button");
    plus.textContent = "+";
    plus.dataset.action = "plus";
    plus.dataset.id = String(item.id);
    plus.setAttribute("aria-label", "Tambah " + item.name);
    controls.append(minus, number, plus);
    row.append(name, controls);
    els.cartList.append(row);
  });
}
function addToCart(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;
  const existing = state.cart.find((p) => p.id === id);
  if (existing) existing.qty++;
  else state.cart.push({ ...product, qty: 1 });
  renderCart();
  showToast(product.name + " ditambahkan ke keranjang");
  console.log("[EVENT] addToCart", { id, cartItems: itemCount() });
}
function changeQuantity(id, delta) {
  const item = state.cart.find((p) => p.id === id);
  if (!item) return;
  item.qty += delta;
  state.cart = state.cart.filter((p) => p.qty > 0);
  renderCart();
}
function openModal() {
  if (itemCount() === 0) return;
  els.modalTotal.textContent = rupiah(cartTotal());
  els.paymentInput.value = "";
  els.paymentError.textContent = "";
  els.modal.hidden = false;
  els.paymentInput.focus();
}
function closeModal() {
  els.modal.hidden = true;
  els.checkoutBtn.focus();
}

// MISI 2 • EVENT REACTOR: event listeners.
// Delegation: tombol produk dibuat dinamis saat render.
els.productGrid.addEventListener("click", (event) => {
  const btn = event.target.closest("button[data-id]");
  if (btn) addToCart(Number(btn.dataset.id));
});
els.cartList.addEventListener("click", (event) => {
  const btn = event.target.closest("button[data-action]");
  if (!btn) return;
  changeQuantity(Number(btn.dataset.id), btn.dataset.action === "plus" ? 1 : -1);
});
els.searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  renderProducts();
});
els.categorySelect.addEventListener("change", (event) => {
  state.category = event.target.value;
  renderProducts();
});
els.nameInput.addEventListener("input", (event) => {
  els.namePreview.textContent = event.target.value.trim() || "Kasir!";
});
els.renameBtn.addEventListener("click", () => {
  state.titleChanged = !state.titleChanged;
  els.mainTitle.textContent = state.titleChanged ? "Toko Siap Melayani Pelanggan!" : "Selamatkan Toko dari Kekacauan!";
  els.mainTitle.classList.toggle("green", state.titleChanged);
});
els.themeBtn.addEventListener("click", () => {
  state.darkMode = !state.darkMode;
  document.body.classList.toggle("dark", state.darkMode);
  els.themeBtn.textContent = state.darkMode ? "☀️ Mode terang" : "🌙 Mode gelap";
  els.themeBtn.setAttribute("aria-pressed", String(state.darkMode));
});
els.cartBtn.addEventListener("click", () => {
  els.cartList.scrollIntoView({ behavior: "smooth", block: "center" });
});
els.checkoutBtn.addEventListener("click", openModal);
els.closeModalBtn.addEventListener("click", closeModal);
els.modal.addEventListener("click", (e) => {
  if (e.target === els.modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !els.modal.hidden) closeModal();
});
els.payBtn.addEventListener("click", () => {
  const amount = Number(els.paymentInput.value),
    total = cartTotal();
  if (!Number.isFinite(amount) || els.paymentInput.value.trim() === "" || amount < total) {
    els.paymentError.textContent = "Pembayaran tidak boleh kosong dan harus minimal " + rupiah(total) + ".";
    return;
  }
  const change = amount - total;
  state.cart = [];
  renderCart();
  closeModal();
  showToast("Transaksi sukses! Kembalian " + rupiah(change));
  console.log("[CHECKOUT]", { amount, total, change });
});
els.resetBtn.addEventListener("click", () => {
  state.cart = [];
  state.search = "";
  state.category = "all";
  state.titleChanged = false;
  state.darkMode = false;
  els.searchInput.value = "";
  els.categorySelect.value = "all";
  els.nameInput.value = "";
  els.namePreview.textContent = "Kasir!";
  els.mainTitle.textContent = "Selamatkan Toko dari Kekacauan!";
  els.mainTitle.classList.remove("green");
  document.body.classList.remove("dark");
  els.themeBtn.textContent = "🌙 Mode gelap";
  els.themeBtn.setAttribute("aria-pressed", "false");
  renderProducts();
  renderCart();
  showToast("Demo berhasil di-reset");
});
renderProducts();
renderCart();
console.info("Smart Retail siap. Buka DevTools → Console dan Elements untuk DOM Lab.");
