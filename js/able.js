import { loads } from "./load.js";
import { wrapped } from "./wrapped.js";

export const ABLE = "able";

export const ables = () => wrapped.filter(isAble);

export function loadAbles(){
     ables().map(wrapAble);
}

export function isAble(element){
     return element.classList.contains(ABLE);
}

export function enable(able, enabled = true){
     able.enabled = enabled;
}

export function wrapAble(element, enabled = true){
     element.enabled = enabled;
     element.enable = (option = true) => enable(element, option);
     return element;
}

loads.add(loadAbles);
