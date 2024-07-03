export async function main(ns) {
	player = ns.getPlayer()
	for (var n = 0; n < ns.hacknet.numNodes(); ++n) {
		ns.hacknet.upgradeCore(n, 99)
		ns.hacknet.upgradeLevel(n, 999)
		ns.hacknet.upgradeRam(n, 99)
	}
}