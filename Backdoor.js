export async function main(ns) {
	await ns.singularity.installBackdoor(ns.args[0])
}