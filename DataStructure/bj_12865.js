let fs = require("fs");
const { json } = require("stream/consumers");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
let input = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split("\n")
    .map((e) => e.replace("\r", ""));

let firstLine = input[0].split(" ");
let n = Number(firstLine[0]);
let m = Number(firstLine[1]);
//console.log(n, m);

let arr = input.slice(1).map((e) => e.split(" "));
arr = arr.map((e) => e.map((k) => Number(k)));
let ans = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
//무게 제한을 두고 최대한의 가치를 갖도록 골라야한다.
//bfs? dfs? 가장 가치있는 sub edge를 구하는 법?
//100개에 2초... O(n^3)까지는 괜찮나?
//무게만 된다면 1...n까지 모두 골라고 된다. -> dfs를 써보자 -> 시간초과가 나왔다.... 전체 경우를 모두 탐색하는건 100! 인가?
//결론 dp로 푸는 문제였다...
//dp라면 무엇이 기준일까? 무게? 아니면 갯수?
//무게가 w인 최대 가치합을 S(w)라하면 S(w) = Max(S(w-1)+S(1),S(w-2)+S(2)...)?

for (let i = 0; i <= m; i++) {
    //일단 입력된 weight를 그대로 배열에 적용
    //ans[Number(arr[i][0])] = ans[Number(arr[i][0])] > Number(arr[i][1]) ? ans[Number(arr[i][0])] : Number(arr[i][1]);
    //만약 같은 weight를 가진 가방이 여러개 있다면 그중에서 가장 큰값을 갖도록 설정 -> 이게 아니다...
    //같은 weight를 여러개 사용할수 없다고 나와있지 않았으니 같은 weight를 여러개 선택할 경우도 생각해야된다... -> 이게 어떻게 하지
    for (let j = 0; j <= n; j++) {
        if (i == 0 || j == 0) {
            ans[i][j] = 0;
            continue;
        }
        let now_weight = arr[j - 1][0];
        let now_value = arr[j - 1][1];

        if (arr[j - 1][0] > i) ans[i][j] = ans[i][j - 1];
        else {
            ans[i][j] = ans[i][j - 1] > ans[i - now_weight][j - 1] + now_value ? ans[i][j - 1] : ans[i - now_weight][j - 1] + now_value;
        }
    }
}
//console.log(ans);
console.log(ans[m][n]);
//2차원 행렬을 사용한다. 즉 점화식은 S(i,j)가 사용되며 i는 무게, j는 아이템 순서를 나타낸다.
//즉 S(2,3)은 무게제한이 2kg일때 j번째 가방을 고를수있을때 까지의 최대가치값이다
//이 경우 무게 제한이 없는 한 가장 최대의 가치값을 골라야되는데
//이전의 값이 내 값이 되는 경우(이 경우 무조건 2,3등 정확한 값의 무게를 담는것이 아니다) vs 새로운 가방이 나타나는 경우이다.
//S(3,i)에 대해서는 S(3,2)까지는 0이다. (3,6)은 3번째 가방이므로 S(3,3)부터 6이되며 S(3,4)는 4번째 가방을 고를수 있지만
//현재 무게 제한은 3이므로 무게가 5인 물건을 담을 수 없다. 따라서 이전 값인 S(3,3)의 값인 6이된다.
//S(4,2)부터 값은 8이 되는데 S(4,3)을 구할때 우리는 S(3,3) 또한 담을 수 있다.

//https://velog.io/@js43o/%EB%B0%B1%EC%A4%80-12865%EB%B2%88-%ED%8F%89%EB%B2%94%ED%95%9C-%EB%B0%B0%EB%82%AD
