function getvalbyID(id,initial) {
    const val = parseFloat(document.getElementById(id).value);
    return !isNaN(val) ? parseFloat(val) : initial;
}
function getRadio(name) {
    const val = document.querySelector(`input[type="radio"][name="${name}"]:checked`).value;
    return !isNaN(val) ? parseFloat(val) : val;
}
function getCheck(id) {
    return Boolean(document.getElementById(id).checked);
}
function calc() {
    const attackBefore = getvalbyID("attack",0);
    const magicBefore = getvalbyID("magic",0);
    const speedBefore = getvalbyID("speed",0);
    const strengthBefore = getvalbyID("strength",0);
    const intellectBefore = getvalbyID("intellect",0);
    const maxMP = getvalbyID("maxmp",0);
    const enemyLevel = getvalbyID("level-enemy",0);
    const enemyEndurance = getvalbyID("endurance-enemy",0);
    const enemySpirit = getvalbyID("spirit-enemy",0);
    const affinity = getRadio("affinity");
    const skillBase = getvalbyID("skill-multiplier",100)/100;
    const afMultiplier = getvalbyID("af-multiplier",100)/100;
    const skillMultiplier = document.querySelectorAll('[name="skill-multiplier-option"]');
    const skillMultiplierSum = sinpleProduct([skillMultiplier.item(0),skillMultiplier.item(1),skillMultiplier.item(2),skillMultiplier.item(3)],1,0);
    const attackUp = document.querySelectorAll('[name="attack-up"]');
    const attackUpSum = sinpleSum(attackUp,1);
    const magicUp = document.querySelectorAll('[name="magic-up"]');
    const magicUpSum = sinpleSum(magicUp,1);
    const speedUp = document.querySelectorAll('[name="speed-up"]');
    const speedUpSum = sinpleSum(speedUp,1);
    const attackType = getRadio("attack-type");
    const physicalSub = getRadio("physical-sub");
    const magicalSub = getRadio("magical-sub");
    const elementType = getRadio("elemental");
    const critical = getRadio("crit-group");
    const target = getRadio("target");
    const risktaker = getCheck("risktaker");
    const mindEye = getCheck("mindEye");
    const sacrifice = getCheck("sacrifice");
    const breakCheck = getRadio("break");
    const endurance = getvalbyID("endurance",0);
    const spirit = getvalbyID("spirit",0);
    const zone = getvalbyID("zone",0)/100;
    const barrier = getvalbyID("barrier",0)/100;
    const song = getvalbyID("song",0)/100;
    const pray = getvalbyID("pray",0)/100;
    const auraBuff = document.querySelectorAll('[name="aura-buff"]');
    const auraBuffSum = overlap(auraBuff,100);
    const auraDebuff = document.querySelectorAll('[name="aura-debuff"]');
    const auraDebuffSum = overlap(auraDebuff,100);
    const environment = document.querySelectorAll('[name="environment"]');
    const environmentSum = sinpleSum(environment,100);
    const attackBuff = document.querySelectorAll('[name="attack-buff"]');
    const attackBuffSum = overlap(attackBuff,100);
    document.getElementById("attack-buff-sum").value = Math.trunc(attackBuffSum*10000)/100;
    const magicBuff = document.querySelectorAll('[name="magic-buff"]');
    const magicBuffSum = overlap(magicBuff,100);
    document.getElementById("magic-buff-sum").value = Math.trunc(magicBuffSum*10000)/100;
    const speedBuff = document.querySelectorAll('[name="speed-buff"]');
    const speedBuffSum = overlap(speedBuff,100);
    document.getElementById("speed-buff-sum").value = Math.trunc(speedBuffSum*10000)/100;
    const attackDebuff = document.querySelectorAll('[name="attack-debuff"]');
    const attackDebuffSum = overlap(attackDebuff,100);
    document.getElementById("attack-debuff-sum").value = Math.trunc(attackDebuffSum*10000)/100;
    const magicDebuff = document.querySelectorAll('[name="magic-debuff"]');
    const magicDebuffSum = overlap(magicDebuff,100);
    document.getElementById("magic-debuff-sum").value = Math.trunc(magicDebuffSum*10000)/100;
    const speedDebuff = document.querySelectorAll('[name="speed-debuff"]');
    const speedDebuffSum = overlap(speedDebuff,100);
    document.getElementById("speed-debuff-sum").value = Math.trunc(speedDebuffSum*10000)/100;
    const enduranceDebuff = document.querySelectorAll('[name="endurance-debuff"]');
    const enduranceDebuffSum = overlap(enduranceDebuff,100);
    document.getElementById("endurance-debuff-sum").value = Math.trunc(enduranceDebuffSum*10000)/100;
    const spiritDebuff = document.querySelectorAll('[name="spirit-debuff"]');
    const spiritDebuffSum = overlap(spiritDebuff,100);
    document.getElementById("spirit-debuff-sum").value = Math.trunc(spiritDebuffSum*10000)/100;
    const multiUpgrade = getRadio("multi-upgrade");
    const weaknessBuff = getRadio("weakness-buff");
    const attackResistDebuff = document.querySelectorAll('[name="attack-resist-debuff"]');
    const attackResistDebuffSum = overlap(attackResistDebuff,100);
    document.getElementById("attack-resist-debuff-sum").value = Math.trunc(attackResistDebuffSum*10000)/100;
    const elementalResistDebuff = document.querySelectorAll('[name="elemental-resist-debuff"]');
    const elementalResistDebuffSum = overlap(elementalResistDebuff,100);
    document.getElementById("elemental-resist-debuff-sum").value = Math.trunc(elementalResistDebuffSum*10000)/100;
    const attackResistBuff = document.querySelectorAll('[name="attack-resist-buff"]');
    const attackResistBuffSum = overlap(attackResistBuff,100);
    document.getElementById("attack-resist-buff-sum").value = Math.trunc(attackResistBuffSum*10000)/100;
    const elementalResistBuff = document.querySelectorAll('[name="elemental-resist-buff"]');
    const elementalResistBuffSum = overlap(elementalResistBuff,100);
    document.getElementById("elemental-resist-buff-sum").value = Math.trunc(elementalResistBuffSum*10000)/100;
    const elementalAttackBuff = document.querySelectorAll('[name="elemental-attack-buff"]');
    const elementalAttackBuffSum = overlap(elementalAttackBuff,100);
    document.getElementById("elemental-attack-buff-sum").value = Math.trunc(elementalAttackBuffSum*10000)/100;
    const weaponBuff = document.querySelectorAll('[name="weapon-buff"]');
    const weaponBuffSum = overlap(weaponBuff,100);
    document.getElementById("weapon-buff-sum").value = Math.trunc(weaponBuffSum*10000)/100;
    const critSkillBuff = document.querySelectorAll('[name="crit-buff-skill"]');
    const critSkillBuffSum = sinpleSum(critSkillBuff,100);
    document.getElementById("crit-buff-skill-sum").value = Math.trunc(critSkillBuffSum*10000)/100;
    const mentalFocusSkill = !isNaN(getRadio("mental-focus-skill")) ? getRadio("mental-focus-skill") : getvalbyID("mental-focus-skill4",0);
    const mentalFocusPassive = !isNaN(getRadio("mental-focus-passive")) ? getRadio("mental-focus-passive") : getvalbyID("mental-focus-passive4",0);
    const eagleEye = !isNaN(getRadio("eagle-eyes")) ? getRadio("eagle-eyes") : getvalbyID("eagle-eyes4",0) /100;
    const overthrowSkill = !isNaN(getRadio("overthrow-skill")) ? getRadio("overthrow-skill") : getvalbyID("overthrow-skill3",0);
    const elementalEquip = document.querySelectorAll('[name="elemental-equip"]');
    const elementalEquipSum = sinpleSum(elementalEquip,100);
    const critEquipBuff = document.querySelectorAll('[name="crit-buff-equip"]');
    const critEquipBuffSum = sinpleSum(critEquipBuff,100);
    const enemyAbnormalityMultiplier = document.querySelectorAll('[name="enemy-abnormality-multiplier"]');
    const enemyAbnormalityMultiplierSum = sinpleProduct(enemyAbnormalityMultiplier,100,1);
    const abnormalityEnhance = document.querySelectorAll('[name="abnormality-enhance"]');
    const abnormalityEnhanceSum = sinpleProduct(abnormalityEnhance,100,1);
    const bullseye = !isNaN(getRadio("bullseye")) ? getRadio("bullseye") : getvalbyID("bullseye3",0)/100;
    const rosethorn = !isNaN(getRadio("rose-thorn")) ? getRadio("rose-thorn") : getvalbyID("rose-thorn3",0)/100;
    const lastStand = (getvalbyID("enemy-count",1)-1) * (!isNaN(getRadio("last-stand")) ? getRadio("last-stand") : getvalbyID("last-stand3",0)/100);
    const weaknessEquip = !isNaN(getRadio("weakness-equip")) ? getRadio("weakness-equip") : getvalbyID("weakness-equip6",0)/100;
    const knockOut = getRadio("knock-out-count")*(sinpleSum(document.querySelectorAll('[name="knock-out-equip"]:checked'),100)+(document.getElementById("knock-out-equip-other").checked ? getvalbyID("knock-out-equip4",0)/100 : 0));
    const lightMultiplier = getRadio("light-number")*(getRadio("light-ore")+sinpleSum(document.querySelectorAll('[name=light-multiplier]:checked'),100)+(document.getElementById("light-multiplier-other").checked ? getvalbyID("light-multiplier3",0)/100 : 0));
    const darkMultiplier = getRadio("dark-number")*(getRadio("dark-ore")+sinpleSum(document.querySelectorAll('[name=dark-multiplier]:checked'),100)+(document.getElementById("dark-multiplier-other").checked ? getvalbyID("dark-multiplier3",0)/100 : 0));
    const zoneMatch = sinpleSum(document.querySelectorAll("[name=zone-match]:checked"),100)+getRadio("zone-match-ore")+(document.getElementById("zone-match-other").checked ? getvalbyID("zone-match2",0)/100 : 0);
    const awakenZone = sinpleSum(document.querySelectorAll("[name=awaken-zone]:checked"),100)+getRadio("awaken-zone-ore")+(document.getElementById("awaken-zone-other").checked ? getvalbyID("awaken-zone4",0)/100 : 0);
    const turn = getvalbyID("turn",0);
    const maxTurn = getvalbyID("turn-max",turn);
    const growth = getRadio("growth-ore")*Math.min(turn,15)+document.getElementById("growth1").checked*getvalbyID("growth1",0)*Math.min(turn,10)+document.getElementById("growth2").checked*getvalbyID("growth2",0)*Math.min(turn,10)+document.getElementById("growth-other").checked*(getvalbyID("growth3",0)/100)*Math.min(turn,maxTurn);
    const ovverthrowEquip = !isNaN(getRadio("overthrow-equip")) ? getRadio("overthrow-equip") : getvalbyID("overthrow-equip4",0);
    const souleater = !isNaN(getRadio("souleater")) ? getRadio("souleater") : getvalbyID("souleater3",0)/100;
    if(overthrowSkill!=0){
        var overthrowSkillModifiler=Math.min(enemyLevel**2/overthrowSkill/100,1);
    }else{
        var overthrowSkillModifiler=0;
    }
    if(ovverthrowEquip!=0){
        var ovverthrowEquipModifiler=enemyLevel**2/ovverthrowEquip/100;
    }else{
        var ovverthrowEquipModifiler=0;
    }
    toggleDisabled();
    
    // 以下ダメージ計算部分
    let inputDamage = [];
    const attackBeforeBuff = attackBefore + attackUpSum + sacrifice * endurance;
    const magicBeforeBuff = magicBefore + magicUpSum + sacrifice * spirit;
    const speedBeforeBuff = speedBefore + speedUpSum;
    const attack = Math.trunc(attackBeforeBuff+attackBeforeBuff*rangeNumber(attackBuffSum-attackDebuffSum,-1,1));
    const magic = Math.trunc(magicBeforeBuff+magicBeforeBuff*rangeNumber(magicBuffSum-magicDebuffSum,-1,1));
    const speed = Math.trunc(speedBeforeBuff+speedBeforeBuff*rangeNumber(speedBuffSum-speedDebuffSum,-1,1));
    let baseDamage = 0;
    let elementalModifiler = 0;
    let skillModifiler = skillBase * ((parseFloat(skillMultiplier.item(4).value)|| 1)+multiUpgrade);
    let affinityModifiler = 0;
    let modifiler = [
        Math.max(rangeNumber(attackResistDebuffSum-attackResistBuffSum,-1,1)+rangeNumber(elementalResistDebuffSum-elementalResistBuffSum,-1,1),-1),
        1,
        Math.min(overlap([Math.min(overlap([maxMP*mentalFocusPassive,maxMP*mentalFocusSkill],100),2.5),overthrowSkillModifiler,eagleEye],1),3.5),
        Math.min(elementalAttackBuffSum,1),
        Math.min(weaponBuffSum,1),
        afMultiplier,
        elementalEquipSum,
        knockOut,
        souleater,
        enemyAbnormalityMultiplierSum,
        abnormalityEnhanceSum,
        affinity === "weak" ? weaknessEquip : 0,
        rosethorn,
        lastStand,
        (mindEye ? 1.5 : 1)*(risktaker ? 1.7 : 1),
        skillMultiplierSum,
        critEquipBuffSum+critSkillBuffSum,
        critical==="over" ? 2 : 1,
        bullseye,
        lightMultiplier+darkMultiplier,
        awakenZone,
        zoneMatch,
        ovverthrowEquipModifiler,
        growth,
        1,
        zone,
        song,
        pray,
        environmentSum,
        auraBuffSum-auraDebuffSum,
        -barrier,
        1,
        breakCheck==="normal" ? 1 : 2,
        target,
        1
    ]
    let rand = [];
    let damages=[[]];
    let select = [];
    let attackA = 0;
    let attackB = 0;
    let elementA = 0;
    let elementB = 0;
    
    if(attackType=="physical"){
        select = document.querySelectorAll("[name=calc-type-physical]");
        inputDamage = document.querySelectorAll("[name=test-damage-physical]");
        switch(physicalSub){
            case "normal" :
                attackA = attack; attackB = strengthBefore; elementA = magicBefore;
                elementB = Math.trunc((intellectBefore + magicUpSum + sacrifice * spirit)*(1+rangeNumber(magicBuffSum-magicDebuffSum,-1,1))) + magicBefore - intellectBefore;
                break;
            case "intellect" :
                attackA = magic; attackB = intellectBefore; elementA = intellectBefore;
                elementB = Math.trunc((intellectBefore + magicUpSum + sacrifice * spirit)*(1+rangeNumber(magicBuffSum-magicDebuffSum,-1,1)));
                break;
            case "speed" :
                attackA = Math.trunc((speedBefore + speedUpSum + attackBefore - strengthBefore)*(1+rangeNumber(speedBuffSum-speedDebuffSum,-1,1)));
                attackB = speed; elementA = magicBefore;
                elementB = Math.trunc((intellectBefore + magicUpSum + sacrifice * spirit)*(1+rangeNumber(magicBuffSum-magicDebuffSum,-1,1)));
                break;
        }
        for(i=0;i<32;i++){rand.push(i+16);document.querySelectorAll(".rand-physical").item(i).textContent=i+16;}
    }else{
        select = document.querySelectorAll("[name=calc-type-magical]");
        inputDamage = document.querySelectorAll("[name=test-damage-magical]");
        switch(magicalSub){
            case "normal" :
                attackA = magic; attackB = intellectBefore; elementA = intellectBefore;
                break;
            case "strength" :
                attackA = attack; attackB = strengthBefore; elementA = intellectBefore;
                break;
            case "speed" :
                attackA = Math.trunc((speedBefore + speedUpSum + attackBefore - strengthBefore)*(1+rangeNumber(speedBuffSum-speedDebuffSum,-1,1)));
                attackB = speed; elementA = intellectBefore;
                break;
        }
        for(i=0;i<63;i++){rand.push(i+32);document.querySelectorAll(".rand-magical").item(i).textContent=i+32;}
    }
    if(attackA - (attackType=="physical"?enemyEndurance:enemySpirit) / (critical != "normal" ? 4 : 2) > 1){
        baseDamage = (attackA - (attackType=="physical"?enemyEndurance:enemySpirit) / (critical != "normal" ? 4 : 2)) * (attackB / 32 +1) * (critical != "normal" ? 3.25 : 1.75);
    }else{
        baseDamage = (attackB / 32 +1) * (critical != "normal" ? 3.25 : 1.75);
    }
    elementalModifiler = elementType === "normal" ? 1 : (Math.sqrt(elementA * 10 + 16) - 4) / 64 + 1;
    switch(affinity){
        case "normal" : affinityModifiler = 1;break;
        case "resist" : affinityModifiler = 0.25;break;
        case "weak" : 
            if(attackType=="physical"){
                affinityModifiler = (elementB+Math.sqrt(elementB*2))/512+1.85+mindEye+weaknessBuff;break;
            }else{
                affinityModifiler = 2 + mindEye+weaknessBuff;break;
            }
    }
    damages[0] = [parseFloat(inputDamage[0].value) || 0,...rand.map((value) => {return value = Math.trunc(Math.trunc((baseDamage * elementalModifiler + attackA * value / 25.6)* skillModifiler) * affinityModifiler);})];
    for(i=1;i<36;i++){
        damages[i] = damages[i-1].map((value,index) => {
            if(index===0 && inputDamage[i].value!=""){return value=parseFloat(inputDamage[i].value);}
            else{return multiWay(select[i-1].value,value,modifiler[i-1]);}
        });
    }
    if(attackType=="physical"){
        for(i=0;i<36;i++){
            document.querySelectorAll(".physical-multi"+i).forEach((element,index) => {
                element.textContent = damages[i][index].toLocaleString("ja-JP");
            })
        }
        document.querySelectorAll(".damage-result-physical").forEach((element,index)=>{
            element.textContent = damages[35][index].toLocaleString("ja-JP");
        })
    }else{
        for(i=0;i<36;i++){
            document.querySelectorAll(".magical-multi"+i).forEach((element,index) => {
                element.textContent = damages[i][index].toLocaleString("ja-JP");
            })
        }
        document.querySelectorAll(".damage-result-magical").forEach((element,index)=>{
            element.textContent = damages[35][index].toLocaleString("ja-JP");
        })
    }
    document.getElementById("min-damage").textContent=damages[35][1].toLocaleString("jp-JA");
    document.getElementById("max-damage").textContent=damages[35][damages[35].length-1].toLocaleString("jp-JA");
}

