document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('miAudio');
    const btn = document.getElementById('btnReproducirPausar');
    let isPlaying = false; 

    // 1. Intenta iniciar el audio al cargar (será silenciado por el atributo 'muted')
    // Esto prepara el audio para la interacción del usuario.
    audio.play().then(() => {
        // Si el autoplay silenciado funciona, el estado inicial es 'Reproduciendo' (pero sin volumen)
        isPlaying = true;
    }).catch(e => {
        // Si incluso el autoplay silenciado es bloqueado, el estado inicial es 'Pausado'
        isPlaying = false;
    });

    // 2. Manejador del clic principal
    btn.addEventListener('click', () => {
        // PRIMER CLIC: Si el audio está silenciado (como debe estar inicialmente)
        if (audio.muted) {
            audio.muted = false; // ¡Desactiva el silencio! (Ahora tiene sonido)
            audio.play();       // Asegura que empiece a sonar
            btn.textContent = '⏸️'; 
            isPlaying = true;
        } 
        // CLICS POSTERIORES: Manejar Pausa/Reproducir
        else if (isPlaying) {
            audio.pause();
            btn.textContent = '▶️'; 
            isPlaying = false;
        } else {
            audio.play();
            btn.textContent = '⏸️'; 
            isPlaying = true;
        }
    });

    // 3. Sincronizar el estado del botón con el audio (por si el navegador lo pausa)
    audio.addEventListener('play', () => {
        btn.textContent = '⏸️';
        isPlaying = true;
    });
    audio.addEventListener('pause', () => {
        btn.textContent = '▶️';
        isPlaying = false;
    });
});