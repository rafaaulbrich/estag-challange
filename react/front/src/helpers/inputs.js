function validInputs(...inputs) {
    return !inputs.some((i) => !i)
}

function validName(name) {
    return /^[0-9a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]*$/g.test(name)
}

function clearInputs(...setValues) {
    setValues.forEach((v) => v(""))
}

export {validInputs, validName, clearInputs}