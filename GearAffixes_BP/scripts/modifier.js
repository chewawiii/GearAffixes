import { EquipmentSlot, system, world } from "@minecraft/server";
import { ATTRIBUTES_RANGES } from "./attributes.js";

const EQUIPMENT_SLOTS = [
	EquipmentSlot.Chest,
	EquipmentSlot.Feet,
	EquipmentSlot.Head,
	EquipmentSlot.Legs,
	EquipmentSlot.Mainhand,
];

const ATTRIBUTE_LIST = Object.keys(ATTRIBUTES_RANGES);

world.afterEvents.playerSpawn.subscribe(({ player, initialSpawn }) => {
	if (!initialSpawn) return;

	player.equipment = player.getComponent("equippable");
	player.attributes = {};
});

system.runInterval(() => {
	for (const player of world.getAllPlayers()) {
		player.attributes = {};

		for (const slot of EQUIPMENT_SLOTS) {
			const item = player.equipment.getEquipment(slot);
			if (!item) continue;
			for (const attribute of ATTRIBUTE_LIST) {
				const value = item.getDynamicProperty(`ga:${attribute}`);
				if (!value) continue;

				player.attributes[attribute] = (player.attributes[attribute] ?? 0) + value;
				for (const [key, value] of Object.entries(player.attributes)) {
					console.log(`${key}: ${value}`);
				}
			}
		}
	}
}, 10);
