let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
let input = fs
    .readFileSync(filePath)
    .toString()
    .split("\n")
    .map((e) => e.trim());

let n = Number(input[0]);
let arr = input[1].split(" ").map((e) => Number(e));
// 증가하는 부분 수열의 길이의 최대값 찾기2 이다.
// 여기선 n과 값의 범위가 1,000,000으로 커졌다.
// 1에서 했던 방식이 nlogn 아닌가? -> 시간초과 발생... n^2 인가?

// 방식은 똑같이 하되, subSequence_max_arr를 탐색하는 방법을 이진탐색으로 하자?

let subSequenceMax = new Array(1000000).fill(1000001); //증가 수열의 길이를 index(0 ~ n-1까지)로 가지며, 해당 수열의 최대값을 값으로 가지는 배열
let indexOfSubSequenceLength = new Array(n); //arr과 같은 index를 가지며, 해당 원소를 최대값으로 하는 증가 수열의 길이

for (let i = 0; i < n; i++) {
    let value = arr[i];

    if (i === 0) {
        subSequenceMax[0] = value;
        indexOfSubSequenceLength[0] = 0;
        continue;
    }

    let start = 0;
    let end = subSequenceMax.length;
    let index = Math.floor((start + end) / 2);
    do {
        //console.log("start : %d, end : %d, index : %d, value : %d", start, end, index, value);
        if (subSequenceMax[index] < value) {
            //이전까지 탐색했을때 index의 길이를 가진 증가 수열의 최대값 보다 value가 크면
            start = index; //start를 오른쪽으로
        } else if (subSequenceMax[index] > value) {
            end = index; //end를 왼쪽으로
        } else {
            //index의 길이를 가진 증가 수열의 최대값과 value가 같으면
            indexOfSubSequenceLength[i] = index; // 해당 인덱스가 arr 배열의 원소를 최대값으로 갖는 수열의 길이이다.
            break;
            //해당 길이의 배열의 최대 값은 같으므로 업데이트 안해도 된다.
        }
        index = Math.floor((start + end) / 2); //왼쪽에서 탐색
        //console.log("start : %d, end : %d, index : %d, value : %d", start, end, index, value);
    } while (start < end); // 왜 이진 탐색이 안되지....
    //value와 같은 값을 찾을 수 없다 => 이 경우 반복문이 끝났을때 index = 작은값 -> 큰값이 되는 작은값 or 큰값의 index와 동일한가?
    //맞는거 같은데? -> 무조건 index = 작은값을 가리킨다 -
    subSequenceMax[index] = value;
    
}
//console.log(indexOfSubSequenceLength);
//console.log(subSequenceMax);
let max = 0;
for (let i = 0; i < n; i++) {
    max = max < indexOfSubSequenceLength[i] ? indexOfSubSequenceLength[i] : max;
}
console.log(max + 1);
//틀렸다...
