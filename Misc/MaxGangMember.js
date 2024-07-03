export async function main(ns) {
	member = ns.args[0]
	equipment = ns.gang.getEquipmentNames()
	for (n in equipment) {
		ns.gang.purchaseEquipment(member, equipment[n])
	}
}