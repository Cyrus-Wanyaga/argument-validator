let userSymbols = []
let rulesOfInference = []
let uniqueSymbols = []
let validityRule

export function insertSymbols(symbols = []) {
    userSymbols = []
    validityRule = {validityRule: '', validity: false}
    rulesOfInference = [{name: 'modusPonens', rules: []}, {name: 'modusTollens', rules: []}, {
        name: 'generalization',
        rules: []
    }, {name: 'specialization', rules: []}, {name: 'elimination', rules: []}, {
        name: 'transitivity',
        rules: []
    }, {name: 'conjunction', rules: []}]
    symbols.forEach((value) => {
        userSymbols.push(value)
    })
    setUniqueSymbols()
    return validityRule
}

export function getSymbols() {
    return userSymbols
}

function setUniqueSymbols() {
    uniqueSymbols = []
    for (let i = 0; i < userSymbols.length; i++) {
        let symbol = userSymbols[i].split("*")[0]
        //premise of the form if ... then
        if (symbol.includes("->")) {
            let symbolsParts = symbol.split("->")
            symbolsParts.forEach(value => {
                if (!checkIfSymbolAlreadyExists(uniqueSymbols, value.trim())) {
                    uniqueSymbols.push(value.trim())
                }
            })
        } else if (symbol.includes("v")) {
            let symbolParts = symbol.split("v")
            symbolParts.forEach(value => {
                if (!checkIfSymbolAlreadyExists(uniqueSymbols, value.trim())) {
                    uniqueSymbols.push(value.trim())
                }
            })
        } else if (symbol.includes("and")) {
            let symbolParts = symbol.split("and")
            symbolParts.forEach(value => {
                if (!checkIfSymbolAlreadyExists(uniqueSymbols, value.trim())) {
                    uniqueSymbols.push(value.trim())
                }
            })
        }
        else {
            if (!checkIfSymbolAlreadyExists(uniqueSymbols, userSymbols[i].split("*")[0])) {
                uniqueSymbols.push(userSymbols[i].split("*")[0])
            }
        }
    }

    console.log(userSymbols)
    console.log("Unique Symbols")
    console.log(uniqueSymbols)
    createRulesOfInference()
    checkForValidityOfArgument()
}

function checkForValidityOfArgument() {
    let correctArgsCounter = 0
    rulesOfInference.forEach(value => {
        if (value.rules.length === userSymbols.length) {
            value.rules.forEach((rule, i) => {
                if (rule === userSymbols[i].split("*")[0].replaceAll(" ", "")) {
                    console.log(userSymbols[i].split("*")[0].replaceAll(" ", ""))
                    correctArgsCounter++;
                }
            })
        }
        if (correctArgsCounter === userSymbols.length) {
            validityRule.validityRule = value.name
            validityRule.validity = true
        }
        correctArgsCounter = 0
    })
}

function createRulesOfInference() {
    let ruleSymbols = []
    uniqueSymbols.forEach(value1 => {
        if (value1.match("[a-zA-Z0-9]")) {
            ruleSymbols.push(value1)
        }
    })
    rulesOfInference.forEach(value => {
        if (value.name === 'generalization') {
            value.rules.push(ruleSymbols[0])
            value.rules.push(ruleSymbols[0] + "v" + ruleSymbols[1])
        } else if (value.name === 'modusPonens') {
            value.rules.push(ruleSymbols[0] + "->" + ruleSymbols[1])
            value.rules.push(ruleSymbols[0])
            value.rules.push(ruleSymbols[1])
        } else if (value.name === 'modusTollens') {
            value.rules.push(ruleSymbols[0] + "->" + ruleSymbols[1])
            value.rules.push("~" + ruleSymbols[0])
            value.rules.push("~" + ruleSymbols[1])
        } else if (value.name === 'transitivity') {
            if (ruleSymbols.length > 2) {
                value.rules.push(ruleSymbols[0] + "->" + ruleSymbols[1])
                value.rules.push(ruleSymbols[1] + "->" + ruleSymbols[2])
                value.rules.push(ruleSymbols[0] + "->" + ruleSymbols[2])
            }
        } else if (value.name === 'specialization') {
            value.rules.push(ruleSymbols[0] + "and" + ruleSymbols[1])
            value.rules.push(ruleSymbols[0])
        } else if (value.name === 'elimination') {
            value.rules.push(ruleSymbols[0] + "v" + ruleSymbols[1])
            value.rules.push("~" + ruleSymbols[1])
            value.rules.push(ruleSymbols[0])
        } else if (value.name === 'conjunction') {
            value.rules.push(ruleSymbols[0])
            value.rules.push(ruleSymbols[1])
            value.rules.push(ruleSymbols[0] + "and" + ruleSymbols[1])
        }
    })

    console.log(rulesOfInference)
}

function checkIfSymbolAlreadyExists(symbolsArr = [], symbolText = "") {
    for (let i = 0; i < symbolsArr.length; i++) {
        if (symbolsArr[i] === symbolText) {
            return true
        }
    }

    return false
}