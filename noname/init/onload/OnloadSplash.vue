<template>
	<div class="hidden" v-for="(mode, index) in lib.config.all.mode" :key="mode" :link="mode" :index="index" ref="nodeList">
		<div class="splashtext">{{ get.verticalStr(get.translation(mode)) }}</div>
		<div class="avatar"></div>
	</div>
</template>

<script setup lang="ts">
import { lib, get } from "../../../noname.js";
import { delay } from "../../util/index.js";
import { ref, Ref, onMounted } from "vue";

let props = defineProps<{
	handle: (mode: string) => string;
	click: (mode: string, node: HTMLDivElement) => void;
}>();

let nodeList: Ref<HTMLDivElement[]> = ref([]);
let clicked = false;

onMounted(() => {
	nodeList.value.forEach(async node => {
		let mode = node.getAttribute("link")!;
		let index = parseInt(node.getAttribute("index")!);
        node.listen(() => {
            if (!clicked) {
                clicked = true;
                props.click(mode, node);
            }
        });

		let avatar = node.querySelector(".avatar") as HTMLDivElement;

		let background = lib.config.all.stockmode.includes(mode) ? props.handle(mode) : lib.mode[mode].splash;
		let link = lib.init.parseResourceAddress(background);
		if (link.protocol == "db:") {
			avatar.setBackgroundDB(link.href);
		} else {
			avatar.setBackgroundImage(link.href);
		}

		if (!lib.config.touchscreen) {
			node.addEventListener("mousedown", () => node.classList.add("glow"));
			node.addEventListener("mouseup", () => node.classList.remove("glow"));
			node.addEventListener("mouseleave", () => node.classList.remove("glow"));
		}

		await delay(index * 100);
		node.show();
	});
});
</script>
