// var health = 10;
// var getHit = function (amount) {
// 	health -= amount;
// 	return health;
// }


// module.exports.health = health; // 1
// module.exports.getHit = getHit;

var HealthComponent = function (initialHealth) {
	this.health = initialHealth;
	this.getHit = function (amount) {
		this.health -= amount;
	}
}

module.exports = HealthComponent;