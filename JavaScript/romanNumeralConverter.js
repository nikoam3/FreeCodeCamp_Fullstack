function convertToRoman(num) {
    // Definir un array con los valores y sus equivalentes en números romanos
    const romanValues = [
        { value: 1000, numeral: 'M' },
        { value: 900, numeral: 'CM' },
        { value: 500, numeral: 'D' },
        { value: 400, numeral: 'CD' },
        { value: 100, numeral: 'C' },
        { value: 90, numeral: 'XC' },
        { value: 50, numeral: 'L' },
        { value: 40, numeral: 'XL' },
        { value: 10, numeral: 'X' },
        { value: 9, numeral: 'IX' },
        { value: 5, numeral: 'V' },
        { value: 4, numeral: 'IV' },
        { value: 1, numeral: 'I' }
    ];

    // Variable para almacenar el resultado
    let result = '';

    // Iterar sobre los valores romanos
    for (let { value, numeral } of romanValues) {
        // Mientras el número sea mayor o igual al valor actual
        while (num >= value) {
            // Agregar el numeral romano al resultado
            result += numeral;
            // Restar el valor del número
            num -= value;
        }
    }

    return result;
}

convertToRoman(36);