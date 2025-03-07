let fs = require("fs");
let input = fs
    .readFileSync("test.txt")
    .toString()
    .trim()
    .split("\n")
    .map((e) => e.split(" "));

let n = Number(input[0]);
let arr = [];

for (let i = n; i > 0; i--) {
    arr.push(i);
}
if (arr.length !== 1) {
    arr.pop();
}

while (arr.length > 1) {
    //    console.log(arr);
    let top = arr[arr.length - 1];
    arr = [top].concat(arr.slice(0, -1));

    //    console.log(arr);

    arr.pop();
}
console.log(arr[0]);

//메모리 초과로 실패....
//배열의 크기가 계속 변화함에 따라 인덱스 번호의 변화로 인해 시간복잡도가 커진다
//인접리스트를 활용하기 위해 node와 linkedlist의 구현을 통해 해결해야한다.
