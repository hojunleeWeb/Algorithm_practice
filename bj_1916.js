let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
let input = fs
    .readFileSync(filePath)
    .toString()
    .split("\n")
    .map((e) => e.trim());
//console.log(input);
let n = Number(input[0]);
let m = Number(input[1]);
let bus = input.slice(2, -1).map((e) => e.split(" ").map((E) => Number(E)));
let [start, end] = input
    .pop()
    .split(" ")
    .map((e) => Number(e));
console.log(start, end);
//n개의 도시에서 각각의 도시로 가는 m개의 버스가 있는데, 여기서 A -> B까지 가는 버스의 조합의 비용을 최소화할것이다.
//버스의 비용의 최소합은 각 도시에서 어떤 도시로 가는데 optimal solution은 A에서 연결된 거리 중 최소를 고를때와 같다라고 하자
//A -> D까지의 거리의 최소를 d라 하면
//즉 최적해는 A -> D 가 되는것이다. 하지만 K를 거치는 solution이 있고 이를 그리디가 고려하지 못했다고 하자.
// A -> ... K -> ... D가 되는데 이 경우 d(A,D) > d(A,K)+ d(K,D)가 된다. 즉 d(A,k) < d(A,D)이며 이는 그리디 알고리즘으로 전제한 것에 모순이 된다.
// 즉 i,j까지의 최소길이는 D(i,j) = min(이전의 d(i,j), d(i,k) + d(k+j) 새로운 k)

//다익스트라 알고리즘은 어떠한 하나의 정점에서 다른 하나의 정점까지의 최소 거리를 나타내며, 음수 간선 또는 음수 cycle이 있으면 사용할 수 없다.
//음수 간선이 있을 경우는 벨만-포드 알고리즘을 사용하자.

//그리디 알고리즘의 원리를 차용 -> 현재 출발 정점 A에 대해서 연결된 간선중에서 가장 짧은 길이를 선택한다.
//즉 처음엔 0, inf, inf, inf, inf...로 시작하지만 만약 2번째 vertex가 인접한다면
// 0, 2, inf, inf, inf, inf... 로 업데이트 된다. vertex 2의 간선이 3,4로 이어진다면
//-> edge를 선택하고 그 edge와 이어진 vertex가 인접한 vertex에 대한 길이를 업데이트 한다. 즉 선택된 edge를 이용해 시작점으로부터 새로운 vertex로의 루트가 만들어졌다.
// 0, 2, 4, 5, inf, inf ...로 업데이트 된다. 이후 vertex 2는 방문했다고 체크되게 된다.
class Node {
    constructor(end, weight) {
        this.end = end;
        this.weight = weight;
    }
    bigger(node2) {
        return this.weight > node2.weight;
    }
}
class minHeap {
    //minheap은 완전이진트리 자료구조인 heap의 구조를 따르면서 parent node가 child node 보다 값이 작음을 보장
    //기본적인 minheap 구조는 데이터 하나만 갖고있는 구조이다. 하지만 해당 문제에서는 데이터가 목적지, 값이 있으며 이 값에
    //의해 우선순위가 변화하는 구조를 생각해야된다.... -> push일때 파라미터로 data1,data2로 주어도 되고, 새로운 class를 정의해서
    //변수?가 2개인 class로 정의해서 이 class가 minHeap의 개체가 되도록 만든다.
    constructor() {
        this.heap = [];
    }
    size() {
        return this.heap.length;
    }
    swap(idx1, idx2) {
        [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
    }
    push(node) {
        this.heap.push(node);
        let add_idx = this.size() - 1;
        let parent_idx = Math.floor((add_idx - 1) / 2);
        while (this.heap[parent_idx] && this.heap[parent_idx].bigger(this.heap[add_idx])) {
            this.swap(add_idx, parent_idx);
            add_idx = parent_idx;
            parent_idx = Math.floor((add_idx - 1) / 2);
        }
    }
    pop() {
        if (this.size() === 1) return this.heap.pop();
        this.swap(0, this.size() - 1); //마지막값과 루트 노드 값을 교환
        let return_value = this.heap.pop(); //이경우 원래 루트 노드 값이 삭제
        //이 경우 가장 마지막 삽입한 자료가 루트 노드로 올라가 있다. -> 이를 바꿔야된다.
        let parent_idx = 0;
        let leftChild_idx = parent_idx * 2 + 1;
        let rightChild_idx = parent_idx * 2 + 2;
        while ((this.heap[leftChild_idx] && this.heap[leftChild_idx].bigger(this.heap[parent_idx])) || (this.heap[rightChild_idx] && this.heap[rightChild_idx].bigger(this.heap[parent_idx]))) {
            let small_idx = leftChild_idx;
            if (this.heap[rightChild_idx]) {
                small_idx = this.heap[rightChild_idx].bigger(this.heap[leftChild_idx]) ? leftChild_idx : rightChild_idx;
            }
            this.swap(parent_idx, small_idx);
            parent_idx = small_idx;
            let leftChild_idx = parent_idx * 2 + 1;
            let rightChild_idx = parent_idx * 2 + 2;
        }
        return return_value;
    }
}

let distance = new Array(n + 1).fill(Infinity);
let priorityQue = new minHeap();
let visited = new Array(n + 1).fill(0);
let edges = Array.from({ length: n + 1 }, () => new Array());

for (let i = 0; i < m; i++) {
    let edge = bus[i];
    let edge_start = edge[0];
    let edge_end = edge[1];
    let edge_weight = edge[2];
    let node = new Node(edge_end, edge_weight);
    edges[edge_start].push(node);
}

visited[start] = 1;
distance[start] = 0;
let start_node = new Node(start, 0);
priorityQue.push(start_node);

while (priorityQue.size() > 0) {
    let vertex = priorityQue.pop().end;

    for (let i = 0; edges[vertex] && i < edges[vertex].length; i++) {
        let edges_end = edges[vertex][i].end;
        let edges_weight = edges[vertex][i].weight;
        distance[edges_end] = distance[edges_end] > distance[vertex] + edges_weight ? distance[vertex] + edges_weight : distance[edges_end];
        let node = new Node(edges_end, edges_weight);
        priorityQue.push(node);
    }
    visited[vertex] = 1;
}
console.log(distance[end]);
