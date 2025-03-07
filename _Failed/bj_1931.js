//https://yong-nyong.tistory.com/21

//모르겠다.

//가장 많은 회의실을 쓰기위해선 가장 빨리 끝나야 한다. 그리고 늦게 시작해야한다.
//우선 정렬은 끝나는 시간 순으로 정렬한다.
//그리고 끝나는 시간이 같을 경우 가장 늦게 시작하는 경우를 고른다.

let fs = require("fs");
let input = fs
    .readFileSync("test.txt")
    .toString()
    .split("\n")
    .map((e) => e.replace("\r", ""));

let n = Number(input[0]);
let times = input.slice(1).map((e) => e.split(" ").map((E) => Number(E)));

times.sort((a, b) => {
    if (a[1] === b[1]) {
        return b[0] - a[0];
    } else {
        return a[1] - b[1];
    }
});

let ans = 0;
let j = 0;
times.forEach((e) => {
    if (e[0] >= j) {
        ans++;
        j = e[1];
    }
});
console.log(ans);
