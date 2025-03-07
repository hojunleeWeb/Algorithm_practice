let fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
let input = fs
    .readFileSync(filePath)
    .toString()
    .trim()
    .split("\n")
    .map((e) => e.replace("\r", ""));

//linkedlist를 사용하는법
//queue의 함수를 구현하자 -> linkedlist가 효율적이다

class Node {
    //class는 호출되기전에 정의되어야한다. 그렇지 않으면 referenceError
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
class Queue {
    constructor() {
        this.front = null; // front,rear은 객체를 가리킨다, 숫자가 아니다
        this.rear = null;
        this.size = 0;
    }
    push(data) {
        const node = new Node(data);
        if (!this.front) {
            this.front = node;
            this.rear = node;
        } else {
            this.rear.next = node;
            this.rear = node;
        }
        this.size++;
    }
    pop() {
        if (!this.front) return -1; //현재 queue가 비어있을때
        const data = this.front;
        if (!this.front.next) {
            //queue의 길이가 1일때 -> pop하면 길이는 0
            this.front = null;
            this.rear = null;
        } else {
            this.front = this.front.next;
        }
        this.size--;
        return data.data;
    }
    isEmpty() {
        return this.size === 0 ? 1 : 0;
    }
}
let n = Number(input[0]);
let commands = input.slice(1).map((e) => e.split(" "));
let queue = new Queue();
for (let i = 0; i < n; i++) {
    let command = commands[i];
    let com = command[0];
    let data = !command[1] ? 0 : Number(command[1]);
    //console.log("command : " + com + " data : " + data + " queue : " + queue);
    switch (com) {
        case "push":
            queue.push(data);
            break;
        case "empty":
            console.log(queue.isEmpty());
            break;
        case "pop":
            console.log(queue.pop());
            break;
        case "size":
            console.log(queue.size);
            break;
        case "front":
            console.log(!queue.front ? -1 : queue.front.data);
            break;
        case "back":
            console.log(!queue.rear ? -1 : queue.rear.data);
            break;
    }
}
