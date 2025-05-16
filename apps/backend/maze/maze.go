package maze

import (
	"context"
	"math/rand"
)

type Maze struct {
	Grid  [][]bool // true represents a wall, false represents a path
	Start Point
	End   Point
}

type Point struct {
	X int
	Y int
}

type Pixel struct {
	ID        string `json:"id"`
	X         int    `json:"x"`
	Y         int    `json:"y"`
	Type      string `json:"type"`
	FillStyle string `json:"fillStyle"`
}

type GenerateParams struct {
	Pixels []Pixel
}

//encore:api private
func Generate(ctx context.Context, params *GenerateParams) (*Maze, error) {
	// Find the dimensions from the pixels array
	width := 0
	height := 0
	for _, pixel := range params.Pixels {
		if pixel.X+1 > width {
			width = pixel.X + 1
		}
		if pixel.Y+1 > height {
			height = pixel.Y + 1
		}
	}

	maze := &Maze{
		Grid: make([][]bool, height),
	}

	// Initialize grid with walls
	for i := range maze.Grid {
		maze.Grid[i] = make([]bool, width)
		for j := range maze.Grid[i] {
			maze.Grid[i][j] = true
		}
	}

	// Generate maze using recursive backtracking
	start := Point{1, 1}
	maze.Start = start
	generateMazePath(maze, start.Y, start.X)

	// Set end point
	maze.End = Point{width - 2, height - 2}
	maze.Grid[maze.End.Y][maze.End.X] = false

	return maze, nil
}

func generateMazePath(maze *Maze, row, col int) {
	maze.Grid[row][col] = false

	// Define possible directions (up, right, down, left)
	directions := []Point{
		{0, -2}, // up
		{2, 0},  // right
		{0, 2},  // down
		{-2, 0}, // left
	}

	// Shuffle directions
	rand.Shuffle(len(directions), func(i, j int) {
		directions[i], directions[j] = directions[j], directions[i]
	})

	// Try each direction
	for _, dir := range directions {
		newRow := row + dir.Y
		newCol := col + dir.X

		if newRow > 0 && newRow < len(maze.Grid)-1 && newCol > 0 && newCol < len(maze.Grid[0])-1 && maze.Grid[newRow][newCol] {
			// Create path by removing wall between current cell and next cell
			maze.Grid[row+dir.Y/2][col+dir.X/2] = false
			generateMazePath(maze, newRow, newCol)
		}
	}
}
