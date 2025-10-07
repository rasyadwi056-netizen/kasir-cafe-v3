function showPage(pageId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  tampilPesanan();
}

function tambahPesanan() {
  const nama = document.getElementById('nama').value;
  const menu = document.getElementById('menu').value;
  const jumlah = parseInt(document.getElementById('jumlah').value);

  if (!nama || !menu || !jumlah) {
    alert('Lengkapi data pesanan!');
    return;
  }

  const harga = getHarga(menu);
  const total = harga * jumlah;

  const pesanan = { nama, menu, jumlah, total };
  const data = JSON.parse(localStorage.getItem('pesanan')) || [];
  data.push(pesanan);
  localStorage.setItem('pesanan', JSON.stringify(data));

  tampilPesanan();
  document.getElementById('nama').value = '';
  document.getElementById('menu').value = '';
  document.getElementById('jumlah').value = '';
}

function getHarga(menu) {
  switch (menu) {
    case 'Kopi Hitam': return 15000;
    case 'Cappuccino': return 20000;
    case 'Latte': return 22000;
    case 'Mocca': return 25000;
    default: return 0;
  }
}

function tampilPesanan() {
  const data = JSON.parse(localStorage.getItem('pesanan')) || [];
  const daftar = document.getElementById('daftarPesanan');
  const riwayatList = document.getElementById('riwayatList');
  const totalHarga = document.getElementById('totalHarga');

  daftar.innerHTML = '';
  riwayatList.innerHTML = '';
  let totalSemua = 0;

  data.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = `${item.nama} - ${item.menu} x${item.jumlah} = Rp${item.total.toLocaleString()}`;
    daftar.appendChild(li);

    const li2 = li.cloneNode(true);
    riwayatList.appendChild(li2);

    totalSemua += item.total;
  });

  totalHarga.textContent = totalSemua > 0 ? `Total: Rp${totalSemua.toLocaleString()}` : '';
}

function hapusRiwayat() {
  if (confirm('Hapus semua riwayat pesanan?')) {
    localStorage.removeItem('pesanan');
    tampilPesanan();
  }
}

window.onload = tampilPesanan;
