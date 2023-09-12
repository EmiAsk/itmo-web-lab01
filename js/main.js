import {AttemptClient} from "./client.js"


const client = new AttemptClient()

let x, y, r;

window.onload = () => {
    client.getAll().then(data => setToTable(data))
        .catch(() => alert("Не удалось получить попытки"))

    document.getElementById("coordinates-form").onsubmit = submitForm
    document.getElementById("clear-button").onclick = () => {
        client.deleteAll()
            .then(() => setToTable([]))
            .catch(() => alert("Не удалось очистить попытки"))
    }

    const buttons = document.querySelectorAll("input[name=x]")

    const firstBtn = buttons.item(0)
    firstBtn.classList.add("button-selected")
    x = firstBtn.value

    buttons.forEach((button) => {
        console.log(button)
        button.onclick = () => {
            x = button.value
            buttons.forEach(
                (element) => {
                    element.classList.remove("button-selected")
                }
            )
            button.classList.add("button-selected")
        }
    })
}


function isNumber(s) {
    return isFinite(+s)
}


function validateX() {
    let valueX = x

    if (!!valueX) {
        x = valueX
        return true
    }

    alert("Выберите X")
    return false
}

function validateY() {
    let inputY = document.getElementById("Y-text")
    let valueY = inputY.value

    if (isNumber(valueY) && -5 <= +valueY && +valueY <= 3) {
        y = valueY
        return true
    }

    inputY.setCustomValidity("Y должен быть числом [-5; 3]")
    return false
}

function validateR() {
    let inputR = document.getElementById("R-text")
    let valueR = inputR.value

    if (isNumber(valueR) && 1 <= +valueR && +valueR <= 4) {
        r = valueR
        return true
    }

    inputR.setCustomValidity("R должен быть числом [1; 4]")
    return false
}


function addToTable(attempt) {
    const table = document.querySelector("#check tbody")
    let row = table.insertRow()
    row.classList.add("table-row")
    row.insertCell(0).innerHTML = attempt.x
    row.insertCell(1).innerHTML = attempt.y
    row.insertCell(2).innerHTML = attempt.r
    row.insertCell(3).innerHTML = new Date(attempt.timestamp).toLocaleString()
    row.insertCell(4).innerHTML = attempt.executionTime
    row.insertCell(5).outerHTML = attempt.success ? "<td style='color: green'>Попадание</td>" :
        "<td style='color: red'>Промах</td>"
}

function setToTable(data) {
    const table = document.querySelector("#check tbody")
    table.innerHTML = ""
    data.forEach(
        attempt => {
            let row = table.insertRow()
            row.classList.add("table-row")
            row.insertCell(0).innerHTML = attempt.x
            row.insertCell(1).innerHTML = attempt.y
            row.insertCell(2).innerHTML = attempt.r
            row.insertCell(3).innerHTML = new Date(attempt.timestamp).toLocaleString()
            row.insertCell(4).innerHTML = attempt.executionTime
            row.insertCell(5).outerHTML = attempt.success ? "<td style='color: green'>Попадание</td>" :
                "<td style='color: red'>Промах</td>"
        }
    )
}


function submitForm(event) {
    event.preventDefault()

    if (!validateX() || !validateY() || !validateR()) {
        return
    }

    const formData = new FormData()
    formData.append("x", x)
    formData.append("y", y)
    formData.append("r", r)

    client.submit(formData)
        .then(data => addToTable(data))
        .catch(error => {
            alert(error)
        })
}

