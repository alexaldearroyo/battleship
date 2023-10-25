import '../sass/main.scss';

document.addEventListener('DOMContentLoaded', function() {
    const startGameBtn = document.getElementById('startGameBtn');
    const gameContainer = document.getElementById('gameContainer');

    startGameBtn.addEventListener('click', function() {
        // Mostrar el contenedor de los tableros
        gameContainer.style.display = 'block';

        // Opcional: Ocultar el botón "Start Game" después de hacer clic en él
        startGameBtn.style.display = 'none';
    });
});
