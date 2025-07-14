function rot13(str) {
    // Definir el alfabeto y el desplazamiento (13 posiciones)
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';

    // Iterar sobre cada carácter de la cadena
    for (let char of str) {
        // Verificar si el carácter es una letra mayúscula
        if (/[A-Z]/.test(char)) {
            // Encontrar la posición actual en el alfabeto
            let currentIndex = alphabet.indexOf(char);
            // Calcular la nueva posición con un desplazamiento de -13 (decodificar ROT13)
            let newIndex = (currentIndex + 13) % 26;
            // Agregar la letra correspondiente al resultado
            result += alphabet[newIndex];
        } else {
            // Mantener caracteres no alfabéticos sin cambios
            result += char;
        }
    }

    return result;
}

rot13("SERR PBQR PNZC");