import { loads } from "./load.js";
import { wrapped } from "./wrapped.js";

export const CONTROLABLE = "controlable";

export const controlables = () => wrapped.filter(isControlable);

export function loadControlables(){
     controlables().map(wrapControlable);
}

export function isControlable(element){
     return element.classList.contains(CONTROLABLE);
}

export function activate(controlable, callback){
     callback(controlable);
}

export function wrapControlable(element){
     element.act = () => console.log("activated");
     element.activate = () => activate(element, element.act);
     return element;
}

loads.add(loadControlables);