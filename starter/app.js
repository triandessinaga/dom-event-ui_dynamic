// STARTER • PERTEMUAN 9 • DOM + EVENTS + DYNAMIC UI
// Buka index.html di browser. Tekan F12 → Console untuk cek error.
// MISI 1: Seleksi DOM: document.querySelector(...) / getElementById(...)
// MISI 2: addEventListener: click, input, change, submit (opsional)
// MISI 3: state -> render UI: cart[], total, filter produk.
// MISI 4: debug & fix. Bandingkan hasil Anda dengan versi solusi SETELAH selesai.
"use strict";
const products = [
  { id: 1, name: "Kopi Susu", category: "minuman", price: 18000, emoji: "☕" },
  { id: 2, name: "Roti Cokelat", category: "makanan", price: 12000, emoji: "🥐" },
  { id: 3, name: "Air Mineral", category: "minuman", price: 6000, emoji: "💧" },
  { id: 4, name: "Tas Belanja", category: "alat", price: 9000, emoji: "🛍️" },
];
const state = { cart: [], search: "", category: "all", darkMode: false };
const rupiah = (n) => "Rp" + n.toLocaleString("id-ID");

// MISI 1A: Ubah tulisan judul melalui DOM (gunakan id=mainTitle).
const title = document.querySelector("#mainTitle");
console.log("DOM Detective:", title);

// MISI 1B: Pilih 5 DOM element lain dan console.log masing-masing.
// TODO: const productGrid = document.querySelector(...);

// Starter renders cards agar mahasiswa bisa melihat tampilan awal.
const grid = document.querySelector("#productGrid");
function renderProducts() {
  grid.replaceChildren();
  const matched = products.filter((p) => p.name.toLowerCase().includes(state.search.toLowerCase()) && (state.category === "all" || p.category === state.category));
  matched.forEach((p) => {
    const card = document.createElement("article");
    card.className = "product";
    const icon = document.createElement("div");
    icon.className = "product-icon";
    icon.textContent = p.emoji;
    const name = document.createElement("h3");
    name.textContent = p.name;
    const cat = document.createElement("div");
    cat.className = "cat";
    cat.textContent = p.category;
    const foot = document.createElement("div");
    foot.className = "product-foot";
    const price = document.createElement("strong");
    price.textContent = rupiah(p.price);
    const btn = document.createElement("button");
    btn.className = "small-btn";
    btn.textContent = "+ Tambah";
    btn.dataset.id = p.id;
    foot.append(price, btn);
    card.append(icon, name, cat, foot);
    grid.append(card);
  });
  document.querySelector("#emptyState").hidden = matched.length !== 0;
}
renderProducts();

// MISI 2A: klik tombol + Tambah dengan event delegation pada #productGrid.
// TODO: grid.addEventListener("click", (event) => { ... });

// MISI 2B: tampilkan preview nama kasir (event 'input') pada #namePreview.
// TODO:

// MISI 2C: cari produk dan pilih kategori (event input/change).
// TODO: ubah state.search / state.category lalu renderProducts().

// MISI 3A: buat addToCart(id). Tambahkan ke state.cart, tambah qty bila sudah ada.
// TODO:

// MISI 3B: buat renderCart(). Update #cartCount, #itemsKpi, #cartTotal, #totalKpi,
// #cartList dan atribut disabled #checkoutBtn sesuai kondisi cart.
// TODO:

// MISI 3C: mode gelap menggunakan classList.toggle('dark') pada body.
// TODO:

// MISI 4: buat tombol Ubah Judul, Reset Demo, dan Checkout sederhana.
// TODO: gunakan #renameBtn, #resetBtn, #checkoutBtn dan #checkoutModal.

// BONUS: Validasi bayar >= total dan tampilkan error, gunakan preventDefault bila memakai form.
console.info("Starter siap. Selesaikan TODO sesuai Panduan_Hands_On.md.");
