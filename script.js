const checkList = "input[type=number]:not(table input), input[type=radio], input[type=checkbox]";

const vars = {
    // id: value
    // name: { id: value }
};
const sum = {
    // name: sumValue
};
const calcs = {
    // name: calc(sum, prod, overlap)
    mod: "prod",
    pwrUp: "sum",
    intUp: "sum",
    spdUp: "sum",
    auraUp: "overlap",
    auraDown: "overlap",
    envUp: "sum",
    envDown: "sum",
    pwrBuff: "overlap",
    pwrDebuff: "overlap",
    intBuff: "overlap",
    intDebuff: "overlap",
    spdBuff: "overlap",
    spdDebuff: "overlap",
    endDebuff: "overlap",
    sprDebuff: "overlap",
    atkDebuff: "overlap",
    atkBuff: "overlap",
    eleResDebuff: "overlap",
    eleResBuff: "overlap",
    eleBuff: "overlap",
    weapBuff: "overlap",
    critSBuff: "sum",
    focusS: "focus",
    focusV: "focus",
    throwS: "throw",
    throwAS: "throw",
    eagle: "radio",
    multi: "radio",
    eleE: "sum",
    critE: "sum",
    abnorm: "prod",
    ailment: "prod",
    bulls: "radio",
    consump: "radio",
    advers: "radio",
    weakE: "radio",
    throwE: "throw",
    defeatU: "radio",
    defeatE: "sum",
    TdefeatU: "radio",
    TdefeatE: "sum",
    lightU: "radio",
    lightE: "sum",
    lightOre: "radio",
    darkU: "radio",
    darkE: "sum",
    darkOre: "radio",
    zoneMatch: "sum",
    zoneMatchOre: "radio",
    awaken: "sum",
    awakenOre: "radio",
    eater: "radio",
};
const btVars = {
    // name: value
};
let mod = new Array(35);

// 起動時
window.addEventListener("DOMContentLoaded", () => {
    readUrl();
    document.querySelectorAll(checkList).forEach((element) => {
        getVariables(element);
        setOtherValue(element);
    });
    document.querySelectorAll("input[id^=multiplier]").forEach((element) => {
        getVariables(element);
    });
    document.querySelectorAll(checkList).forEach((element) => {
        updateSum(element);
        calcBuff(element);
    });
    setBtVar();
    setMods();
    calcDamage();
    calcTestDamage();
});

// 入力時
document.addEventListener("input", (ev) => {
    const element = ev.target;
    if (element.matches(checkList)) {
        radioReset(element);
        getVariables(element);
        otherDisabled(element);
        setOtherValue(element);
        updateSum(element);
        calcBuff(element);
        setBtVar();
        setMods();
        calcDamage();
    }
    if (element.matches("input[id^=multiplier]")) {
        getVariables(element);
        setMods();
        calcDamage();
        calcTestDamage();
        outputDamage();
    }
    if (element.matches("input[id^=test]")) {
        calcTestDamage();
        outputTestDamage();
    }
    if (element.matches("select")) {
        calcDamage();
        outputDamage();
    }
});

// elementの状態をvarsに格納
function getVariables(element) {
    if (element.name) {
        if (!vars[element.name]) {
            vars[element.name] = {};
        }
        vars[element.name][element.id] = getNum(element);
        if (calcs[element.name]) {
            sum[element.name] = calc(element.name);
        }
    } else {
        vars[element.id] = getNum(element);
    }
}

// radioをリセット
function radioReset(element) {
    if (element.type === "radio") {
        Object.keys(vars[element.name]).forEach((id) => {
            vars[element.name][id] = false;
        });
    }
}

// elementの値を取得
function getNum(element) {
    let temp;
    let devider = parseFloat(element.dataset.devider) || 1;
    let initial = parseFloat(element.dataset.initial) || 0;
    if (element.type === "number") {
        temp = element.value !== "" ? parseFloat(element.value) : parseFloat(element.placeholder) || 0;
        temp = temp / devider + initial;
    } else {
        temp = element.checked && !isNaN(element.value) ? parseFloat(element.value) / devider + initial : element.checked;
    }
    return temp;
}

