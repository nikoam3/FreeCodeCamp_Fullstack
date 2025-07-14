function telephoneCheck(str) {
    // Expresión regular para validar números de teléfono de EE. UU.
    const regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;

    // Comprobar si la cadena coincide con la expresión regular
    return regex.test(str);
}

telephoneCheck("555-555-5555");