import { ITEM } from "./show-character-name-pinyin/item.js";

export const SHOW_CHARACTER_NAME_PINYIN = {
	name: "显示武将名注解",
	intro: "在武将资料卡显示武将名及其注解、性别、势力、体力等信息",
	init: "showPinyin",
	unfrequent: true,
	item: ITEM,
	visualMenu(node, link, name) {
		node.classList.add("button", "character");
		const style = node.style;
		style.alignItems = "center";
		style.animation = "background-position-left-center-right-center-left-center 15s ease infinite";
		style.background = "linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB)";
		style.backgroundSize = "400% 400%";
		style.display = "flex";
		style.height = "60px";
		style.justifyContent = "center";
		style.width = "180px";
		const firstChild = node.firstChild;
		firstChild.removeAttribute("class");
		firstChild.style.position = "initial";
		if (link == "doNotShow") return;
		const ruby = document.createElement("ruby");
		ruby.textContent = name;
		const rt = document.createElement("rt");
		rt.style.fontSize = "smaller";
		if (link == "showPinyin2" || link == "showCodeIdentifier2") {
			rt.textContent = link == "showCodeIdentifier2" ? "[" + link + "]" : "[" + get.pinyin(name) + "]";
			ruby.appendChild(rt);
		} else {
			const leftParenthesisRP = document.createElement("rp");
			leftParenthesisRP.textContent = "（";
			ruby.appendChild(leftParenthesisRP);
			rt.textContent = link == "showCodeIdentifier" ? link : get.pinyin(name).join(" ");
			ruby.appendChild(rt);
			const rightParenthesisRP = document.createElement("rp");
			rightParenthesisRP.textContent = "）";
			ruby.appendChild(rightParenthesisRP);
		}
		firstChild.innerHTML = ruby.outerHTML;
	}
};
