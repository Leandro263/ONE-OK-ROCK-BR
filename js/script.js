document.addEventListener('DOMContentLoaded', () => {
  const player = document.getElementById('player');
  const playPauseButton = document.getElementById('playPauseButton');
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');
  const progress = document.querySelector('.progress');
  const progressBar = document.querySelector('.progress-bar');

  let isPlaying = false; // Controla o estado de reprodução
  let currentSongSrc = ''; // Armazena o caminho da música atual

  // Função para carregar e tocar uma música nova
  function loadSong(button) {
    const songSrc = button.getAttribute('data-src'); // Obtém o caminho da música do HTML
    
    // Só carrega a nova música se for diferente da atual
    if (player.src !== songSrc) {
      player.src = songSrc;  // Define a fonte de áudio
      currentSongSrc = songSrc; // Atualiza o caminho da música atual
    }
    player.play(); // Toca a música
    isPlaying = true;
    playPauseButton.innerHTML = '<i class="bx bx-pause"></i>'; // Muda o ícone para pausa
  }

  // Controle de play/pause
  playPauseButton.addEventListener('click', () => {
    if (isPlaying) {
      player.pause(); // Pausa a música
      playPauseButton.innerHTML = '<i class="bx bx-caret-right"></i>'; // Muda o ícone para play
      isPlaying = false;
    } else {
      if (player.src === '') {
        // Se não houver música carregada, carregar a primeira música
        loadSong(document.querySelector('[data-src]'));
      } else {
        player.play(); // Continua a reprodução de onde parou
        playPauseButton.innerHTML = '<i class="bx bx-pause"></i>'; // Muda o ícone para pausa
        isPlaying = true;
      }
    }
  });

  // Controle de música anterior
  prevButton.addEventListener('click', () => {
    loadSong(prevButton); // Carrega e toca a música associada ao botão de anterior
  });

  // Controle de próxima música
  nextButton.addEventListener('click', () => {
    loadSong(nextButton); // Carrega e toca a música associada ao botão de próximo
  });

  // Atualizar barra de progresso conforme a música toca
  player.addEventListener('timeupdate', () => {
    if (player.duration) {
      const progressPercent = (player.currentTime / player.duration) * 100;
      progress.style.width = `${progressPercent}%`;
    }
  });

  // Permitir clicar na barra de progresso para mudar o tempo
  progressBar.addEventListener('click', (e) => {
    const progressBarWidth = progressBar.clientWidth;
    const clickX = e.offsetX;
    const newTime = (clickX / progressBarWidth) * player.duration;
    player.currentTime = newTime;
  });
});
