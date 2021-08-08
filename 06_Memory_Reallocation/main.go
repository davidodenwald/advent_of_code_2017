package main

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"log"
	"strconv"
)

const inputFile = "input.txt"

var example = []int{0, 2, 7, 0}

func main() {
	c, err := ioutil.ReadFile(inputFile)
	if err != nil {
		log.Fatalf("could not read from file '%s': %v\n", inputFile, err)
	}
	nums := []int{}
	for _, row := range bytes.Split(c, []byte("\t")) {
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

func maxIndex(n []int) (iMax, max int) {
	iMax = 0
	for i := 0; i < len(n); i++ {
		if n[i] > max {
			max = n[i]
			iMax = i
		}
	}
	return
}

func part1(banks []int) int {
	steps := 0
	seen := map[string]interface{}{}
	for true {
		steps++
		iMax, vMax := maxIndex(banks)
		banks[iMax] = 0
		for vMax > 0 {
			i := (iMax + 1) % len(banks)
			banks[i]++
			vMax--
			iMax++
		}
		key := fmt.Sprintf("%v", banks)
		if _, in := seen[key]; in {
			break
		}
		seen[key] = nil
	}
	return steps
}

func part2(banks []int) int {
	seen := map[string]interface{}{}
	key := ""
	for true {
		iMax, vMax := maxIndex(banks)
		banks[iMax] = 0
		for vMax > 0 {
			i := (iMax + 1) % len(banks)
			banks[i]++
			vMax--
			iMax++
		}
		key = fmt.Sprintf("%v", banks)
		if _, in := seen[key]; in {
			break
		}
		seen[key] = nil
	}

	steps := 0
	for true {
		steps++
		iMax, vMax := maxIndex(banks)
		banks[iMax] = 0
		for vMax > 0 {
			i := (iMax + 1) % len(banks)
			banks[i]++
			vMax--
			iMax++
		}
		newKey := fmt.Sprintf("%v", banks)
		if newKey == key {
			break
		}
	}
	return steps
}