// その他値入力にvalueを設定 + vars[その他]に格納
const otherInput = document.querySelectorAll("[data-ot-input]");
const otherArray = Array.from(otherInput).reduce((acc, ele) => {
    acc[ele.id] = document.getElementById(ele.dataset.otInput);
    return acc;
}, {});
// otherArray = { id(num) : element(button) }
function setOtherValue(element) {
    if (otherArray[element.id]?.value) {
        otherArray[element.id].value = getNum(element);
        getVariables(otherArray[element.id]);
    }
}

// その他選択時に値入力.disabledを解除
// dataset.otName === ele.name => 一度disabledに設定
const otherButton = Object.fromEntries(Object.entries(otherArray).map(([key, element]) => [element.id, document.getElementById(key)]));
// otherButton = { id(button) : element(num) }
const otherName = Object.fromEntries(Array.from(otherInput, (element) => [element.dataset.otName, element]));
// otherName = { name : element(num) }
function otherDisabled(element) {
    if (otherName[element.name] && element.type === "radio") otherName[element.name].disabled = true;
    if (otherButton[element.id]) otherButton[element.id].disabled = !element.checked;
}

// name別の計算方法
function calc(name) {
    switch (calcs[name]) {
        case "sum":
            return Object.values(vars[name]).reduce((a, b) => a + b, 0);
        case "prod":
            return Object.values(vars[name]).reduce((a, b) => a * b, 1);
        case "overlap":
            return overlap(Object.values(vars[name]));
        case "radio":
            return parseFloat(Object.values(vars[name]).find((temp) => temp !== false)) || 0;
        case "focus":
            return (Object.values(vars[name] || [0]).find((temp) => temp !== false) * vars.mp) / 100 || 0;
        case "throw":
            return Math.pow(vars.eLv, 2) / Object.values(vars[name] || [0]).find((temp) => temp) / 100 || 0;
    }
}

// 重複減衰
function overlap(array) {
    let sortedArray = array.sort((a, b) => b - a);
    let product = 1;
    return sortedArray.reduce((a, b) => {
        product *= b;
        return a + product;
    }, 0);
}

// element.name - element.dataset.sumを更新
const sumNodeList = document.querySelectorAll("[data-sum]");
const sumArray = Array.from(sumNodeList).reduce((acc, ele) => {
    acc[ele.dataset.sum] = ele;
    return acc;
}, {});
// sumArray = { name: element }
function updateSum(element) {
    if (element.name && sumArray[element.name]?.value) sumArray[element.name].value = format(sum[element.name]);
}

// 桁数調整
function formatNum(num, degits = 2, prod = 100) {
    let temp = Math.floor(num * Math.pow(10, degits) * prod) / Math.pow(10, degits);
    return temp.toFixed(degits);
}

// 画面サイズによる表示桁調整
function format(num, prod = 100) {
    let temp = screen.width < 500 ? formatNum(num, 0, prod) : screen.width < 1200 ? formatNum(num, 1, prod) : formatNum(num, 2, prod);
    return temp.replace("-", "－");
}

// urlから言語/selectAllを取得 +  未設定の場合設定
const readUrl = () => {
    const url = new URL(window.location);
    const selectAllSet = url.searchParams.get("selectAll");
    const langSet = url.searchParams.get("lang");
    const selectAll = selectAllSet === "True";
    const lang = langSet === "ja" ? "ja" : langSet === "en" ? "en" : navigator.language.startsWith("ja") ? "ja" : "en";
    url.searchParams.set("lang", lang);
    url.searchParams.set("selectAll", selectAll);
    document.getElementById("moveCursor").checked = selectAll;
    document.getElementById("japanese").checked = lang === "ja";
    document.getElementById("english").checked = lang === "en";
    history.replaceState(null, null, url);
};

// 言語切り替え
function changeLang() {
    document.querySelectorAll("[data-lang=japanese]").forEach((element) => {
        element.hidden = !document.getElementById("japanese").checked;
    });
    document.querySelectorAll("[data-lang=english]").forEach((element) => {
        element.hidden = !document.getElementById("english").checked;
    });
    const url = new URL(window.location);
    url.searchParams.set("lang", document.getElementById("japanese").checked ? "ja" : "en");
    history.replaceState(null, null, url);
}

