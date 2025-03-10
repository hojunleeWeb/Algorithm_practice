//주어진 시작점에서 다른 모든 정점으로의 최단 경로
// vertex는 2만개, edge는 30만개 제한, 각 edge는 가중치 w로 10이하의 자연수

let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
let input = fs
    .readFileSync(filePath)
    .toString()
    .split("\n")
    .map((e) => e.trim());

let nm = input[0].split(" ").map((e) => Number(e));
let n = nm[0];
let m = nm[1];
let startAndEdges = input.slice(1);
let start = Number(startAndEdges[0]);
let input_edges = startAndEdges.slice(1).map((e) => e.split(" ").map((E) => Number(E)));

//console.log(start);
//console.log(input_edges);
//bfs or dfs로 시작점부터 탐색 -> 탐색하면서 저장된 경로의 길이보다 작은 길이를 발견하면 업데이트, 업데이트 되지 못한 위치의 vertex는 INF
//인접리스트? 배열로 하는O(n^2)로 안될듯.. -> 인접리스트로 구현했는데도 안됐다... 왜? 몰라... 인접리스트는 V+E 아닌가?
//다익스트라 문제 -> 최단거리는 그떄의 최단거리들의 합으로 이루어져 있다. -> 최소 힙..?을 공부해야할듯 하다.
class Node {
    constructor(data, weight) {
        this.data = data;
        this.weight = weight;
        this.next = null;
    }
}
class List {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    push(data, weight) {
        let node = new Node(data, weight);
        if (!this.size) {
            //size가 0이면 => list에 아무것도 없으면
            this.head = node;
        } else {
            this.head.next = node;
        }
        this.size++;
    }
    getSize() {
        return this.size;
    }
}
let edges = new Array(n + 1);
for (let i = 0; i < n + 2; i++) {
    edges[i] = new List();
}
for (let i = 0; i < m; i++) {
    let edgeStart = input_edges[i][0];
    let edgeEnd = input_edges[i][1];
    let edgeWeight = input_edges[i][2];
    //console.log("start : %d , end : %d, weight : %d ", edgeStart, edgeEnd, edgeWeight);
    edges[edgeStart].push(edgeEnd, edgeWeight);
}
//console.log(edges);
let visited = new Array(n + 1).fill(0);
let ans = new Array(n + 1).fill(Infinity);

function dfs(vertex, sum) {
    //
    //console.log("vertex : %d, sum : %d", vertex, sum);
    let nx_v = edges[vertex].head;
    while (nx_v !== null) {
        let nx_data = nx_v.data;
        let nx_weight = nx_v.weight;
        if (!visited[nx_data]) {
            visited[nx_data] = 1;
            ans[nx_data] = ans[nx_data] < sum + nx_weight ? ans[nx_data] : sum + nx_weight;
            dfs(nx_data, sum + nx_weight);
            visited[nx_data] = 0;
            nx_v = nx_v.next;
        }
    }
}
visited[1] = 1;
ans[start] = 0;
dfs(start, 0);
for (let i = 1; i <= n; i++) {
    if (ans[i] === Infinity) {
        console.log("INF");
    } else {
        console.log(ans[i]);
    }
}
