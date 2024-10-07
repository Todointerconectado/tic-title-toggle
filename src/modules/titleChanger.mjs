export const startTitleChanger = (data) => {
    // Establecer un valor predeterminado para delay si no está presente
    let delay = data.delay !== undefined ? data.delay : 1500; // Asigna 1500 si delay no está presente

    // Verifica si el delay es un número y si es menor a 500
    if (typeof delay !== 'number' || delay < 500) {
        console.error("Error: delay inferior a 500ms.");
        document.title = "Error: delay inferior a 500ms"; // Cambia el título a un mensaje de error
        return; // Termina la función sin continuar
    }

    // Buscar el primer array en el objeto
    const changingTitles = Object.values(data).find(value => Array.isArray(value)) || [];

    // Verifica que changingTitles sea un array válido
    if (!Array.isArray(changingTitles) || changingTitles.length === 0) {
        console.error("El argumento 'changingTitles' debe ser un array no vacío.");
        document.title = "Falta título principal"; // Cambia el título a un mensaje de error
        return; // Termina la función sin iniciar el cambio de título
    }

    let index = 1; // Comenzar desde la posición 1
    let intervalId = null;

    // Establece el título principal como el primer elemento de changingTitles
    const mainTitle = changingTitles[0];
    document.title = mainTitle; // Muestra el título principal al inicio

    // Actualiza el título de la página
    const updateTitle = () => {
        if (changingTitles.length > 1) {
            document.title = changingTitles[index];
            index = (index + 1) % changingTitles.length; // Ciclado de índice
            
            // Asegúrate de que 'index' no vuelva a la posición 0 si está en la página
            if (index === 0) {
                index = 1; // No permitir volver a la posición 0
            }
        }
    };

    // Inicia el intervalo para cambiar el título solo si hay más de dos títulos
    const startInterval = () => {
        if (changingTitles.length > 2) {
            intervalId = setInterval(updateTitle, delay);
        }
    };

    // Detiene el intervalo y restablece el título predeterminado
    const stopInterval = () => {
        clearInterval(intervalId);
        document.title = mainTitle; // Restaura el título principal
    };

    // Escuchar cambios en la visibilidad de la página
    window.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Si hay solo dos frases, mantener el título de posición 1
            if (changingTitles.length === 2) {
                document.title = changingTitles[1]; // Mantener el título en posición 1
            }
            startInterval(); // Cambiar el título cuando la página esté oculta
        } else {
            stopInterval(); // Detener el cambio de título cuando la página esté visible
            // Siempre volver al título principal al regresar
            document.title = mainTitle; 
        }
    });

    // Comienza cambiando el título solo si la página está inicialmente oculta
    if (document.hidden) {
        // Si solo hay dos títulos, mantener el índice en 1
        if (changingTitles.length === 2) {
            document.title = changingTitles[1]; // Mostrar posición 1
        } else {
            startInterval();
        }
    }

    // Devuelve una función para detener el cambio de título manualmente
    return stopInterval; // Devuelve directamente la función de detención
};
