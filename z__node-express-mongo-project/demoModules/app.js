// var HealthComponent = require('./HealthComponent.js');
// var myHealthComponent = new HealthComponent(10);

var myHealthComponent = new (require('./HealthComponent.js'))(10);

console.log('Vida actual: ', myHealthComponent.health);
myHealthComponent.getHit(1);
console.log('Fuiste atacado, tus vidas disminuyeron a: ' + myHealthComponent.health);