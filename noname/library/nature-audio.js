export const natureAudio = {
	damage: {
		fire: "default",//默认，即语音放置在audio/effect下，以damage_fire.mp3 damage_fire2.mp3命名。
		thunder: "default",
		ice: "default",
		stab: "normal",//正常，即与普通伤害音效相同。
		/*
		"example":{
			1:"../extension/XXX/damage_example.mp3",//1点伤害。
			2:"../extension/XXX/damage_example2.mp3",//2点及以上伤害
		}
		*/
	},
	hujia_damage: {
		fire: "default",//默认，即语音放置在audio/effect下，以hujia_damage_fire.mp3 hujia_damage_fire2.mp3命名。
		thunder: "default",
		ice: "normal",//正常，即与普通伤害音效相同。
		/*
		"example":{
			1:"../extension/XXX/damage_example.mp3",//1点伤害。
			2:"../extension/XXX/damage_example2.mp3",//2点及以上伤害
		}
		*/
	},
	sha: {
		fire: "default",//默认，即语音放置在audio/card/male与audio/card/female下，命名为sha_fire.mp3
		thunder: "default",
		ice: "default",
		stab: "default",
		poison: "normal",//正常，即播放“杀”的音效。
		kami: "normal",
		/*
		"example":{
			"male":"../extension/XXXX/sha_example_male.mp3",
			"female":"../extension/XXXX/sha_example_female.mp3"
		}
		*/
	}
};
