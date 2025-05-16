package playground

import (
	"context"
	"errors"
	"fmt"

	"backend/apps/backend/algorithm"
	"backend/apps/backend/maze"
)

// GridRequest represents the grid data sent from the frontend
type GridRequest struct {
	Pixels []maze.Pixel `json:"pixels"`
}

// GridResponse represents the response format for the frontend
type GridResponse struct {
	Pixels   []maze.Pixel `json:"pixels"`
	Solution []maze.Point `json:"solution,omitempty"`
}

// encore:api public method=POST path=/playground/maze/generate
// GenerateMaze generates a maze and returns it in the frontend's format
func GenerateMaze(ctx context.Context, req *GridRequest) (*GridResponse, error) {
	// Find start and end points if they exist
	var start, end maze.Point
	for _, pixel := range req.Pixels {
		if pixel.Type == "start" {
			start = maze.Point{X: pixel.X, Y: pixel.Y}
		} else if pixel.Type == "end" {
			end = maze.Point{X: pixel.X, Y: pixel.Y}
		}
	}

	// If either start or end is set, both must be set
	if (start != maze.Point{} && end == maze.Point{}) || (start == maze.Point{} && end != maze.Point{}) {
		return nil, errors.New("if either start or end is set, both must be set")
	}

	// Generate the maze
	var generatedMaze *maze.Maze
	var err error
	maxAttempts := 10 // Maximum attempts to generate a solvable maze

	for attempt := 0; attempt < maxAttempts; attempt++ {
		generatedMaze, err = maze.Generate(ctx, &maze.GenerateParams{
			Pixels: req.Pixels,
		})
		if err != nil {
			return nil, err
		}

		// If start/end points are specified, verify the maze is solvable
		if (start != maze.Point{}) {
			// Try to find a path
			pathResult, pathErr := algorithm.FindAStarPath(ctx, &algorithm.PathRequest{
				Grid:  generatedMaze.Grid,
				Start: algorithm.Point{X: start.X, Y: start.Y},
				End:   algorithm.Point{X: end.X, Y: end.Y},
			})

			if pathErr == nil && len(pathResult.Path) > 0 {
				// Found a solvable maze
				break
			}

			// If we're on the last attempt and still haven't found a solution
			if attempt == maxAttempts-1 {
				return nil, errors.New("could not generate a solvable maze with given start/end points")
			}

			// Try again with a new maze
			continue
		}

		// If no start/end points specified, use the first generated maze
		break
	}

	// Convert the maze to frontend format
	pixels := make([]maze.Pixel, 0, len(generatedMaze.Grid))
	for y := 0; y < len(generatedMaze.Grid); y++ {
		for x := 0; x < len(generatedMaze.Grid[y]); x++ {
			id := fmt.Sprintf("%d-%d", y, x)

			// Set pixel type and style
			pixelType := "empty"
			fillStyle := "transparent"

			// Check if this is a start or end point
			if (start != maze.Point{} && x == start.X && y == start.Y) {
				pixelType = "start"
				fillStyle = "#00FF00" // Green for start
			} else if (end != maze.Point{} && x == end.X && y == end.Y) {
				pixelType = "end"
				fillStyle = "#FF0000" // Red for end
			} else if generatedMaze.Grid[y][x] {
				pixelType = "wall"
				fillStyle = "#000000" // Black for walls
			}

			pixels = append(pixels, maze.Pixel{
				ID:        id,
				X:         x,
				Y:         y,
				Type:      pixelType,
				FillStyle: fillStyle,
			})
		}
	}

	response := &GridResponse{
		Pixels: pixels,
	}

	return response, nil
}

// encore:api public method=POST path=/playground/algorithm/run
// RunAlgorithm finds a solution path through the provided grid
func RunAlgorithm(ctx context.Context, req *GridRequest) (*GridResponse, error) {
	// Convert pixels to grid format
	maxX, maxY := 0, 0
	for _, pixel := range req.Pixels {
		if pixel.X > maxX {
			maxX = pixel.X
		}
		if pixel.Y > maxY {
			maxY = pixel.Y
		}
	}

	// Create 2D grid with dimensions maxY+1 x maxX+1
	grid := make([][]bool, maxY+1)
	for i := range grid {
		grid[i] = make([]bool, maxX+1)
	}

	// Fill grid based on pixel types
	for _, pixel := range req.Pixels {
		grid[pixel.Y][pixel.X] = pixel.Type == "wall"
	}

	// Find start and end points (assuming they're marked in the grid)
	var start, end maze.Point
	for _, pixel := range req.Pixels {
		if pixel.Type == "start" {
			start = maze.Point{X: pixel.X, Y: pixel.Y}
		} else if pixel.Type == "end" {
			end = maze.Point{X: pixel.X, Y: pixel.Y}
		}
	}

	// If start/end not found, use default positions
	if (start == maze.Point{}) {
		start = maze.Point{X: 1, Y: 1}
	}
	if (end == maze.Point{}) {
		end = maze.Point{X: req.Pixels[len(req.Pixels)-1].X - 2, Y: req.Pixels[len(req.Pixels)-1].Y - 2}
	}

	// Find path through maze
	pathResult, err := algorithm.FindAStarPath(ctx, &algorithm.PathRequest{
		Grid:  grid,
		Start: algorithm.Point{X: start.X, Y: start.Y},
		End:   algorithm.Point{X: end.X, Y: end.Y},
	})
	if err != nil {
		return nil, err
	}

	// Convert path to frontend format
	solution := make([]maze.Point, len(pathResult.Path))
	for i, p := range pathResult.Path {
		solution[i] = maze.Point{X: p.X, Y: p.Y}
	}

	// Mark solution path in the pixels
	solutionMap := make(map[string]bool)
	for _, p := range solution {
		solutionMap[fmt.Sprintf("%d-%d", p.Y, p.X)] = true
	}

	// Update pixels with solution path
	pixels := make([]maze.Pixel, len(req.Pixels))
	copy(pixels, req.Pixels)
	for i, pixel := range pixels {
		if solutionMap[pixel.ID] && pixel.Type != "start" && pixel.Type != "end" {
			pixels[i].Type = "path"
		}
	}

	return &GridResponse{
		Pixels:   pixels,
		Solution: solution,
	}, nil
}
