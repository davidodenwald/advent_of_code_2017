package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"strconv"
)

const inputFile = "input.txt"

func main() {
	c, err := ioutil.ReadFile(inputFile)
	if err != nil {
		log.Fatalf("could not read from file '%s': %v\n", inputFile, err)
	}
	nums := []int{}
	for _, chr := range c {
		d, err := strconv.Atoi(string(chr))
		if err != nil {
			log.Fatalf("could not parse %c to int: %v\n", chr, err)
		}
		nums = append(nums, d)
	}
	fmt.Println(part1(nums))
	fmt.Println(part2(nums))
}

func part1(nums []int) int {
	sum := 0
	if nums[0] == nums[len(nums)-1] {
		sum += nums[0]
	}

	for i := 0; i < len(nums)-1; i++ {
		if nums[i] == nums[i+1] {
			sum += nums[i]
		}
	}

	return sum
}

func part2(nums []int) int {
	sum := 0
	count := len(nums)

	for i := 0; i < count; i++ {
		if nums[i] == nums[(count/2+i)%count] {
			sum += nums[i]
		}
	}

	return sum
}
