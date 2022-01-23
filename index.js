const { ignore } = require('nodemon/lib/rules');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

init();

function init() {
    rl.question('Command? \n', function(cmd) {
        start(cmd.split(" "));
    });
}

function start(args) {
    if(args.length <= 0) return;

    switch(args.shift()) {
        case 'o':
        case 'open': {
            if(args.length > 0) {
                open(args);
            } else rl.question('Type(gacha or loot)? \n', function(out) {
                open(out);
            });
            break;
        }
    }
}

function open(args) {
    let type = "g";
    let isArr = Array.isArray(args);
    if(isArr)
        type = args.shift();
    else
        type = args;
    switch(type) {
        case 'g':
        case 'gacha': {
            if(isArr && args.length > 0)
                openWithTier(1, args);
            else rl.question('Tier(1 - 5)? \n', function(out) {
                openWithTier(1, out);
            });
            break;
        }
        case 'l':
        case 'loot':
        case 'lootbox': {
            if(isArr && args.length > 0)
                openWithTier(2, args);
            else rl.question('Tier(1 - 5)? \n', function(out) {
                openWithTier(2, out);
            });
            break;
        }
    }
}

function openWithTier(type, args) {
    let tier = 1;
    if(Array.isArray(args))
        tier = args.shift();
    else
        tier = args;
    
    if(type == 1) {
        if(tier == 1) {
            let a = [];
            a[0.001] = "Tier 5";
            a[0.004] = "Tier 4";
            a[0.009] = "Tier 3";
            a[0.020] = "Tier 2";
            a[0.999] = "Tier 1";

            let r = getRandomWeightedValue(a);

            console.log(r + ", Category: " + selectRandomCategory());
        }
    } else if(type == 2) {
        if(tier == 1) {
            console.log("Tier 1, Category: " + selectRandomCategory());
        }
    }

    init();
}

function selectRandomCategory() {
    let r = getRandomInt(5);

    if(r == 0) {
        return "weapon";
    } else if(r == 1) {
        return "Armor";
    } else if(r == 2) {
        return "Spell Arts";
    } else if(r == 3) {
        return "Consumable";
    } else if(r >= 4) {
        return "Miscellaneous";
    }
}

function getRandomWeightedValue(input) {
    let ks = Object.keys(input);
    let r = Math.random();
    
    for(const k of ks) {
        if(r <= k) {
            return input[k];
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}