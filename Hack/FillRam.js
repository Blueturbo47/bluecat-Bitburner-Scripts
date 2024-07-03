export async function main(ns) {
	var ramPercent = 1.0

	if(ns.args[1] != null) {
		ramPercent = ns.args[1]/100
	}

	if (ns.args[0] == "home") {
		ns.exec("HackHome.js", "home", (Math.floor(((ns.getServerMaxRam("home") * ramPercent) - 3.15) / 1.7)))
	} else {
		ns.exec("BasicHack.js", "home", (Math.floor(((ns.getServerMaxRam("home") * ramPercent) - 3.15) / 2.2)), ns.args[0], getServerMaxMoney(ns.args[0]), getServerMoneyAvailable(ns.args[0]))
	}
}