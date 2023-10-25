import '../sass/main.scss';

document.addEventListener('DOMContentLoaded', function() {
    const startGameButton = document.getElementById('startGameButton');
    const gameContainer = document.getElementById('gameContainer');

    startGameButton.addEventListener('click', function() {
        // Mostrar el contenedor de los tableros
        gameContainer.style.display = 'flex';

        // Opcional: Ocultar el botón "Start Game" después de hacer clic en él
        startGameButton.style.display = 'none';
    });
});
