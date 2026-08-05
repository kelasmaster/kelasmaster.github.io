import { createData, updateData, deleteData, fetchDataByCompany } from '../firebase/firestore-service.js';
import { confirmDialog } from '../components/confirm-dialog.js';
import { showToast } from '../components/toast.js';
import { validateRequired, validateNumeric } from '../utils/validators.js';
import { formatRupiah } from '../utils/formatters.js';

let productList = [];
let currentUser = null;

export const initProductModule = async (user) => {
  currentUser = user;
  await loadProducts();
  bindProductEvents();
};

const loadProducts = async () => {
  try {
    productList = await fetchDataByCompany('products', currentUser.companyId);
    renderTable(productList);
  } catch (err) {
    showToast('Gagal memuat data produk', 'danger');
  }
};

const renderTable = (data) => {
  const tbody = document.getElementById('product-table-body');
  if (!data.length) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center">Data Produk Kosong</td></tr>`;
    return;
  }

  tbody.innerHTML = data.map(item => `
    <tr>
      <td>${item.name}</td>
      <td>${item.sku || '-'}</td>
      <td>${formatRupiah(item.price)}</td>
      <td><span class="badge status-${item.status.toLowerCase()}">${item.status}</span></td>
      <td>
        <button class="btn-sm btn-edit" data-id="${item.id}">Edit</button>
        <button class="btn-sm btn-delete" data-id="${item.id}">Hapus</button>
      </td>
    </tr>
  `).join('');
};

const bindProductEvents = () => {
  const modal = document.getElementById('product-modal');
  const form = document.getElementById('product-form');

  document.getElementById('btn-add-product').onclick = () => {
    form.reset();
    document.getElementById('product-id').value = '';
    modal.classList.add('active');
  };

  form.onsubmit = async (e) => {
    e.preventDefault();
    const id = document.getElementById('product-id').value;
    const name = document.getElementById('product-name').value.trim();
    const price = document.getElementById('product-price').value;
    const sku = document.getElementById('product-sku').value.trim();

    if (!validateRequired(name)) {
      showToast('Nama Produk Wajib Diisi', 'warning');
      return;
    }
    if (!validateNumeric(price)) {
      showToast('Harga Harus Berupa Angka Valid', 'warning');
      return;
    }

    const payload = { name, price: Number(price), sku };

    try {
      if (id) {
        await updateData('products', id, payload, currentUser);
        showToast('Produk Berhasil Diperbarui', 'success');
      } else {
        await createData('products', payload, currentUser);
        showToast('Produk Berhasil Ditambahkan', 'success');
      }
      modal.classList.remove('active');
      await loadProducts();
    } catch (err) {
      showToast('Terjadi Kesalahan System', 'danger');
    }
  };

  document.getElementById('product-table-body').onclick = (e) => {
    const id = e.target.dataset.id;
    if (e.target.classList.contains('btn-delete')) {
      confirmDialog({
        title: 'Hapus Produk',
        message: 'Apakah Anda yakin ingin menghapus produk ini?',
        onConfirm: async () => {
          await deleteData('products', id);
          showToast('Produk berhasil dihapus', 'success');
          await loadProducts();
        }
      });
    }
  };
};