// NodeList重複減衰処理 単純和 単純積
function overlap(node,devide) {
    let array = [...node].map(input => {
        if(input instanceof Element){
            let value = parseFloat(input.value);
            return isNaN(value) ? 0 : value/devide;
        }else{
            let value = parseFloat(input);
            return isNaN(value) ? 0 : value/devide;
        }
    });
    const sortedArr = array.slice().sort((a,b) => b-a);
    let product = 1;
    return sortedArr.reduce((sum,current) => {
        product *= current;
        return sum += product
    },0)
}
function sinpleSum(node,devide) {
    let sum = 0;
    node.forEach(element => {
        return sum += parseFloat(element.value)/devide || 0;
    });
    return sum;
}
function sinpleProduct(node,devide,base) {
    let product = 1;
    node.forEach(element => {
        return product *= (base+parseFloat(element.value)/devide) || 1;
    });
    return product;
}
function multiWay(select,base,buff){
    switch(select){
        case "1" :
            return Math.floor(base*(1+buff));
        case "2" :
            return base + Math.floor(base*buff);
        case "3" :
            return Math.floor(base+base*buff);
        case "4" :
            return Math.trunc(base*(1+buff));
        case "5" :
            return base + Math.trunc(base*buff);
        case "6" :
            return Math.trunc(base+base*buff);
        case "7" :
            return Math.trunc(base*buff);
        case "8" :
            if(base<=2500000000){
                return base;
            }else if(base<=3500000000){
                return Math.trunc(base*0.3+1750000000);
            }else if(base<=5000000000){
                return Math.trunc(base*0.1+2450000000);
            }else if(base<=10000000000){
                return Math.trunc(base*0.03+2800000000);
            }else if(base<700000000000){
                return Math.trunc(base*0.01+3000000000)
            }else {return 9999999999}
    }
}

