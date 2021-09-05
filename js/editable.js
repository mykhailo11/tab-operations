import { loads } from "./load.js";
import { wrapped } from "./wrapped.js";

export const EDITABLE = "editable"

export function template(editable){
     let input = document.createElement("input");
     input.type = "text";
     input.name = editable.name;
     input.value = editable.innerHTML;
     input.onchange = () => editable.edited = true;
     return input;
}

export const editables = () => wrapped.filter(isEditable);

export function loadEditables(){
     editables().map(wrapEditable);
}

export function isEditable(element){
     return element.classList.contains(EDITABLE);
}

export function edit(editable){
     editable.editor.value = editable.previous();
     editable.innerHTML = "";
     editable.appendChild(editable.editor);
}

export function applyEdit(editable){
     editable.innerHTML = editable.current();
     editable.edited = false;
}

export function resetEdit(editable){
     editable.editor.value = editable.previous();
     editable.edited = false;
}

export function wrapEditable(element){
     element.edited = false;
     element.editor = template(element);
     element.previous = () => element.innerHTML;
     element.current = () => element.editor.value;
     element.edit = () => edit(element);
     element.applyEdit = () => applyEdit(element);
     element.resetEdit = () => resetEdit(element);
     return element;
}

loads.add(loadEditables);