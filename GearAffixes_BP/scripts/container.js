import { world } from "@minecraft/server";
import {
	RARITY,
	RARITY_WEIGHTS_COLORS,
	ATTRIBUTE_COUNT_BY_RARITY,
	ITEM_ATTRIBUTES,
	ATTRIBUTES_RANGES,
} from "./attributes.js";

world.afterEvents.playerPlaceBlock.subscribe(({ block }) => {
	if (!block.typeId === "minecraft:chest") return;
	saveLocation(block);
});

world.afterEvents.blockContainerOpened.subscribe(({ block, dimension }) => {
	if (hasLocation(block)) return;
	const container = block.getComponent("inventory")?.container;
	if (!container || !block.typeId === "minecraft:chest") return;

	for (let slot = 0; slot < container.size; slot++) {
		const item = container.getItem(slot);
		if (!item) continue;

		const rarity = selectRarity();
		const amount = selectAmount(rarity);
		const attributes = selectAttributes(rarity, item.typeId, amount);

		const lore = [];
		for (const attribute of Object.values(attributes)) {
			//RARITY.indexOf(rarity) > 3 ? dimension.playSound("note.pling", block.location) : undefined;
			item.setDynamicProperty(`ga:${attribute.name}`, attribute.value);
			lore.push(`§r§9+${attribute.value} ${attribute.name}`);
		}
		const rarityText = `§r${RARITY_WEIGHTS_COLORS[rarity].color}${rarity}`;
		lore.length > 0 ? lore.push(rarityText) : undefined;
		item.setLore(lore);
		container.setItem(slot, item);

		saveLocation(block);
	}
});

function selectRarity() {
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

function selectAmount(rarity) {
	const range = ATTRIBUTE_COUNT_BY_RARITY[rarity];
	if (!range) return 0;

	const { min, max } = range;

	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function selectAttributes(rarity, itemType, amount) {
	const available = [];
	const rarityIndex = RARITY.indexOf(rarity);

	for (const value of Object.values(ITEM_ATTRIBUTES)) {
		if (!value.items.some((type) => itemType.endsWith(type))) continue;

		for (const [attribute, rarityValue] of Object.entries(value)) {
			if (attribute === "items") continue;
			const attributeIndex = RARITY.indexOf(rarityValue);
			if (attributeIndex <= rarityIndex) {
				available.push(attribute);
			}
		}
	}

	const selected = [];

	while (selected.length < amount && available.length > 0) {
		const index = Math.floor(Math.random() * available.length);
		const [attribute] = available.splice(index, 1);

		const range = ATTRIBUTES_RANGES[attribute]?.[rarity];
		const value = Math.random() * (range.max - range.min) + range.min;

		selected.push({
			name: attribute,
			value: Number(Math.round(value * 100)),
		});
	}
	return selected;
}

/** @param {import("@minecraft/server").Block} block */
function saveLocation(block) {
	const { x, y, z } = block.location;
	const value = `${x},${y},${z}`;
	const chunkLoc = getChunkLocations(block);
	chunkLoc.locations.push(value);

	world.setDynamicProperty(chunkLoc.key, JSON.stringify(chunkLoc.locations));
}

/** @param {import("@minecraft/server").Block} block */
function hasLocation(block) {
	const chunkLocations = getChunkLocations(block).locations;
	const { x, y, z } = block.location;
	const key = `${x},${y},${z}`;

	return chunkLocations.includes(key);
}

/** @param {import("@minecraft/server").Block} block */
function getChunkLocations(block) {
	const dimension = block.dimension.id;
	const { cx, cy, cz } = getChunk(block.location);
	const key = `${dimension}|${cx},${cy},${cz}`;
	const raw = world.getDynamicProperty(key);
	return { locations: raw ? JSON.parse(raw) : [], key };
}

/** @param {import("@minecraft/server").Vector3} location */
function getChunk(location) {
	const { x, y, z } = location;
	return {
		cx: Math.floor(x / 16),
		cy: Math.floor(y / 16),
		cz: Math.floor(z / 16),
	};
}
