//최소 힙을 공부하기 위해서 다익스트라 문제를 또 도전
//힙 -> 완전 이진 트리의 일종으로 우선순위 큐를 구현할 때 사용된다.
//큐 -> 선입선출 형식의 자료 구조인데 우선순위 큐는 input의 순서가 아니라 어떠한 weight로 우선순위를 두고 이에 따라 output의 순서가 결정된다.
//우선순위 큐 -> 기준에 따라 최대 힙과 최소 힙으로 나뉘고
//최대 힙 : 부모 노드의 값은 항상 자식 노드의 값보다 크거나 같은 완전 이진 트리이다. 즉, 루트 노드의 값은 어떠한 노드보다 큰 최대값이다.
//최소 힙 : 부모 노드의 값은 항상 자식 노드의 값보다 작거나 같은 완전 이진 트리이다. 즉, 루트 노드의 값은 어떠한 노드보다 작은 최소값이다.
//주의 : 힙은 완전한 정렬 상태가 아니다. 완전한 힙 트리를 완성한 이후 dfs를 이용해 리프 노드까지의 dfs 트리의 경우 정렬된 상태이지만, 같은 부모를 둔 자식 노드의
//크기 차이는 고려되지 못한다.(코드로 구현할때 아마 작은건 왼쪽이나 오른쪽으로 고정시켜서 구현할듯 하다.)
//우선순위 큐를 구현할 때 내부적으로 최소 힙 또는 최대 힙을 이용하게 되는데, 이때 삽입과 삭제에 각각 O(longN)의 시간복잡도를 가진다.
//삽입 -> 어떠한 값에 대해 루트 노드부터 좌우 노드로 값을 비교해가며 방향을 결정한다. 최악의 경우 이진트리의 리프노드까지 진행되므로 이는 O(logN)이 된다.
//삭제 -> 부모 노드와 자식 노드 사이의 어떠한 노드를 삭제할때 해당 자식 노드들로 이루어진 sub heap tree를 하나의 이진 트리로 보고 새로 만든다.
//-> 아니다!, 우선순위큐의 정의에 의해 삭제하는 노드는 무조건 루트 노드가 된다!
//이때 삭제한 노드의 자식 노드끼리 값을 비교후 루트 노드를 결정, 이렇게 루트 노드가 된 노드의 자식 노드들과 또 남은 본자식 노드와 비교, 이런식으로 반복하면,
//탐색해 비교해야 하는 노드의 숫자는 logN개..? -> 자식 노드 2개의 크기 비교도 하지 않았다. 즉, 조건은 부모 노드와 자식 노드끼리만 존재하며,
//이로 인해 삭제할때 비교해야하는 노드의 숫자는, 본자식 노드 2중에서 루트 노드로 올라간 노드의 자식 노드들 전체임으로 logN이 된다.

//기본적인 heap을 구현한 이후 이를 상속받아 min Heap과 max Heap을 구현할 수도 있지만,
//min Heap을 구현하고 max Heap이 필요하면 파라미터로 음수로 받아주면 된다.

//힙의 구조상 부모와 자식간에 아래와 같은 관계가 성립한다.
//왼쪽 자식의 index = 부모의 index * 2 + 1 -> 여기서 index는 트리 구조상 노드부터 0,1,2,3...순으로 붙어진다.
//오른쪽 자식의 index = 부모의 index * 2 + 2 = 왼쪽 자식의 index + 1
//부모의 index = Math.floor((자식의 index - 1) / 2)

//heap 기본 연산 메소드
class MinHeap {
    constructor() {
        // 힙을 저장할 배열
        this.heap = [];
    }

    // 힙의 크기를 반환하는 메서드
    size() {
        return this.heap.length;
    }

