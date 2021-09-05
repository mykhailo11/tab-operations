import { loads } from "./load.js";
import { wrapped } from "./wrapped.js";

export const SELECTABLE = "selectable";

export const selectables = () => wrapped.filter(isSelectable);

export function loadSelectables(){
     selectables().map((element) => wrapSelectable(element));
}

export function isSelectable(element){
     return element.classList.contains(SELECTABLE); 
}

export function select(selectable){
     selectable.selected = !selectable.selected;
}

export function resetSelect(selectable){
     selectable.selected = false;
}

export function wrapSelectable(element, selected = false){
     element.selected = selected;
     element.select = () => select(element);
     element.resetSelect = () => resetSelect(element);
     return element;
}

loads.add(loadSelectables);