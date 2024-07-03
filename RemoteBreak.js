export async function main(ns) {
	var killswitch = false
	var refresh = false
	var limit = 0
	var servers = ns.scan(ns.args[0])

	for (var x in servers) {
		var runon = servers[x]
		var server = ns.getServer(runon)

		await ns.sleep(100)
		if (ns.isRunning("RemoteBreak.js", "home", runon)) {
			continue
		}

		if (refresh == true) {
			ns.kill("HackHome.js", runon)
			ns.kill("BasicHack.js", runon, server.moneyMax, server.minDifficulty)
		}
		ns.scp("BasicHack.js", runon, "home")
		ns.scp("HackHome.js", runon, "home")

		breakServer(ns, runon, server)

		// Run Hacks
		var hackhomeThreads = Math.floor((server.maxRam - server.ramUsed - 1) / 1.7)
		if (ns.isRunning("HackHome.js", runon)) {
			var hackselfThreads = Math.floor((server.maxRam - 1) / 2.2)
		} else {
			var hackselfThreads = Math.floor((server.maxRam - server.ramUsed - 1) / 2.2)
		}

		if((server.hasAdminRights) && (runon != "home")) {
			if ((ns.getHackingLevel() >= server.requiredHackingSkill) && (server.moneyMax > 0)) {
				if ((hackselfThreads >= 1) && (ns.isRunning("BasicHack.js", runon, server.moneyMax, server.minDifficulty) == false)) {
					if (ns.isRunning("HackHome.js", runon)) {
						ns.kill("HackHome.js", runon)
					}
					ns.tprint(printString(runon, false, hackselfThreads, 2.2))
					ns.exec("BasicHack.js", runon, hackselfThreads, runon, server.moneyMax, server.minDifficulty)
				}

				hackByHome(ns, runon, server, 1e5)
				//run ^ for extra money when having lots of ram

				// xp grind hack
			} else if ((hackhomeThreads >= 1) && (ns.isRunning("BasicHack.js", runon, server.moneyMax, server.minDifficulty) == false) && (ns.isRunning("HackHome.js", runon) == false)) {
				ns.tprint(printString(runon, true, hackhomeThreads, 1.7))
				ns.exec("HackHome.js", runon, hackhomeThreads)
			}
		}

		// continue the loop	
		if ((killswitch == false) && ((ns.getServer("home").maxRam) >= (ns.getServer("home").ramUsed * limit))) {
			ns.exec("RemoteBreak.js", "home", 1, runon)
		}
	}
}


function breakServer(ns, runon, server) {
	var breaks = [ns.brutessh, ns.ftpcrack, ns.relaysmtp, ns.httpworm, ns.sqlinject]
	var stringbreaks = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe"]

	if (server.hasAdminRights == false) {
		for (var z = 0; z < 5; ++z) {
			if (ns.fileExists(stringbreaks[z], "home")) {
				breaks[z](runon)
			}
		}
		if (server.openPortCount >= server.numOpenPortsRequired) {
			ns.nuke(runon)
			//exec("Backdoor.script", "home", 1, runon)
			//need singularity for this to function
		}
	}
}


function hackByHome(ns, runon, server, minimum) {
	if ((server.moneyMax >= minimum) && (ns.isRunning("BasicHack.js", "home", runon, server.moneyMax, server.minDifficulty) == false)) {
		ns.exec("BasicHack.js", "home", 100, runon, server.moneyMax, server.minDifficulty)
	}
}


function printString(runon, isHome, threads, ramUsed) {
	var string = "@" + runon + " Ran "
	if(isHome) {
		string += "\u001b[34mHackHome\u001b[0m Script; "
	} else {
		string += "\u001b[31mHack\u001b[0m Script; "
	}

	return string + "Ram Used: \u001b[36;1m" + (threads * ramUsed) + "\u001b[0m gb; Threads:\u001b[37;1m " + threads + "\u001b[0m"
}