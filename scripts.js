class MotherFuckerRowForm{
    constructor(cols){
        this.row = document.createElement("tr")
        this.columns = []
        for (let col = 0; col < cols; col++){
            this.columns = [...this.columns, document.createElement("td")]
        }
        this.columns.forEach((column, ind) => {
            let text = document.createElement("input")
            text.setAttribute("type", "text")
            text.setAttribute("name", "column".concat(ind))
            column.appendChild(text)
            this.row.appendChild(column)
        })
    }
    rowForm(){
        return this.row
    }
    static fillColumns(form){
        let children = [...form.children]
        children.forEach((column, ind) => {
            let text = [...column.children].find(elem => elem.getAttribute("name") === "column".concat(ind))
            column.innerHTML = text.value
            text.remove()
        })
    }
    static checkEmpty(form){
        let empty = true
        let children = [...form.children]
        children.forEach((column, ind) => {
            let text = [...column.children].find(elem => elem.getAttribute("name") === "column".concat(ind))
            empty = empty && text.value.trim() === ""
        })
        return empty
    }
    static turnIntoRowForm(row){
        let children = [...row.children]
        children.forEach((column, ind) => {
            let text = document.createElement("input")
            text.setAttribute("type", "text")
            text.setAttribute("name", "column".concat(ind))
            text.setAttribute("onchange", "this.parentElement.classList.add('edited')")
            text.value = column.innerHTML
            text.setAttribute("original", text.value)
            column.innerHTML = null
            column.appendChild(text)
        })
    }
}


function startRemoveMode(button){
    if (!button.classList.contains("disabledButton")){
        disableOtherControls("removeButton")
        startRowSelectMode()
        button.classList.add("active")
        button.setAttribute("onclick", "confirmDeletion(this)");
    }
}
function startAddMode(button){
    if (!button.classList.contains("disabledButton")){
        disableOtherControls("addButton")
        addEmptyRow()
        button.classList.add("active")
        button.setAttribute("onclick", "confirmAdd(this)")
    }
}

function startModifyMode(button){
    if (!button.classList.contains("disabledButton")){
        disableOtherControls("modifyButton")
        turnRowsIntoRowForms()
        button.classList.add("active")
        button.setAttribute("onclick", "confirmModify(this)")
    }
}

function addEmptyRow(){
    let table = document.getElementById("mthrfckrs")
    let rowForm = new MotherFuckerRowForm(2).rowForm()
    rowForm.setAttribute("id", "blank")
    table.appendChild(rowForm)
}

function turnRowsIntoRowForms(){
    let rows = [...document.getElementsByClassName("editable")]
    rows.forEach(row => {
        row.classList.remove("rowHover")
        MotherFuckerRowForm.turnIntoRowForm(row)
    })
}

function startRowSelectMode(){
    let rows = [...document.getElementsByClassName("selectable")]
    rows.forEach(row => {
        row.classList.remove("rowHover")
        row.setAttribute("onclick", "trySelect(this)")
    })
}

function disableOtherControls(except){
    let controls = [...document.getElementsByClassName("button")]
    controls.forEach(control => {
        if (!control.classList.contains(except)){
            control.classList.add("disabledButton")
        }
    })
}
function enableAllControls(){
    let controls = [...document.getElementsByClassName("button")]
    controls.forEach(control => control.classList.remove("disabledButton", "active"))
}

function finishRowSelectionMode(){
    let rows = [...document.getElementsByClassName("selectable")]
    rows.forEach(row => {
        row.classList.add("rowHover")
        row.setAttribute("onclick", "")
        if (row.classList.contains("selected")){
            row.classList.remove("selected")
        }
    })
}

function trySelect(row){
    let selected = row.classList.contains("selected")
    if (selected){
        row.classList.remove("selected")
    }else{
        row.classList.add("selected")
    }
}

function confirmAdd(button){
    let blank = document.getElementById("blank")
    if (!MotherFuckerRowForm.checkEmpty(blank)){
        MotherFuckerRowForm.fillColumns(blank)
        blank.classList.add("editable", "selectable", "rowHover")
        blank.removeAttribute("id")
        console.log("new added")
    }else{
        blank.remove()
    }
    button.setAttribute("onclick", "startAddMode(this)")
    enableAllControls()
}

function confirmDeletion(button){
    let rows = [...document.getElementsByClassName("selectable")]
    let selectedRows = rows.filter(row => row.classList.contains("selected"))
    if (selectedRows.length !== 0){
        selectedRows.forEach(row => {
            console.log(row.children[0].innerHTML + " deleted")
            row.remove()
        })
    }
    button.setAttribute("onclick", "startRemoveMode(this)")
    finishRowSelectionMode()
    enableAllControls()
}

function confirmModify(button){
    let rows = [...document.getElementsByClassName("editable")]
    let editedRows = rows.filter(row => [...row.children].some(column => column.classList.contains("edited")))
    if (editedRows.length !== 0){
       editedRows.forEach((row, ind) => {
            console.log("The ".concat(ind).concat(" edited"))
        })
    }
    rows.forEach(row => {
        row.classList.add("rowHover")
        MotherFuckerRowForm.fillColumns(row)
    })
    button.setAttribute("onclick", "startModifyMode(this)")
    enableAllControls()
}