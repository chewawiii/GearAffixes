export const RARITY_WEIGHTS_COLORS = {
	common: { weight: 50, color: "§7" },
	rare: { weight: 30, color: "§b" },
	epic: { weight: 13, color: "§d" },
	legend: { weight: 6, color: "§6" },
	mythic: { weight: 1, color: "§c" },
};

export const ATTRIBUTE_COUNT_BY_RARITY = {
	common: { min: 0, max: 1 },
	rare: { min: 1, max: 1 },
	epic: { min: 1, max: 2 },
	legend: { min: 2, max: 3 },
	ultimate: { min: 2, max: 3 },
};

export const ITEM_ATTRIBUTES = {
	armor: {
		items: ["helmet", "chestplate", "leggings", "boots"],
		dodge_chance: "legend",
		protection_pierce: "epic",
		max_health: "rare",
		knockback_resistance: "mythic",
		movement_speed: "common",
		luck: "common",
	},
	tool: {
		items: ["pickaxe", "hoe", "shovel", "axe"],
		mining_speed: "legend",
		mining_speed_water: "mythic",
		movement_speed: "epic",
		luck: "common",
	},
	weapon_melee: {
		items: ["sword", "spear", "axe", "mace"],
		critical_chance: "epic",
		critical_damage: "legend",
		hp_damage: "mythic",
		life_steal: "legend",
		luck: "common",
	},
	weapon_ranged: {
		items: ["bow", "crossbow", "trident"],
		projectile_damage: "epic",
		movement_speed: "rare",
		hp_damage: "mythic",
		luck: "common",
	},
};

export const ATTRIBUTES_RANGES = {
	dodge_chance: {
		/* cap por item: 7.5% | cap por set: 30% */
		legend: { min: 0.01, max: 0.04 },
		mythic: { min: 0.045, max: 0.075 },
	},
	protection_pierce: {
		/* cap por item: -10% | cap por set: -40% */
		epic: { min: 0.01, max: 0.03 },
		legend: { min: 0.03, max: 0.05 },
		mythic: { min: 0.06, max: 0.1 },
	},
	max_health: {
		/* cap por item: 5 puntos / 2.5 corazones | cap por set: 20 puntos / 10 corazones */
		rare: { min: 0.01, max: 0.02 },
		epic: { min: 0.02, max: 0.03 },
		legend: { min: 0.03, max: 0.04 },
		mythic: { min: 0.04, max: 0.05 },
	},
	knockback_resistance: {
		/* cap por item: -20% | cap por set: -80% */
		mythic: { min: 0.05, max: 0.2 },
	},
	movement_speed: {
		/* cap por item: 20% | cap por set: 100% */
		common: { min: 0.01, max: 0.04 },
		rare: { min: 0.04, max: 0.08 },
		epic: { min: 0.08, max: 0.12 },
		legend: { min: 0.12, max: 0.16 },
		mythic: { min: 0.16, max: 0.2 },
	},
	luck: {
		/* cap por item: 12% | cap por set: 60% */
		common: { min: 0.01, max: 0.03 },
		rare: { min: 0.03, max: 0.05 },
		epic: { min: 0.05, max: 0.07 },
		legend: { min: 0.07, max: 0.09 },
		mythic: { min: 0.09, max: 0.12 },
	},
	mining_speed: {
		/* cap por item: 50% */
		legend: { min: 0.01, max: 0.25 },
		mythic: { min: 0.25, max: 0.5 },
	},
	mining_speed_water: {
		/* cap por item: 50% */
		mythic: { min: 0.01, max: 0.5 },
	},
	critical_chance: {
		/* cap por item: 60% */
		epic: { min: 0.01, max: 0.3 },
		legend: { min: 0.3, max: 0.4 },
		mythic: { min: 0.4, max: 0.6 },
	},
	critical_damage: {
		/* cap por item: 50% */
		legend: { min: 0.01, max: 0.25 },
		mythic: { min: 0.25, max: 0.5 },
	},
	hp_damage: {
		/* cap por item: 10% */
		mythic: { min: 0.01, max: 0.1 },
	},
	life_steal: {
		/* cap por item: 15% */
		legend: { min: 0.01, max: 0.06 },
		mythic: { min: 0.07, max: 0.15 },
	},
	projectile_damage: {
		/* cap por item: 50% */
		epic: { min: 0.01, max: 0.15 },
		legend: { min: 0.16, max: 0.34 },
		mythic: { min: 0.35, max: 0.5 },
	},
};
