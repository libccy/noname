const listItem = document.createElement("li");
listItem.textContent = "将进攻坐骑栏和防御坐骑栏合并为同一个位置（重启后生效）。";

export const MOUNT_COMBINE = {
	name: "合并坐骑栏",
	init: false,
	intro: listItem.outerHTML,
	restart: true
};