    // 두 값을 바꿔주는 메서드
    swap(idx1, idx2) {
        [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
        //이건 무슨 연산이냐... 구조 분해 할당 -> 이런게 있엇구먼
        //https://miiingo.tistory.com/364
    }
    //min Heap의 삽입 연산은 다음과 같이 이뤄진다.
    //Heap의 마지막 위치에 요소를 추가한다.
    //새로운 요소를 추가한 위치에서부터, 부모 노드와 새로 추가된 노드의 값을 비교한다.
    //만약 새로 추가된 노드의 값이 부모 노드의 값보다 작다면, 부모 노드와 새로 추가된 노드의 위치를 교환한다.
    //이전 단계에서 교환된 새로 추가된 노드와 부모 노드의 값 비교를 반복한다. 이 단계를 반복하여 Min Heap의 규칙을 지키도록 한다.
    add(data) {
        this.heap.push(data);
        //bubbleUp 단계
        let add_idx = this.heap.size() - 1;
        let parent_idx = Math.floor((add_idx - 1) / 2); //자식의 인덱스를 이용해, 부모의 인덱스를 구한다.
        while (this.heap[parent_idx] && this.heap[parent_idx] < this.heap[add_idx]) {
            //부모 노드가 존재하는지도 체크해야한다.
            this.swap(parent_idx, add_idx); // 두 인덱스의 값을 swap
            add_idx = parent_idx; // 인덱스를 원래 부모의 인덱스로 변경
            parent_idx = Math.floor((add_idx - 1) / 2); //부모 인덱스를 변경
        }
    }
    //min heap의 삭제 연산
    //Heap에서 가장 작은 값을 가진 노드(루트 노드)를 제거한다. 이때, Min Heap에서 가장 작은 값은 루트 노드이다.
    //Heap의 맨 마지막에 있는 노드를 새로운 루트 노드로 이동시킨다.
    //새로운 루트 노드와 자식 노드의 값을 비교하여, 자식 노드의 값이 작다면 루트 노드의 위치를 교환한다.
    //이전 단계에서 교환된 새로운 루트 노드와 자식 노드의 값 비교를 반복한다. 이 단계를 반복하여 Min Heap의 규칙을 지키도록 한다
    delete() {
        if (this.heap.size() === 1) {
            return this.heap.pop();
        }
        let return_value = this.heap.pop(); //배열에서 pop은 마지막값을 삭제하고 반환한다...
        //root 노드의 자식 노드를 새로운 root 노드로 취할려니 코드로 어떻게 짤지가 의문이다.
        //그래서 마지막 노드 값을 새로운 root 노드로 선택하고 트리를 탐색하면서 업데이트 한다.
        this.heap[0] = this.heap.pop();

        let parent_idx = 0;
        let leftChild_idx = 1;
        let rightChild_idx = 2;
        while ((this.heap[leftChild_idx] && this.heap[parent_idx] > this.heap[leftChild_idx]) || (this.heap[rightChild_idx] && this.heap[parent_idx] > this.heap[rightChild_idx])) {
            //left child와 right child는 존재할 수 없기도 하기에 그에 대한 존재 확인이 필수적이다.
            //존재해야만 교환할 이유가 생기기에 존재하지 않으면 교환할 필요없이 통과해도 된다. 또한 한쪽만 있어도 비교는 해봐야하기에 ||을 사용한다.
            //child 중에 parent node보다 작은 값을 발견하면
            let small_idx = this.heap[rightChild_idx] > this.heap[leftChild_idx] ? this.heap[leftChild_idx] : this.heap[rightChild_idx];
            //이렇게 하면 오른쪽 child가 널인 경우에 어떻게 돌아갈런지 모르겠다.
            //min Heap은 parent node가 무조건 child node보다 커야하기에, 둘중 더 작은값을 root 노드로 설정한다.
            this.swap(parent_idx, small_idx);
            parent_idx = small_idx;
            leftChild_idx = parent_idx * 2 + 1;
            rightChild_idx = parent_idx * 2 + 2;
        }
    }
}

//reference
//https://chamdom.blog/heap-using-js/
//https://suyeon96.tistory.com/31
