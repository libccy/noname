const div = document.createElement("div");
const style = div.style;
style.whiteSpace = "nowrap";
style.width = "calc(100% - 5px)";
const input = document.createElement("input");
input.accept = "audio/*";
input.style.width = "calc(100% - 40px)";
input.type = "file";
div.append(input);
const button = document.createElement("button");
button.style.width = "40px";
button.append("确定");
div.append(button);

export const IMPORT_MUSIC = {
	name: div.outerHTML,
	clear: true
}
