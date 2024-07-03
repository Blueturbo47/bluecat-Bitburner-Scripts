export async function main(ns) {
	var runon = ns.args[0]
	var moneymax = ns.args[1]
	var secmin = ns.args[2]

	while (true) {
		while ((moneymax / 500) > (ns.getServerMoneyAvailable(runon))) {
			while (ns.getServerSecurityLevel(runon) > (secmin * 1.5)) {
				await ns.weaken(runon)
			}
			await ns.grow(runon)
		}
		while (ns.getServerSecurityLevel(runon) > (secmin * 1.5)) {
			await ns.weaken(runon)
		}

		await ns.hack(runon)
	}
}