// 攻撃種切り替え
const phyCheck = document.getElementById("phy");
const magCheck = document.getElementById("mag");
const attackToggle = () => {
    document.getElementsByName("phyType").forEach((element) => {
        element.closest(".col").hidden = !phyCheck.checked;
    });
    document.getElementsByName("magType").forEach((element) => {
        element.closest(".col").hidden = !magCheck.checked;
    });
};
phyCheck.addEventListener("change", attackToggle);
magCheck.addEventListener("change", attackToggle);

// 挺身切り替え
document.getElementById("sacrifice").addEventListener("change", (element) => {
    document.getElementById("end").disabled = !element.target.checked;
    document.getElementById("spr").disabled = !element.target.checked;
});

// バフ合計値計算 + 表示等諸操作
function calcBuff(element) {
    switch (element.name || element.dataset.otName) {
        case "atkType":
        case "phyType":
        case "magType":
            subType = vars.atkType.phy ? Object.keys(vars.phyType).find((key) => vars.phyType[key]) : Object.keys(vars.magType).find((key) => vars.magType[key]);
            break;
        case "envUp":
        case "envDown":
            btVars["environment"] = sum.envUp - sum.envDown;
            break;
        case "auraUp":
        case "auraDown":
            btVars["aura"] = sum.auraUp - sum.auraDown;
            break;
        case "pwrBuff":
        case "pwrDebuff":
            btVars["pwrBuffs"] = sum.pwrBuff - sum.pwrDebuff;
            document.getElementById("pwrBuffs").value = format(btVars.pwrBuffs);
            break;
        case "intBuff":
        case "intDebuff":
            btVars["intBuffs"] = sum.intBuff - sum.intDebuff;
            document.getElementById("intBuffs").value = format(btVars.intBuffs);
            break;
        case "spdBuff":
        case "spdDebuff":
            btVars["spdBuffs"] = sum.spdBuff - sum.spdDebuff;
            document.getElementById("spdBuffs").value = format(btVars.spdBuffs);
            break;
        case "endDebuff":
            document.getElementById("endDebuffs").value = format(-sum.endDebuff);
            break;
        case "sprDebuff":
            document.getElementById("sprDebuffs").value = format(-sum.sprDebuff);
            break;
        case "atkBuff":
        case "atkDebuff":
            btVars["atkDebuffs"] = sum.atkDebuff - sum.atkBuff;
            document.getElementById("atkDebuffs").value = format(btVars.atkDebuffs);
            break;
        case "eleResDebuff":
        case "eleResBuff":
            btVars["eleResBuffs"] = sum.eleResDebuff - sum.eleResBuff;
            document.getElementById("eleResDebuffs").value = format(btVars.eleResBuffs);
            break;
        case "eleBuff":
            document.getElementById("eleBuffs").value = format(sum.eleBuff);
            break;
        case "focusS":
            document.getElementById("focusSs").value = format(sum.focusS);
            break;
        case "focusV":
            document.getElementById("focusVs").value = format(sum.focusV);
            break;
        case "throwS":
            document.getElementById("throwSs").value = format(sum.throwS);
            break;
        case "throwAS":
            document.getElementById("throwASs").value = format(sum.throwAS);
            break;
        case "advers":
            document.getElementById("adversC").disabled = !Object.values(vars.advers).some((boo) => boo);
            btVars["advers"] = sum.advers * getNum(document.getElementById("adversC"));
            break;
        case "throwE":
            document.getElementById("throwEs").value = format(sum.throwE);
            break;
        case "growth":
        case "growthOre":
            document.getElementById("curTurn").disabled = !Object.values({ ...vars.growth, ...vars.growthOre }).some((value) => value);
            document.getElementById("maxTurn").disabled = !Boolean(vars.growth.growth3);
            break;
        case "lang":
            changeLang();
            break;
    }
    switch (element.id) {
        case "mp":
            sum.focusS = calc("focusS");
            document.getElementById("focusSs").value = format(sum.focusS);
            sum.focusV = calc("focusV");
            document.getElementById("focusVs").value = format(sum.focusV);
            break;
        case "eLv":
            sum.throwS = calc("throwS");
            document.getElementById("throwSs").value = format(sum.throwS);
            sum.throwAS = calc("throwAS");
            document.getElementById("throwASs").value = format(sum.throwAS);
            sum.throwE = calc("throwE");
            document.getElementById("throwEs").value = format(sum.throwE);
            break;
        case "adversC":
            btVars["advers"] = sum.advers * getNum(document.getElementById("adversC"));
            break;
        case "moveCursor":
            const url = new URL(window.location);
            url.searchParams.set("selectAll", vars.moveCursor ? "True" : "False");
            history.replaceState(null, null, url);
            break;
    }
}

