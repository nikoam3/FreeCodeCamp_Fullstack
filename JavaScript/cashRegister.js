function checkCashRegister(price, cash, cid) {
    // Definir los valores de las denominaciones en dólares
    const denominations = [
        { name: "ONE HUNDRED", value: 100 },
        { name: "TWENTY", value: 20 },
        { name: "TEN", value: 10 },
        { name: "FIVE", value: 5 },
        { name: "ONE", value: 1 },
        { name: "QUARTER", value: 0.25 },
        { name: "DIME", value: 0.1 },
        { name: "NICKEL", value: 0.05 },
        { name: "PENNY", value: 0.01 }
    ];

    // Calcular el cambio necesario
    let changeDue = cash - price;

    // Calcular el total de efectivo en la caja
    let totalCid = cid.reduce((sum, [, amount]) => sum + amount, 0).toFixed(2);

    // Caso 1: Efectivo en caja menor que el cambio necesario
    if (Number(totalCid) < changeDue) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    // Caso 2: Efectivo en caja igual al cambio necesario (CLOSED)
    if (Number(totalCid) === changeDue) {
        return { status: "CLOSED", change: cid };
    }

    // Caso 3: Calcular el cambio a devolver (OPEN)
    let change = [];
    let remainingChange = changeDue;

    // Iterar sobre las denominaciones de mayor a menor
    for (let { name, value } of denominations) {
        // Encontrar la cantidad disponible para esta denominación en cid
        let [, amount] = cid.find(([denom]) => denom === name) || [name, 0];
        let numUnits = 0;

        // Calcular cuántas unidades de esta denominación se pueden usar
        while (remainingChange >= value && amount > 0) {
            remainingChange = (remainingChange - value).toFixed(2);
            amount -= value;
            numUnits++;
        }

        // Si se usaron unidades, agregar al cambio
        if (numUnits > 0) {
            change.push([name, numUnits * value]);
        }
    }

    // Verificar si se pudo devolver el cambio exacto
    if (Number(remainingChange) > 0) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    // Devolver el estado OPEN con el cambio calculado
    return { status: "OPEN", change };
}
checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
