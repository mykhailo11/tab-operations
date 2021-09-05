import { byAttribute, loads } from "./load.js";

export const WRAPPED = "wrapped";

export let wrapped;

export function loadWrapped(){
     wrapped = byAttribute(WRAPPED);
}

export function pushWrapped(element){
     if (isWrapped(element)){
          wrapped.push(element);
     }
}

loads.add(loadWrapped);

export function isWrapped(element){
     return element.hasAttribute(WRAPPED);
}