let fs = require("fs");
let input = fs
    .readFileSync("test.txt")
    .toString()
    .trim()
    .split("\n")
    .map((e) => e.split(" "));

let n = Number(input[0]);
let node = input.slice(1).map((e) => e.map((E) => E.replace("\r", "")));
node = node.map((e) => e.map((E) => Number(E)));
//console.log(node);
let visited = Array.from(Array(n), () => Array(n).fill(0));
let ans = 0;
for (let r = 0; r <= 100; r++) {
    //todo
    let aft_ans = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (r >= node[i][j]) visited[i][j] = 1;
        }
    }
    //console.log("빗물로 잠기는 영역 : 빗물 = " + r);
    // console.log(visited);
    for (let i = 0; i < n; i++) {
        //빗물에 잠기지 않은 지점을 찾아 그 영역에서 dfs를 수행
        for (let j = 0; j < n; j++) {
            let temp = 0;
            if (!visited[i][j]) {
                visited[i][j] = 1;
                dfs(i, j, temp); //dfs를 수행하면 해당 dfs는 하나의 영역에 대한 모든 지점을 탐색하게 된다.
                if (!temp) aft_ans++; //dfs의 수행이 끝날때마다 우리는 하나의 영역의 모든 지점을 방문한다.
            }
        }
    }
    //console.log("빗물 양 : " + r + "일때의 그룹수 : " + aft_ans);
    if (ans < aft_ans) ans = aft_ans;
    visited = Array.from(Array(n), () => Array(n).fill(0));
}
console.log(ans);

function dfs(x, y, cnt) {
    let va_x = [-1, 1, 0, 0];
    let va_y = [0, 0, -1, 1];

    for (let i = 0; i < 4; i++) {
        let nx_x = x + va_x[i];
        let nx_y = y + va_y[i];
        if (nx_x >= 0 && nx_x < n && nx_y >= 0 && nx_y < n) {
            if (!visited[nx_x][nx_y]) {
                cnt++;
                visited[nx_x][nx_y] = 1;
                //console.log("( " + nx_x + " , " + nx_y + " )에 대한 dfs 시작");
                //console.log(visited);
                dfs(nx_x, nx_y);
            }
        }
    }
}

//문제 해석이 제일 어려웠다.. 안전한 영역을 구하는것, 즉 dfs나 bfs로 탐색했을때 하나의 탐색 트리로서 정의될수 있는 하나의 node 그룹의 숫자를 탐색하는 것이였다.
//2차 배열의 최대 크기가 100x100으로 10000이며
//비의 숫자의 범위는 101, 모든 범위를 전부 탐색해서 찾을 수 있는가?
//처음 모든 배열값을 탐색해서 가라앉는 지점을 visited에 체크 = O(n^2)
//모든 배열값을 탐색해서 아직 가라앉지 않는 지점을 시작점으로 삼아 dfs를 실행 => 결국 모든 지점이 visited될때까지 탐색하므로 O(n^2)
//하나의 빗물양을 정했을때 걸리는 시간이 2*O(n^2) 이므로 전체 소요시간은 O(n^3)
//그리고 그룹수를 판단하는 구문의 위치라든지 자잘한 부분에서 시간이 많이 걸린듯 하다.

//더 빠른 방법이 있을까?
//빗물양을 무조건 100까지 해야할까? -> 빗물양을 통제하는 반복문을 do ~while문을 사용해서 가장 첫번째로 선택되는 빗물양, 즉 0일때
//0보다 낮은 높이의 지점을 visited에 업데이트하는 동시에 전체 배열에서 가장 큰 높이 값을 가져와 우리는 그 값을 최대의 빗물양 값으로 선택한다.
