package main

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"log"
	"strconv"
)

var example = []int{0, 3, 0, 1, -3}

const inputFile = "input.txt"

func main() {
	c, err := ioutil.ReadFile(inputFile)
	if err != nil {
		log.Fatalf("could not read from file '%s': %v\n", inputFile, err)
	}
	nums := []int{}
	for _, row := range bytes.Split(c, []byte("\n")) {
		d, err := strconv.Atoi(string(row))
		if err != nil {
			log.Fatalf("could not parse '%s' to int: %v\n", row, err)
		}
		nums = append(nums, d)
	}

	// res1 := part1(nums)
	// fmt.Println(res1)

	res2 := part2(nums)
	fmt.Println(res2)
}

func part1(jumps []int) int {
	steps := 0
	pointer := 0
	for pointer >= 0 && pointer < len(jumps) {
		d := jumps[pointer]
		jumps[pointer]++
		pointer += d
		steps++
	}
	return steps
}

func part2(jumps []int) int {
	steps := 0
	pointer := 0
	for pointer >= 0 && pointer < len(jumps) {
		offset := jumps[pointer]
		if offset > 2 {
			jumps[pointer]--
		} else {
			jumps[pointer]++
		}
		pointer += offset
		steps++
	}
	return steps
}
