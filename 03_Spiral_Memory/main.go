package main

import "fmt"

const (
	input    = 361527
	gridSize = 1024
)

var neighbours = [][]int{
	{-1, -1}, {-1, 0}, {-1, 1},
	{0, -1}, {0, 1},
	{1, -1}, {1, 0}, {1, 1},
}

var directions = [][]int{
	{0, 1},  // South -> East
	{-1, 0}, // East -> North
	{0, -1}, // North -> West
	{1, 0},  // West -> South
}

func main() {
	fmt.Println(part1())
	fmt.Println(part2())
}

func part1() int {
	grid := make([][]int, gridSize)
	for i := range grid {
		grid[i] = make([]int, gridSize)
	}
	y := gridSize / 2
	x := gridSize / 2
	dir := 0
	for i := 1; i < input; i++ {
		grid[y][x] = i
		y += directions[dir][0]
		x += directions[dir][1]
		if grid[y+directions[(dir+1)%4][0]][x+directions[(dir+1)%4][1]] == 0 {
			dir = (dir + 1) % 4
		}
	}

	square := input
	steps := 0
	for square != 1 {
		min := square
		minY := 0
		minX := 0
		for _, dir := range directions {
			tmpY := y + dir[0]
			tmpX := x + dir[1]
			if grid[tmpY][tmpX] != 0 && grid[tmpY][tmpX] < min {
				min = grid[tmpY][tmpX]
				minY = tmpY
				minX = tmpX
			}
		}
		square = min
		y = minY
		x = minX

		steps++
	}
	return steps
}

func neighbourSum(grid [][]int, y, x int) int {
	sum := 0
	for _, n := range neighbours {
		sum += grid[y+n[0]][x+n[1]]
	}
	return sum
}

func part2() int {
	grid := make([][]int, gridSize)
	for i := range grid {
		grid[i] = make([]int, gridSize)
	}
	y := gridSize / 2
	x := gridSize / 2
	grid[y][x] = 1
	x++

	val := 1
	dir := 1
	for val < input {
		val = neighbourSum(grid, y, x)
		grid[y][x] = val

		y += directions[dir][0]
		x += directions[dir][1]
		if grid[y+directions[(dir+1)%4][0]][x+directions[(dir+1)%4][1]] == 0 {
			dir = (dir + 1) % 4
		}
	}
	return val
}
