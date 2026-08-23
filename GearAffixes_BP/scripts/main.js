import { RARITY_WEIGHTS_COLORS, ATTRIBUTE_COUNT_BY_RARITY, ITEM_ATTRIBUTES, ATTRIBUTES_RANGES } from "./attributes.js";
 

 

export function selectRarity() {
	const totalWeight = Object.values(RARITY_WEIGHTS_COLORS).reduce((sum, r) => sum + r.weight, 0);
	let random = Math.random() * totalWeight;
	
	for (const [rarity, data] of Object.entries(RARITY_WEIGHTS_COLORS)) {
		random -= data.weight;
		if (random <= 0) {
			return rarity;
		}
	}
	
	return "common";
}