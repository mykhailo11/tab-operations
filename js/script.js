import { isAble, wrapAble } from "./able.js";
import { controlables, wrapControlable, isControlable } from "./controlable.js";
import { editables, wrapEditable } from "./editable.js";
import { loads } from "./load.js";
import { selectables, wrapSelectable } from "./selectable.js";
import { wrapped, pushWrapped } from "./wrapped.js";

loads.add(() => enable(selectables(), false))
     .add(() => controlables().filter(isAble).forEach(controlable => controlable.onclick = () => {
          if (controlable.enabled){
               controlable.activate();
          }
     }))
     .add(() => controlables().find(controlable => controlable.id === "remove").act = startSelect)
     .add(() => controlables().find(controlable => controlable.id === "edit").act = startEdit)
     .add(() => controlables().find(controlable => controlable.id === "insert").act = startInsert);

function insertRecord(){
     let records = wrapped.find(element => element.id === "records");
     let row = records.insertRow();
     row.classList.add("controlable", "selectable", "able");
     row.setAttribute("wrapped", "true");
     wrapAble(row);
     wrapControlable(row);
     wrapSelectable(row);
     pushWrapped(row);
     row.onclick = () => row.activate();
     let cells = [row.insertCell(), row.insertCell()];
     cells.forEach(cell => {
          cell.classList.add("editable", "able");
          cell.setAttribute("wrapped", "true");
          wrapAble(cell);
          wrapEditable(cell);
          pushWrapped(cell);
          cell.edit();
     });
     return row;
}

function activateDefault(elements){
     elements.filter(isControlable)
          .forEach(selectable => selectable.act = undefined);
}

function enable(elements, enabled = true){
     elements.filter(isAble).forEach(able => able.enable(enabled));
}

function startInsert(control){
     insertRecord();
     control.act = finishInsert;
}    

function finishInsert(control){
     enable(editables(), false);
     editables().forEach(editable => {
          editable.applyEdit();
     });
     control.act = startInsert;
}


function activateSelect(){
     selectables().filter(selectable => isControlable(selectable) && isAble(selectable))
          .forEach(selectable => selectable.act = select);
}

function select(selectable){
     if (selectable.enabled){
          selectable.select();
          selectable.setAttribute("selected", selectable.selected);
     }
}

function resetSelect(selectable){
          selectable.resetSelect();
          selectable.setAttribute("selected", false);
}

function startSelect(control){
     activateSelect();
     enable(selectables().filter(isAble));
     control.act = finishSelect;
}

function finishSelect(control){
     activateDefault(selectables());
     enable(selectables(), false);
     selectables().forEach(resetSelect);
     control.act = startSelect;
}

function startEdit(control){
     enable(editables());
     editables().forEach(editable => editable.edit());
     control.act = finishEdit;
}

function finishEdit(control){
     enable(editables(), false);
     editables().forEach(editable => editable.applyEdit());
     control.act = startEdit;
}
