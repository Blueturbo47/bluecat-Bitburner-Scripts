export async function main(ns) {
	for (var i = 0; i < 25; ++i) {
		ns.purchaseServer(("unique-" + i), 65536)
	}
}

// Price: 5500 * ram
// 8192: 450,560,000
// 16,384: 901,120,000
// 32,768: 1,802,240,000
// 65,536: 3,604,480,000