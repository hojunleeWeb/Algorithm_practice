let fs = require("fs");
let input = fs
    .readFileSync("test.txt")
    .toString()
    .split("\n")
    .map((e) => e.split(" "));

let arr = input[0].map((e) => Number(e));
let n = arr[0];
let m = arr[1];
//1.. n까지의 자연수 범위내에서 m개의 증가수열을 중복없이 모두 출력
//n,m 범위가 너무 작아서 1초내에면 그냥 모두 탐색해도 될듯?
//첫번째 숫자를 고르는 반복문을 유지한채로 2번째 반복문에서 ... -> 그냥 쌩 반복문으로 하면 m중 반복문이 필요하다...
//1..n까지의 자연수 범위내에서 m개의 중가수열의 수 = 2..n까지의 자연수 범위내에서 m개의 증가수열의 수 + 2..n까지의 자연수 범위내에서 m-1개의 증가수열의 수
//S[n,m] = S[n-1,m-1] + S[n-1,m]
//S[1,8,8] = S[2,8,8] + S[2,8,7]
// 구현을 못하겠다...

//dp인줄 알았는데 dfs를 사용한 백트랙킹 문제였다...
//dfs => 깊이 우선 탐색, 기준점을 root로 하여 가장 depth가 높은 루트를 먼저 찾는다.
//탐색하면서 기준에 맞는 점을 발견하면 그 점에 대해서 또다시 dfs를 진행한다.
//반복적으로 진행하기에 자식의 dfs의 방문이 부모의 dfs에서 방문했던 점을 또다시 반복할 수 있으며 이를 방지하기 위해 어떤 점에서
//dfs를 실행할 경우 방문했단는 기록을 남겨야하며 해당 dfs 트리가 완성되거나 break 될경우 다른 dfs가 방문할 수 있도록 기록을 해제한다.

let array1 = new Array(m);
let visited = new Array(n).fill(0);

dfs(1, 0);

function dfs(x, cnt) {
    if (cnt === m) {
        let str1 = "";
        for (let i = 0; i < array1.length; i++) {
            if (i === array1.length - 1) {
                str1 += array1[i];
                break;
            }
            str1 += array1[i] + " ";
        }
        console.log(str1);
    }
    for (let i = x; i < n + 1; i++) {
        if (visited[x] === 0) {
            visited[x] = 1;
            array1.push(x);
            dfs(x + 1, cnt + 1);
            visited[x] = 0;
            array1.pop(x);
        }
    }
}
