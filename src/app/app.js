document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.content');
  const actionCards = document.querySelectorAll('.action-card');
  const sellCard = document.getElementById('sellCard');
  const evolveCard = document.getElementById('evolveCard');
  const buyCard = document.getElementById('buyCard');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs and contents
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      // Add active class to clicked tab and corresponding content
      tab.classList.add('active');
      const tabId = tab.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });

    card.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', JSON.stringify({
        name: card.dataset.cardName,
        quantity: card.dataset.quantity
      }));
    });
  });

  actionCards.forEach(card => {
    card.addEventListener('dragover', (e) => {
      e.preventDefault();
      card.classList.add('dragover');
    });

    card.addEventListener('dragleave', () => {
      card.classList.remove('dragover');
    });
  });

  sellCard.addEventListener('drop', (e) => {
    e.preventDefault();
    sellCard.classList.remove('dragover');
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
  });

  evolveCard.addEventListener('drop', (e) => {
    e.preventDefault();
    evolveCard.classList.remove('dragover');
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
  });

  buyCard.addEventListener('drop', (e) => {
    e.preventDefault();
    buyCard.classList.remove('dragover');
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
  });

  // Volume control
  const volumeControl = document.getElementById('volumeControl');
  const volumeDisplay = document.getElementById('volumeDisplay');

  volumeControl.addEventListener('input', (e) => {
    const volume = e.target.value;
    volumeDisplay.textContent = `${volume}%`;
  });

  // Initialize volume display
  volumeDisplay.textContent = `${volumeControl.value}%`;

  // Modal functionality
  const reportModal = document.getElementById('reportModal');
  const deleteModal = document.getElementById('deleteModal');
  const closeModalButtons = document.querySelectorAll('.close');

  closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.closest('.modal').style.display = 'none';
    });
  });

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
  }

  // Delete account button
  const deleteAccountButton = document.getElementById('deleteAccount');

  deleteAccountButton.addEventListener('click', () => {
    openModal('deleteModal');
  });
});