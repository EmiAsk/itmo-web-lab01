import {Client} from "./client.js"

document.getElementById("coordinates-form").onsubmit = submitForm
// document.onload = () => {
//     fetchAttempts().then(json => fillTable(json))
// }

const client = new Client()

function isNumber(s) {
    return isFinite(+s)
}


function validateX() {
    let inputX = document.querySelector("input.x-checkbox[type=radio]:checked")
    let valueX = inputX.value
    return !!valueX;
}

function validateY() {
    let inputY = document.getElementById("Y-text")
    let valueY = inputY.value

    if (isNumber(valueY) && -5 <= +valueY && +valueY <= 3) {
        return true
    }

    inputY.setCustomValidity("Y должен быть числом [-5; 3]")
    return false
}

function validateR() {
    let inputR = document.getElementById("R-text")
    let valueR = inputR.value

    if (isNumber(valueR) && 1 <= +valueR && +valueR <= 4) {
        return true
    }

    inputR.setCustomValidity("R должен быть числом [1; 4]")
    return false
}


function addToTable(data) {
    const table = document.getElementById("check")
    let row = table.insertRow()
    row.classList.add("table-row")

    row.insertCell(0).innerHTML = data.x
    row.insertCell(1).innerHTML = data.y
    row.insertCell(2).innerHTML = data.r
    row.insertCell(3).innerHTML = data.timestamp
    row.insertCell(4).innerHTML = new Date(data.executionTime).toString()
    row.insertCell(5).outerHTML = data.success ? "<td style='color: green'>Попадение</td>" :
        "<td style='color: red'>Промах</td>"
}


function submitForm(event) {
    event.preventDefault()

    if (!validateX() || !validateY() || !validateR()) {
        return
    }

    const form = document.getElementById("coordinates-form")
    const formData = new FormData(form)

    client.submit(formData)
        .then(data => addToTable(data))
        .catch(error => {
            alert(error)
        })
}

