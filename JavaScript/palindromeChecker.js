function palindrome(str) {
    // 1. Convertir la cadena a minúsculas y eliminar caracteres no alfanuméricos
    let cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');

    // 2. Comparar la cadena limpia con su reverso
    let reversedStr = cleanStr.split('').reverse().join('');

    // 3. Devolver true si son iguales, false si no
    return cleanStr === reversedStr;
}

palindrome("eye");