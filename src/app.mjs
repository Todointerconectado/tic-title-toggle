import { startTitleChanger } from './modules/titleChanger.mjs';

const datos = {
    titles: [
        'Predeterminada',
        'frase 2',
        'frase 3'
    ],
    'delay': 500 // Este valor debería activar el error. 'delay' >= 500ms
};

// Iniciar el cambio de título utilizando los datos
startTitleChanger(datos);

// Para detener el cambio de título en el futuro, puedes llamar a stopTitleChanger()
