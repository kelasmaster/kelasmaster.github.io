export const confirmDialog = ({ title, message, onConfirm }) => {
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop active';
  
  backdrop.innerHTML = `
    <div class="modal-card dialog-card">
      <h3 class="dialog-title">${title}</h3>
      <p class="dialog-message">${message}</p>
      <div class="dialog-actions">
        <button class="btn btn-secondary" id="btn-cancel">Batal</button>
        <button class="btn btn-danger" id="btn-confirm">Hapus</button>
      </div>
    </div>
  `;

  document.body.appendChild(backdrop);

  backdrop.querySelector('#btn-cancel').onclick = () => backdrop.remove();
  backdrop.querySelector('#btn-confirm').onclick = async () => {
    await onConfirm();
    backdrop.remove();
  };
};