// カンマ区切り
function addComma(number){
    return parseFloat(number).toLocaleString("ja-JP");
}

// 数値範囲指定
function rangeNumber(num,min,max){
    return Math.min(Math.max(num,min),max);
}

// diabled切り替え関数
function toggleDisabled() {
    if(document.getElementById("sacrifice").checked){
        document.getElementById("endurance").disabled = false;
        document.getElementById("spirit").disabled = false;
    }else{
        document.getElementById("endurance").disabled = true;
        document.getElementById("spirit").disabled = true;
    }
    if(document.getElementById("mental-focus-skill-other").checked){
        document.getElementById("mental-focus-skill4").disabled = false;
    }else{
        document.getElementById("mental-focus-skill4").disabled = true;
    }
    if(document.getElementById("mental-focus-passive-other").checked){
        document.getElementById("mental-focus-passive4").disabled = false;
    }else{
        document.getElementById("mental-focus-passive4").disabled = true;
    }
    if(document.getElementById("eagle-eyes-other").checked){
        document.getElementById("eagle-eyes4").disabled = false;
        document.querySelector('label[for="eagle-eyes4"]').classList.remove("grayed-out");
    }else{
        document.getElementById("eagle-eyes4").disabled = true;
        document.querySelector('label[for="eagle-eyes4"]').classList.add("grayed-out");
    }
    if(document.getElementById("overthrow-skill-other").checked){
        document.getElementById("overthrow-skill3").disabled = false;
    }else{
        document.getElementById("overthrow-skill3").disabled = true;
    }
    if(document.getElementById("bullseye-other").checked){
        document.getElementById("bullseye3").disabled = false;
        document.querySelector('[for="bullseye3"]').classList.remove("grayed-out");
    }else{
        document.getElementById("bullseye3").disabled = true;
        document.querySelector('[for="bullseye3"]').classList.add("grayed-out");
    }
    if(document.getElementById("rose-thorn-other").checked){
        document.getElementById("rose-thorn3").disabled = false;
        document.querySelector('[for="rose-thorn3"]').classList.remove("grayed-out");
    }else{
        document.getElementById("rose-thorn3").disabled = true;
        document.querySelector('[for="rose-thorn3"]').classList.add("grayed-out");
    }
    if(!document.getElementById("last-stand1").checked){
        document.getElementById("enemy-count").disabled = false;
        document.querySelector('[for="enemy-count"]').classList.remove("grayed-out");
    }else{
        document.getElementById("enemy-count").disabled = true;
        document.querySelector('[for="enemy-count"]').classList.add("grayed-out");
    }
    if(document.getElementById("last-stand-other").checked){
        document.getElementById("last-stand3").disabled = false;
        document.querySelector('[for="last-stand3"]').classList.remove("grayed-out");
        
    }else{
        document.getElementById("last-stand3").disabled = true;
        document.querySelector('[for="last-stand3"]').classList.add("grayed-out");
    }
    if(document.getElementById("weakness-equip-other").checked){
        document.getElementById("weakness-equip6").disabled = false;
        document.querySelector('[for="weakness-equip6"]').classList.remove("grayed-out");
    }else{
        document.getElementById("weakness-equip6").disabled = true;
        document.querySelector('[for="weakness-equip6"]').classList.add("grayed-out");
    }
    if(Array.from(document.querySelectorAll('[name="knock-out-equip"]')).some(elements => elements.checked)){
        document.getElementById("knock-out-equip4").disabled = false;
        document.querySelector('[for="knock-out-equip4"]').classList.remove("grayed-out");
    }else{
        document.getElementById("knock-out-equip4").disabled = true;
        document.querySelector('[for="knock-out-equip4"]').classList.add("grayed-out");
    }
    if(document.getElementById("light-multiplier-other").checked){
        document.getElementById("light-multiplier3").disabled = false;
        document.querySelector("[for=light-multiplier3]").classList.remove("grayed-out");
    }else{
        document.getElementById("light-multiplier3").disabled = true;
        document.querySelector("[for=light-multiplier3]").classList.add("grayed-out");
    }
    if(document.getElementById("dark-multiplier-other").checked){
        document.getElementById("dark-multiplier3").disabled = false;
        document.querySelector("[for=dark-multiplier3]").classList.remove("grayed-out");
    }else{
        document.getElementById("dark-multiplier3").disabled = true;
        document.querySelector("[for=dark-multiplier3]").classList.add("grayed-out");
    }
    if(document.getElementById("zone-match-other").checked){
        document.getElementById("zone-match2").disabled = false;
        document.querySelector("[for=zone-match2]").classList.remove("grayed-out");
    }else{
        document.getElementById("zone-match2").disabled = true;
        document.querySelector("[for=zone-match2]").classList.add("grayed-out");
    }
    if(document.getElementById("awaken-zone-other").checked){
        document.getElementById("awaken-zone4").disabled = false;
        document.querySelector("[for=awaken-zone4]").classList.remove("grayed-out");
    }else{
        document.getElementById("awaken-zone4").disabled = true;
        document.querySelector("[for=awaken-zone4]").classList.add("grayed-out");
    }
    if(document.getElementById("growth-other").checked){
        document.getElementById("growth3").disabled = false;
        document.querySelector("[for=growth3]").classList.remove("grayed-out");
    }else{
        document.getElementById("growth3").disabled = true;
        document.querySelector("[for=growth3]").classList.add("grayed-out");
    }
    if(Array.from(document.querySelectorAll("[name=growth]")).some(elements => elements.checked) || !document.getElementById("growth-ore0").checked){
        document.getElementById("turn").disabled = false;
        document.getElementById("turn-max").disabled = false;
        document.querySelector("[for=turn]").classList.remove("grayed-out");
        document.querySelector("[for=turn-max]").classList.remove("grayed-out");
    }else{
        document.getElementById("turn").disabled = true;
        document.getElementById("turn-max").disabled = true;
        document.querySelector("[for=turn]").classList.add("grayed-out");
        document.querySelector("[for=turn-max]").classList.add("grayed-out");
    }
    if(document.getElementById("overthrow-equip-other").checked){
        document.getElementById("overthrow-equip4").disabled = false;
    }else{
        document.getElementById("overthrow-equip4").disabled = true;
    }
    if(document.getElementById("souleater-other").checked){
        document.getElementById("souleater3").disabled = false;
        document.querySelector("[for=souleater3]").classList.remove("grayed-out");
    }else{
        document.getElementById("souleater3").disabled = true;
        document.querySelector("[for=souleater3]").classList.add("grayed-out");
    }
    if(document.getElementById("physical").checked){
        document.getElementById("physical-options").classList.remove("hidden");
        document.getElementById("magical-options").classList.add("hidden");
        document.querySelector(".physical-damage").classList.remove("hidden");
        document.querySelector(".magical-damage").classList.add("hidden");
    }else{
        document.getElementById("physical-options").classList.add("hidden");
        document.getElementById("magical-options").classList.remove("hidden");
        document.querySelector(".physical-damage").classList.add("hidden");
        document.querySelector(".magical-damage").classList.remove("hidden");
    }
}

// 入力変更に応じて再計算
const changeCheck = [...document.querySelectorAll("input"),...document.querySelectorAll("select")];
changeCheck.forEach(element => {
    element.addEventListener("input", calc);
    element.addEventListener("change", calc);
});
window.addEventListener("load", calc);

// タブ切替関数
document.addEventListener("DOMContentLoaded", function() {
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {
    button.addEventListener("click", () => {
        tabButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        tabContents.forEach(content => content.classList.remove("active"));
        const targetId = button.dataset.tabTarget;
        const targetContent = document.querySelector(targetId);
        if (targetContent) {
            targetContent.classList.add("active");
        }
    });
});
});