const modOutput = document.querySelectorAll("[id^=multiplier]");
function setMods() {
    mod = [
        Math.trunc(vars.skill * 100 * (vars.mode + sum.multi)) / 100,
        mod[1],
        Math.max(limit(btVars.eleResBuffs) + limit(btVars.atkDebuffs), -1),
        vars.multiplier.multiplier4,
        Math.min(overlap([Math.min(sum.focusS, 2.5), Math.min(sum.focusV, 2.5), Math.min(sum.throwS, 1), Math.min(sum.throwAS, 1), sum.eagle]), 3.5),
        limit(sum.eleBuff),
        limit(sum.weapBuff),
        vars.af,
        sum.eleE,
        sum.defeatU * sum.defeatE + sum.TdefeatU * sum.TdefeatE,
        sum.eater,
        sum.abnorm,
        sum.ailment,
        vars.affinity.affinity2 * sum.weakE,
        sum.consump,
        sum.advers * vars.adversC,
        (vars.mindsEye ? 1.5 : 1) * (vars.risktaker ? 1.7 : 1),
        sum.mod,
        vars.crit.crit1 ? 0 : sum.critE + sum.critSBuff,
        vars.crit.crit3 ? 1 : 0,
        vars.af === 1 ? sum.bulls : 0,
        sum.lightU * (sum.lightE + sum.lightOre) + sum.darkU * (sum.darkE + sum.darkOre),
        sum.awaken + sum.awakenOre,
        sum.zoneMatch + sum.zoneMatchOre,
        sum.throwE,
        (vars.growth.growth1 + vars.growth.growth2) * Math.min(vars.curTurn, 10) + vars.growth.growth3 * Math.min(vars.curTurn, vars.maxTurn),
        vars.multiplier.multiplier27,
        vars.zone,
        vars.song,
        vars.pray,
        btVars.environment,
        btVars.aura,
        vars.barrier,
        vars.multiplier.multiplier34,
        vars.break.break2,
        vars.target.target1 ? 0.1 : 0,
    ];
}

