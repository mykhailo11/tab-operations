import { ables } from "./able.js";
import { controlables } from "./controlable.js";
import { editables } from "./editable.js";
import { load } from "./load.js";
import { selectables } from "./selectable.js";
import { wrapped } from "./wrapped.js";

window["loadComponents"] = load;
window["ables"] = ables;
window["editables"] = editables;
window["wrapped"] = wrapped;
window["selectables"] = selectables;
window["controlables"] = controlables;