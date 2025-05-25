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

  // Ambience
  const ambienceSelect = document.getElementById('ambience');
  let currentAudio = null;

  const soundFiles = {
    rain: '/sounds/rain.mp3',
    wind: '/sounds/wind.mp3',
    thunder: '/sounds/thunder.mp3',
  };

  ambienceSelect.addEventListener('change', () => {
    // Fade out current audio if playing
    if (currentAudio) {
      const fadeOut = setInterval(() => {
        if (currentAudio.volume > 0.05) {
          currentAudio.volume -= 0.05;
        } else {
          currentAudio.volume = 0;
          currentAudio.pause();
          clearInterval(fadeOut);
          currentAudio = null;
        }
      }, 50);
    }

    const selectedValue = ambienceSelect.value;

    // Play new sound if not 'none'
    if (selectedValue !== 'none' && soundFiles[selectedValue]) {
      const newAudio = new Audio(soundFiles[selectedValue]);
      newAudio.loop = true;
      newAudio.volume = 0;
      newAudio.play().then(() => {
        currentAudio = newAudio;
        // Fade in
        const fadeIn = setInterval(() => {
          if (currentAudio && currentAudio.volume < 0.95) {
            currentAudio.volume += 0.05;
          } else if (currentAudio) {
            currentAudio.volume = 1;
            clearInterval(fadeIn);
          }
        }, 50);
      }).catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  });
});