// 戦闘用変数定義
let subType;
let randMin, randMax;
function setBtVar() {
    if (vars.atkType.phy === true) {
        btVars["def"] = calcOpt(vars.eDef, limit(-sum.endDebuff));
        randMin = 16;
        randMax = 47;
        switch (subType) {
            case "phyType1":
                btVars["atkA"] = calcOpt(vars.atk + sum.pwrUp + vars.sacrifice * vars.end, limit(btVars.pwrBuffs));
                btVars["atkB"] = vars.pwr;
                btVars["eleA"] = vars.mat;
                btVars["eleB"] = calcOpt(vars.int + sum.intUp + vars.sacrifice * vars.spr, limit(btVars.intBuffs)) + vars.mat - vars.int;
                break;
            case "phyType2":
                btVars["atkA"] = calcOpt(vars.mat + sum.intUp + vars.sacrifice * vars.spr, limit(btVars.intBuffs));
                btVars["atkB"] = vars.int;
                btVars["eleA"] = vars.int;
                btVars["eleB"] = calcOpt(vars.int + sum.intUp + vars.sacrifice * vars.spr, limit(btVars.intBuffs));
                break;
            case "phyType3":
                btVars["atkA"] = calcOpt(vars.spd + vars.atk - vars.pwr + sum.spdUp, limit(btVars.spdBuffs));
                btVars["atkB"] = calcOpt(vars.spd + sum.spdUp, limit(btVars.spdBuffs));
                btVars["eleA"] = vars.mat;
                btVars["eleB"] = btVars.atkB + vars.mat - vars.int;
                break;
        }
        mod[1] = vars.affinity.affinity1 ? 1 : vars.affinity.affinity3 ? 0.25 : (btVars.eleB + Math.sqrt(btVars.eleB * 2)) / 512 + 1.85;
    } else {
        btVars["def"] = calcOpt(vars.eMDef, limit(-sum.sprDebuff));
        randMin = 32;
        randMax = 94;
        switch (subType) {
            case "magType1":
                btVars["atkA"] = calcOpt(vars.mat + sum.intUp + vars.sacrifice * vars.spr, limit(btVars.intBuffs));
                btVars["atkB"] = vars.int;
                btVars["eleA"] = vars.int;
                break;
            case "magType2":
                btVars["atkA"] = calcOpt(vars.atk + sum.pwrUp + vars.sacrifice * vars.end, limit(btVars.pwrBuffs));
                btVars["atkB"] = vars.pwr;
                btVars["eleA"] = vars.int;
                break;
            case "magType3":
                btVars["atkA"] = calcOpt(vars.spd + sum.spdUp + vars.atk - vars.pwr, limit(btVars.pwrBuffs));
                btVars["atkB"] = calcOpt(vars.spd + sum.spdUp, limit(btVars.spdBuffs));
                btVars["eleA"] = vars.int;
                break;
        }
        mod[1] = vars.affinity.affinity1 ? 1 : vars.affinity.affinity3 ? 0.25 : 2;
    }
    mod[1] += vars.affinity.affinity2 ? vars.mindsEye + vars.weakS.weakS2 : 0;
    btVars["base"] = Math.max(btVars.atkA - btVars.def / (vars.crit.crit1 ? 2 : 4), 1) * (btVars.atkB / 32 + 1) * (vars.crit.crit1 ? 1.75 : 3.25);
    btVars["base"] *= vars.eleType.eleType1 ? 1 : (Math.sqrt(btVars.eleA * 10 + 16) - 4) / 64 + 1;
}

// 計算方法
const optionInput = document.querySelectorAll("table select");
// ダメージ計算
const damage = new Array(63).fill(0).map(() => new Array(37).fill(0));
const minOutput = document.getElementById("min-damage");
const maxOutput = document.getElementById("max-damage");
function calcDamage() {
    let options = Array.from(optionInput, (input) => parseFloat(input.value));
    for (let i = 0; i <= randMax - randMin; i++) {
        damage[i][0] = btVars.base + (btVars.atkA * (randMin + i) * 10) / 256;
        for (let j = 0; j < 37; j++) {
            if (j !== 36) {
                damage[i][j + 1] = calcOpt(damage[i][j], mod[j], options[j]);
            } else {
                damage[i][j + 1] =
                    damage[i][j] < 2500000000
                        ? damage[i][j]
                        : damage[i][j] < 3500000000
                        ? Math.trunc(1750000000 + damage[i][j] * 0.3)
                        : damage[i][j] < 5000000000
                        ? Math.trunc(2450000000 + damage[i][j] * 0.1)
                        : damage[i][j] < 10000000000
                        ? Math.trunc(2800000000 + damage[i][j] * 0.03)
                        : Math.min(Math.trunc(3000000000 + damage[i][j] * 0.01), 9999999999);
            }
        }
    }
    minOutput.textContent = damage[0][37].toLocaleString("ja-JP");
    maxOutput.textContent = damage[randMax - randMin][37].toLocaleString("ja-JP");
}
// ダメージ出力
const myTable = document.querySelector("table");
function outputDamage() {
    let tbody = myTable.querySelector("tbody");
    if (tbody === null) {
        tbody = document.createElement("tbody");
        myTable.appendChild(tbody);
    }
    let element = "";
    // 検証行
    element += `<tr id="test-row"><td><span data-lang="japanese">検証行</span><span data-lang="english" hidden>Test Row</td>`;
    element += `<td>${testDamage[37].toLocaleString("ja-JP")}</td>`;
    element += `<td>${testDamage[0] === "" ? "" : formatNum(testDamage[0], 4, 1)}</td>`;
    for (let j = 1; j < 38; j++) {
        element += `<td>${testDamage[j].toLocaleString("ja-JP")}</td>`;
    }
    element += `</tr>`;
    const rands = randMax - randMin;
    for (let i = 0; i <= rands; i++) {
        element += `<tr><td>${randMin + i}</td>`;
        element += `<td>${damage[i][37].toLocaleString("ja-JP")}</td>`;
        element += `<td>${formatNum(damage[i][0], 4, 1)}</td>`;
        for (let j = 1; j < 38; j++) {
            element += `<td>${damage[i][j].toLocaleString("ja-JP")}</td>`;
        }
        element += `</tr>`;
    }
    tbody.innerHTML = element;
}
document.querySelector('[data-bs-target="#tab4"]').addEventListener("click", () => {
    outputDamage();
    let options = Array.from(optionInput, (input) => parseFloat(input.value));
    modOutput.forEach((output, index) => {
        if (output.disabled === true) output.value = format(mod[index] + (options[index] !== 7));
    });
});

