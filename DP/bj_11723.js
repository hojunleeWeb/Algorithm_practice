let fs = require("fs");
let input = fs
    .readFileSync("test.txt")
    .toString()
    .split("\n")
    .map((e) => e.split(" "));

let m = Number(input[0]);
let orders = input.slice(1).map((e) => e.map((E) => E.replace("\r", "")));
let arr = new Array(21);
arr = Array.from({ length: 21 }, () => 0);

orders.forEach((e) => {
    let order = e[0];
    let num = Number(e[1]);
    cal(order, num);
});
function cal(order, num) {
    if (order === "empty" || order === "all") num = 0;
    console.log("order : " + order + " num : " + num + " arr : " + arr);
    switch (order) {
        case "add":
            arr[num] = 1;
            break;
        case "remove":
            arr[num] = 0;
            break;
        case "check":
            console.log(arr[num]);
            break;
        case "toggle":
            arr[num] = arr[num] === 0 ? 1 : 0;
            break;
        case "all":
            arr = Array.from({ length: 21 }, () => 1);
            break;
        case "empty":
            arr = Array.from({ length: 21 }, () => 0);
            break;
    }
}
// node js 제출 제한으로 확인 불가능
