import { ITEM } from "./splash-style/item.js";
export const SPLASH_STYLE = {
	name: "启动页",
	item: ITEM,
	visualMenu(node, link) {
		node.className = "button character";
		node.style.width = "200px";
		node.style.height = `${node.offsetWidth * 1080 / 2400}px`;
		node.style.display = "flex";
		node.style.flexDirection = "column";
		node.style.alignItems = "center";
		node.style.backgroundSize = "100% 100%";
		node.setBackgroundImage(`image/splash/${link}.jpg`);
	}
};
