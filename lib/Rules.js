let mainSymbols = []
let rulesOfInference
let conclusionText = ''
let uniqueSymbols = []
let validityRule = ''

export function insertSymbols(symbols = []) {
    mainSymbols = []
    rulesOfInference = [{name: 'modusTollens', rules: []}, {name: 'modusPonens', rules: []}, {
        name: 'generalization',
        rules: []
    }, {name: 'specialization', rules: []}, {name: 'elimination', rules: []}]
    symbols.forEach((value) => {
        mainSymbols.push(value)
    })
    setUniqueSymbols()
    return validityRule
}

export function insertConclusion(conclusion = "") {
    conclusionText = conclusion
}

export function getSymbols() {
    return mainSymbols
}

function setUniqueSymbols() {
    uniqueSymbols = []
    for (let i = 0; i < mainSymbols.length; i++) {
        let symbol = mainSymbols[i].split("*")[0]
        // for (let j = 0; j < symbol.length - 1; j++) {
        //     if (symbol[j] === '-' && symbol[j + 1] === '>') {
        //         uniqueSymbols.push("->")
        //     } else if (symbol[j] === '^') {
        //         uniqueSymbols.push("^")
        //     }
        // }
        if (symbol.includes("->")) {
            let symbolsParts = symbol.split("->")
            symbolsParts.forEach(value => {
                if (!checkIfSymbolAlreadyExists(uniqueSymbols, value)) {
                    uniqueSymbols.push(value.trim())
                }
            })
        } else if (symbol.includes("v")) {
            let symbolParts = symbol.split("v")
            symbolParts.forEach(value => {
                if(!checkIfSymbolAlreadyExists(uniqueSymbols, value)){
                    uniqueSymbols.push(value.trim())
                }
            })
        } else {
            if (!checkIfSymbolAlreadyExists(uniqueSymbols, mainSymbols[i].split("*")[0])) {
                uniqueSymbols.push(mainSymbols[i].split("*")[0])
            }
        }
    }

    console.log(mainSymbols)
    console.log("Unique Symbols")
    console.log(uniqueSymbols)
    createRulesOfInference()
    checkForValidityOfArgument()
}

function checkForValidityOfArgument() {
    let correctArgsCounter = 0
    rulesOfInference.forEach(value => {
        if (value.rules.length === mainSymbols.length) {
            value.rules.forEach((rule, i) => {
                if (rule === mainSymbols[i].split("*")[0].replaceAll(" ", "")) {
                    correctArgsCounter++;
                }
            })
            if (correctArgsCounter === mainSymbols.length) {
                validityRule = value.name
            }
        }
        // value.rules.forEach((rule, index) => {
        //     console.log(mainSymbols[index])
        //     if (mainSymbols[index].split("*") === rule){
        //         console.log("Symbol match between " + mainSymbols[index].split("*") + " and " + rule)
        //         console.log("At " + value.name)
        //     }
        // })
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
        }
    })

    console.log(rulesOfInference)
}

function checkIfSymbolAlreadyExists(symbolsArr = [], symbolText = "") {
    console.log("===================")
    console.log(symbolsArr)
    for (let i = 0; i < symbolsArr.length; i++) {
        console.log(symbolsArr[i].charCodeAt(symbolsArr[i].length - 1) + "  " + symbolText.charCodeAt(symbolText.length - 1))
        if (symbolsArr[i] === symbolText) {
            return true
        }
    }

    return false
}

const generalization = ['p', 'p OR q']