package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"strconv"
	"strings"
)

const inputFile = "input.txt"

func main() {
	c, err := ioutil.ReadFile(inputFile)
	if err != nil {
		log.Fatalf("could not read from file '%s': %v\n", inputFile, err)
	}
	nums := [][]int{}
	for i, line := range strings.Split(string(c), "\n") {
		nums = append(nums, []int{})
		for _, chr := range strings.Split(line, "\t") {
			d, err := strconv.Atoi(string(chr))
			if err != nil {
				log.Fatalf("could not parse %s to int: %v\n", chr, err)
			}
			nums[i] = append(nums[i], d)
		}
	}
	fmt.Println(part1(nums))
	fmt.Println(part2(nums))
}

func part1(lines [][]int) int {
	sum := 0
	for _, line := range lines {
		min := (1 << 63) - 1
		max := ((1 << 63) - 1) * -1

		for _, num := range line {
			if num < min {
				min = num
			}
			if num > max {
				max = num
			}
		}
		sum += max - min
	}
	return sum
}

func divSum(line []int) int {
	for i, a := range line {
		for k, b := range line {
			if i == k {
				continue
			}
			if a%b == 0 {
				if a > b {
					return a / b
				}
				return b / a
			}
		}
	}
	return 0
}

func part2(lines [][]int) int {
	sum := 0
	for _, line := range lines {
		sum += divSum(line)
	}
	return sum
}
