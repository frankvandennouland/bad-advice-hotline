package algorithm

import (
	"container/heap"
	"context"
)

type Point struct {
	X int
	Y int
}

type PathRequest struct {
	Grid  [][]bool // true represents wall, false represents path
	Start Point
	End   Point
}

type PathResponse struct {
	Path []Point
}

//encore:api private
func FindAStarPath(ctx context.Context, req *PathRequest) (*PathResponse, error) {
	if len(req.Grid) == 0 || len(req.Grid[0]) == 0 {
		return &PathResponse{Path: []Point{}}, nil
	}

	// A* pathfinding implementation
	height := len(req.Grid)
	width := len(req.Grid[0])

	// Create closed set and open heap
	closedSet := make(map[Point]bool)
	openHeap := &PriorityQueue{}
	heap.Init(openHeap)

	// Create came from map to reconstruct path
	cameFrom := make(map[Point]Point)

	// Create cost maps
	gScore := make(map[Point]int)
	fScore := make(map[Point]int)

	// Initialize start node
	start := req.Start
	gScore[start] = 0
	fScore[start] = heuristic(start, req.End)
	heap.Push(openHeap, &Node{point: start, priority: fScore[start]})

	// Main loop
	for openHeap.Len() > 0 {
		current := heap.Pop(openHeap).(*Node).point

		if current == req.End {
			return &PathResponse{Path: reconstructPath(cameFrom, current)}, nil
		}

		closedSet[current] = true

		// Check neighbors
		neighbors := []Point{
			{current.X - 1, current.Y},
			{current.X + 1, current.Y},
			{current.X, current.Y - 1},
			{current.X, current.Y + 1},
		}

		for _, neighbor := range neighbors {
			if neighbor.X < 0 || neighbor.X >= width ||
				neighbor.Y < 0 || neighbor.Y >= height ||
				req.Grid[neighbor.Y][neighbor.X] ||
				closedSet[neighbor] {
				continue
			}

			tentativeGScore := gScore[current] + 1

			if _, exists := gScore[neighbor]; !exists {
				gScore[neighbor] = int(^uint(0) >> 1) // Initialize to "infinity"
			}

			if tentativeGScore < gScore[neighbor] {
				cameFrom[neighbor] = current
				gScore[neighbor] = tentativeGScore
				fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, req.End)
				heap.Push(openHeap, &Node{point: neighbor, priority: fScore[neighbor]})
			}
		}
	}

	// No path found
	return &PathResponse{Path: []Point{}}, nil
}

func heuristic(a, b Point) int {
	return abs(a.X-b.X) + abs(a.Y-b.Y)
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func reconstructPath(cameFrom map[Point]Point, current Point) []Point {
	path := []Point{current}
	for {
		var exists bool
		current, exists = cameFrom[current]
		if !exists {
			break
		}
		path = append([]Point{current}, path...)
	}
	return path
}

// Priority Queue implementation
type Node struct {
	point    Point
	priority int
	index    int
}

type PriorityQueue []*Node

func (pq PriorityQueue) Len() int { return len(pq) }

func (pq PriorityQueue) Less(i, j int) bool {
	return pq[i].priority < pq[j].priority
}

func (pq PriorityQueue) Swap(i, j int) {
	pq[i], pq[j] = pq[j], pq[i]
	pq[i].index = i
	pq[j].index = j
}

func (pq *PriorityQueue) Push(x interface{}) {
	n := len(*pq)
	node := x.(*Node)
	node.index = n
	*pq = append(*pq, node)
}

func (pq *PriorityQueue) Pop() interface{} {
	old := *pq
	n := len(old)
	node := old[n-1]
	old[n-1] = nil
	node.index = -1
	*pq = old[0 : n-1]
	return node
}
