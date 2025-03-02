let fs = require("fs");
let input = fs
    .readFileSync("test.txt")
    .toString()
    .trim()
    .split("\n")
    .map((e) => e.split(" "));
let n = Number(input[0]);
let node = input.slice(1);
node = node.map((e) => e.map((E) => Number(E)));

let ans = new Array(n + 1).fill(0); //각 노드의 depth를 기록
let visited = new Array(n + 1).fill(0);
let vertex = Array.from(Array(n + 1), () => new Array());

for (let i = 0; i < node.length; i++) {
    vertex[node[i][0]].push(node[i][1]);
    vertex[node[i][1]].push(node[i][0]);
}
//console.log(vertex);

visited[1] = 1;
dfs(1, 0);
//console.log(ans);
for (let i = 2; i < ans.length; i++) {
    console.log(ans[i]);
}
function dfs(x, depth) {
    for (let i = 0; i < vertex[x].length; i++) {
        if (vertex[x].length !== 0) {
            //typeError가 4번 발생했다 -> 따라서 참조하기 전에 해당 배열에 값이 있는지 확인한다.
            let nx_x = vertex[x][i]; //배열값을 참조할때 해당 값이 없으면 type error가 발생한다
            if (nx_x !== null && !visited[nx_x]) {
                visited[nx_x] = 1;
                depth += 1;
                ans[nx_x] = x;
                //console.log("탐색 " + x + " -> " + nx_x);
                dfs(nx_x, depth);
                visited[nx_x] = 0;
            }
        }
    }
} //dfs 깊이 우선 탐색 ->
