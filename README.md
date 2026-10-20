# 🛒 Smart Retail — Belajar DOM & Events

**Mata kuliah:** Dasar Teknologi Web  
**Topik:** DOM + Events + Dynamic UI  
**Level:** Pemula 🟢

---

## Apa yang akan kamu buat?

Sebuah **halaman toko sederhana** yang merespons aksimu secara langsung di browser — tanpa reload, tanpa framework, cukup HTML, CSS, dan JavaScript.

Kamu akan belajar tiga hal utama:

1. **DOM** — cara JavaScript "menyentuh" elemen HTML
2. **Event** — cara JavaScript "mendengar" aksi pengguna (klik, ketik, pilih)
3. **State → Render** — cara data berubah lalu tampilan ikut berubah

---

## Cara Menjalankan

1. Buka folder `starter/` di VS Code
2. Klik dua kali `index.html` untuk membukanya di browser
3. Tekan **F12** untuk membuka DevTools → tab **Console**
4. Buka `app.js` dan mulai kerjakan bagian `TODO` dari atas ke bawah
5. Refresh browser setiap kali kamu menyimpan perubahan

> 💡 Folder `solusi/` hanya boleh dibuka **setelah kamu selesai** mengerjakan sendiri.

---

## Aktivitas (4 Langkah)

### ✅ Langkah 1 — Kenali Elemen HTML (DOM Detective)

Sebelum mengubah tampilan, kamu harus bisa **menemukan** elemennya dulu.

**Yang dikerjakan:**
```js
// Pilih elemen menggunakan querySelector
const title = document.querySelector("#mainTitle");
console.log(title); // lihat hasilnya di Console

const cartCount = document.querySelector("#cartCount");
console.log(cartCount);
```

**Coba juga di Console browser (tanpa kode):**
```
document.querySelector("#mainTitle").textContent = "Toko Ku"
```

**Kamu berhasil jika:** teks judul berubah saat kamu jalankan kode di atas.

---

### ✅ Langkah 2 — Buat Tombol Bereaksi (Event Reactor)

Event adalah cara JavaScript "menunggu" aksi dari pengguna.

**Contoh paling sederhana:**
```js
// Saat tombol diklik, jalankan fungsi ini
document.querySelector("#renameBtn").addEventListener("click", function() {
  document.querySelector("#mainTitle").textContent = "Toko Baru!";
});
```

**Yang harus kamu kerjakan:**

**2A.** Saat pengguna mengetik di kolom nama → tampilkan langsung di preview
```js
document.querySelector("#nameInput").addEventListener("input", function(event) {
  document.querySelector("#namePreview").textContent = event.target.value;
});
```

**2B.** Saat pengguna mengetik di kolom pencarian → simpan ke state lalu render ulang
```js
document.querySelector("#searchInput").addEventListener("input", function(event) {
  state.search = event.target.value;
  renderProducts(); // fungsi ini sudah ada di starter
});
```

**2C.** Saat pengguna memilih kategori → filter produk
```js
document.querySelector("#categorySelect").addEventListener("change", function(event) {
  state.category = event.target.value;
  renderProducts();
});
```

**Kamu berhasil jika:** ketik nama → preview berubah, ketik pencarian → kartu produk terfilter.

---

### ✅ Langkah 3 — Tambah ke Keranjang (State & Render)

Ini bagian terpenting. Alurnya selalu sama:

```
Pengguna klik → ubah data (state) → render ulang tampilan
```

**3A.** Buat fungsi `addToCart(id)`
```js
function addToCart(id) {
  // Cari produk berdasarkan id
  const product = products.find(function(p) { return p.id === id; });

  // Cek apakah produk sudah ada di keranjang
  const existing = state.cart.find(function(p) { return p.id === id; });

  if (existing) {
    existing.qty = existing.qty + 1; // sudah ada, tambah qty
  } else {
    state.cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
  }

  renderCart(); // perbarui tampilan keranjang
}
```

**3B.** Buat fungsi `renderCart()`
```js
function renderCart() {
  // Hitung total item
  let totalItem = 0;
  let totalHarga = 0;
  state.cart.forEach(function(item) {
    totalItem = totalItem + item.qty;
    totalHarga = totalHarga + (item.price * item.qty);
  });

  // Perbarui angka di tampilan
  document.querySelector("#cartCount").textContent = totalItem;
  document.querySelector("#itemsKpi").textContent = totalItem;
  document.querySelector("#cartTotal").textContent = "Rp" + totalHarga.toLocaleString("id-ID");
  document.querySelector("#totalKpi").textContent = "Rp" + totalHarga.toLocaleString("id-ID");

  // Aktifkan tombol checkout kalau keranjang tidak kosong
  document.querySelector("#checkoutBtn").disabled = totalItem === 0;
}
```

**3C.** Hubungkan tombol "+ Tambah" ke fungsi `addToCart`

Karena tombol dibuat secara dinamis oleh `renderProducts()`, gunakan **event delegation**:
```js
// Pasang listener di wadahnya (#productGrid), bukan di tombolnya langsung
document.querySelector("#productGrid").addEventListener("click", function(event) {
  const tombol = event.target.closest("button[data-id]");
  if (tombol) {
    addToCart(Number(tombol.dataset.id));
  }
});
```

**Kamu berhasil jika:** klik "+ Tambah" Kopi Susu 2x dan Air Mineral 1x → keranjang menunjukkan **3 item, Rp42.000**.

---

### ✅ Langkah 4 — Mode Gelap (Bonus Simpel)

Gunakan `classList.toggle` untuk mengganti tema:

```js
document.querySelector("#themeBtn").addEventListener("click", function() {
  document.body.classList.toggle("dark");
});
```

**Kamu berhasil jika:** klik tombol Mode Gelap → background berubah gelap, klik lagi → kembali terang.

---

## Alur Berpikir yang Paling Penting

```
🖱️ Pengguna klik/ketik
        ↓
📡 Event listener menangkap
        ↓
📦 Ubah data di state
        ↓
🖼️ Panggil fungsi render
        ↓
✅ Tampilan berubah
```

Ingat ini dan kamu sudah paham 80% dari JavaScript frontend!

---

## Pertanyaan Cek Pemahaman

Jawab singkat sebelum mengumpulkan:

1. Apa fungsi `document.querySelector()`?
2. Apa bedanya event `click` dan event `input`?
3. Kenapa kita perlu memanggil `renderCart()` setelah mengubah `state.cart`?
4. Apa itu event delegation dan kenapa dipakai untuk tombol "+ Tambah"?
5. Apa yang terjadi kalau state sudah berubah tapi fungsi render tidak dipanggil?

---

## Yang Dikumpulkan

Upload ke Moodle dalam format ZIP berisi:
- `index.html`, `styles.css`, `app.js`
- Screenshot Console yang menunjukkan tidak ada error
- Screenshot tampilan keranjang setelah menambah beberapa produk
- Jawaban 5 pertanyaan di atas (tulis di file `jawaban.txt`)

---

> Dibuat untuk praktikum Dasar Teknologi Web — UPH Medan  
> Vanilla HTML, CSS & JavaScript — tanpa library, tanpa backend