// ダメージ検証行用計算
const testDamage = new Array(38);
const testInput = document.querySelectorAll("input[id^=test]");
function calcTestDamage() {
    Array.from(testInput, (input, index) => (testDamage[index] = input.value === "" ? "" : index === 0 ? parseFloat(input.value) : Math.trunc(parseFloat(input.value))));
    let options = Array.from(optionInput, (input) => parseFloat(input.value));
    for (let i = 0; i < 36; i++) {
        if (testDamage[i] !== "" && (i === 35 || testDamage[i + 1] === "")) {
            testDamage[i + 1] = calcOpt(testDamage[i], mod[i], options[i]);
        }
    }
    testDamage[37] =
        testDamage[36] < 2500000000
            ? testDamage[36]
            : testDamage[36] < 3500000000
            ? Math.trunc(1750000000 + testDamage[36] * 0.3)
            : testDamage[36] < 5000000000
            ? Math.trunc(2450000000 + testDamage[36] * 0.1)
            : testDamage[36] < 10000000000
            ? Math.trunc(2800000000 + testDamage[36] * 0.03)
            : Math.min(Math.trunc(3000000000 + testDamage[36] * 0.01), 9999999999);
}

// ダメージ行変更
function outputTestDamage() {
    const testRow = document.getElementById("test-row");
    let element = '<td><span data-lang="japanese">検証行</span><span data-lang="english" hidden>Test Row</td>';
    element += `<td>${testDamage[37].toLocaleString("ja-JP")}</td>`;
    element += `<td>${testDamage[0] === "" ? "" : formatNum(testDamage[0], 4, 1)}</td>`;
    for (let j = 1; j < 38; j++) {
        element += `<td>${testDamage[j].toLocaleString("ja-JP")}</td>`;
    }
    testRow.innerHTML = element;
}

// 範囲設定
function limit(num, min = -1, max = 1) {
    return Math.min(Math.max(num, min), max);
}

// バフ計算法指定
function calcOpt(base, buff, opt = 1) {
    switch (opt) {
        case 1:
            return Math.floor(base + base * buff);
        case 2:
            return base + Math.floor(base * buff);
        case 3:
            return Math.floor(base * (1 + buff));
        case 4:
            return Math.trunc(base + base * buff);
        case 5:
            return base + Math.trunc(base * buff);
        case 6:
            return Math.trunc(base * (1 + buff));
        case 7:
            return Math.trunc(base * buff);
    }
}

// テキスト全選択
function cursorSet(element) {
    if (vars.moveCursor) {
        element.select();
    }
}
document.addEventListener("click", (tar) => {
    const element = tar.target;
    if (element.matches("input[type=number]")) {
        cursorSet(element);
    }
});

// 遅延用
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// json生成
const inputNum = document.querySelectorAll("input[type=number]");
const inputRadio = document.querySelectorAll("input[type=radio]");
const inputCheckbox = document.querySelectorAll("input[type=checkbox]");

