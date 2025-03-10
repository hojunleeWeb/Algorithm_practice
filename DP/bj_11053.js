let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
let input = fs
    .readFileSync(filePath)
    .toString()
    .split("\n")
    .map((e) => e.trim());

let n = Number(input[0]);
//console.log(n);
let arr = input[1].split(" ").map((e) => Number(e));
//console.log(arr);

//수열 a에서 가장 긴 증가하는 부분 수열을 구하는 프로그램
// 1 <= n <= 1000, 1 <= ai <= 1000
// 가장 긴 증가하는 수열 -> 이전에 수열의 최대값과 현재 값을 비교해야 한다. -> 수열의 최대값을 유지해야 한다.
// 수열의 길이를 index로 하는 배열 res을 생성, arr을 탐색하면서 res를 업데이트 하는데 res의 배열 값에는 해당 길이의 수열의 최대값을 저장한다.
// 즉 어떤 인덱스 값 i에 대해서 res[i] > x 가 성립한다면 i라는 길이를 이루는 수열에서 최대값 res[i]보다 작은 값을 발견했다는 뜻이므로
// res[i]의 값을 x로 업데이트 한다.-> 이것은 가장 최선적으로 증가 수열을 만들기 위함이며, 증가 수열을 가장 효율적으로 만들기 위해서는
// 최대값을 가장 작은 값으로 갖고 있는것이 현명하다. 즉 어떠한 수열 길이 i를 가진 부분 수열 x1,x2...xi가 있다고 할때 xi보다 작은 x를 발견한다면... -> 이 방법은 xi-1이 x보다 작음을 확실할 수 없다.

// res[i] = i 길이를 가진 수열의 최대값으로 정의 -> arr을 탐색하면서 res[k] > x를 발견하면 res[k]값을 업데이트한다.
// 위에서 고려했던 것처럼 xi-1 > x를 성립하는 xi-1이 존재한다고 할때, 이 경우 우리는 k = i인 값을 탐색하기 전 xj < x < xj+1(xj,xj+1는 x1,x2...xi에 포함)를 성립하는
// index값 j를 발견할 수 있고 이 경우 res[j] 값을 업데이트하는 것으로 끝나게 된다.

let result = new Array(n + 1).fill(1001); // 수열의 길이를 index로 갖고 r(i) = 해당 부분 수열에서 가장 큰 수이다.
let arr2 = new Array(n + 1).fill(0);

for (let i = 0; i < n; i++) {
    let x = arr[i];
    for (let j = 1; j <= n; j++) {
        if (x <= result[j]) {
            result[j] = x;
            arr2[i + 1] = j;
            break;
        } else if (result[j] === 1001) {
            result[j] = x;
            arr2[i + 1] = j;
            break;
        }
    }
}
let max = 0;
for (let i = 1; i < n + 1; i++) {
    max = arr2[i] > max ? arr2[i] : max;
}
console.log(max);

// 실제 적용한 방법은 길이 수열 전체를 전부 반복한다. 즉 nlogn ?
