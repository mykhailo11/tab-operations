export const loads = new Set().add(() => console.log("loading started"));

export function load(){
     loads.forEach(loading => loading());
}

export function byClass(clazz, element = document){
     return [...element.getElementsByClassName(clazz)];
}

export function byAttribute(attribute, element = document){
     return [...element.querySelectorAll(`[${attribute}]`)];
}