const outputArea = document.getElementById("outputArea");
function makeJson() {
    let json = {
        num: {},
        numDisabled: {},
        radio: {},
        checkbox: {},
    };
    inputNum.forEach((element) => {
        if (element.id) {
            json.num[element.id] = element.value;
            json.numDisabled[element.id] = element.disabled;
        }
    });
    inputRadio.forEach((element) => {
        if (element.id && element.checked) {
            json.radio[element.id] = true;
        }
    });
    inputCheckbox.forEach((element) => {
        if (element.id && element.checked) {
            json.checkbox[element.id] = true;
        }
    });
    return json;
}

// jsonテキスト出力
function outputJsonText() {
    const json = makeJson();
    outputArea.value = JSON.stringify(json, null, 2);
}

// jsonテキストコピー
function copyJsonText() {
    if (!outputArea.value) {
        // 処理なし
    } else {
        try {
            navigator.clipboard.writeText(outputArea.value);
            document.getElementById("copySuccess").hidden = false;
            setTimeout(() => {
                document.getElementById("copySuccess").hidden = true;
            }, 3000);
        } catch (error) {
            try {
                outputArea.select();
                document.execCommand("copy");
                document.getElementById("copySuccess").hidden = false;
                setTimeout(() => {
                    document.getElementById("copySuccess").hidden = true;
                }, 3000);
            } catch (error) {
                document.getElementById("copyFailure").hidden = true;
                setTimeout(() => {
                    document.getElementById("copyFailure").hidden = true;
                }, 3000);
            }
        }
    }
}

// jsonファイル出力
function outputJsonFile() {
    outputJsonText();
    const json = JSON.stringify(makeJson(), null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

document.getElementById("output").onclick = outputJsonText;
document.getElementById("copy").onclick = copyJsonText;
document.getElementById("fileExport").onclick = outputJsonFile;

// jsonテキスト読込
const inputArea = document.getElementById("inputArea");
function inputData() {
    const json = inputArea.value;
    if (json) {
        const data = JSON.parse(json);
        inputNum.forEach((element) => {
            if (element.id && data.num[element.id] !== undefined) {
                element.value = data.num[element.id];
                element.disabled = data.numDisabled?.[element.id] ?? false;
            }
        });
        inputRadio.forEach((element) => {
            element.checked = false;
        });
        inputCheckbox.forEach((element) => {
            element.checked = false;
        });
        inputRadio.forEach((element) => {
            if (element.id && data.radio[element.id] !== undefined) {
                element.checked = data.radio[element.id];
            }
        });
        inputCheckbox.forEach((element) => {
            if (element.id && data.checkbox[element.id] !== undefined) {
                element.checked = data.checkbox[element.id];
            }
        });
    }
    document.querySelectorAll(checkList).forEach((element) => {
        getVariables(element);
        setOtherValue(element);
    });
    document.querySelectorAll("input[id^=multiplier]").forEach((element) => {
        getVariables(element);
    });
    document.querySelectorAll(checkList).forEach((element) => {
        updateSum(element);
        calcBuff(element);
    });
    setBtVar();
    setMods();
    calcDamage();
    calcTestDamage();
    document.getElementById("inputSuccess").hidden = false;
    setTimeout(() => {
        document.getElementById("inputSuccess").hidden = true;
    }, 3000);
    inputArea.value = "";
}

// jsonテキスト貼り付け
function pasteJson() {
    try {
        navigator.clipboard.readText().then((text) => {
            inputArea.value = text;
            inputData();
        });
    } catch (e) {
        document.getElementById("pasteFailure").hidden = false;
        setTimeout(() => {
            document.getElementById("pasteFailure").hidden = true;
        }, 3000);
    }
}

// jsonファイル読み込み
function loadFile() {
    const file = document.getElementById("fileInput").files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            inputArea.value = reader.result;
            inputData();
        };
        reader.readAsText(file);
    }
}

document.getElementById("input").onclick = inputData;
document.getElementById("paste").onclick = pasteJson;
document.getElementById("fileInput").addEventListener("change", loadFile);

// tooltip利用
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl, {
        sanitize: false,
        customClass: "tooltip-multiline",
        template: '<div class="tooltip tooltip-multiline" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    });
});
