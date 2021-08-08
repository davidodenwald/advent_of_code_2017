package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"strings"
)

const inputFile = "input.txt"

func main() {
	c, err := ioutil.ReadFile(inputFile)
	if err != nil {
		log.Fatalf("could not read from file '%s': %v\n", inputFile, err)
	}
	fmt.Println(part1(strings.Split(string(c), "\n")))
}

func part1(lines []string) int {
	sum := 0
	for _, pass := range lines {
		words := map[string]interface{}{}
		valid := true
		for _, word := range strings.Split(pass, " ") {
			if _, in := words[word]; in {
				valid = false
				break
			}
			words[word] = nil
		}
		if valid {
			sum++
		}
	}

	return sum
}

func isAnagram(word string) bool {
	return false
}

func part2(lines []string) int {
	sum := 0
	for _, pass := range lines {
		words := map[string]interface{}{}
		valid := true
		for _, word := range strings.Split(pass, " ") {
			if _, in := words[word]; in {
				valid = false
				break
			}
			words[word] = nil
		}
		if valid {
			sum++
		}
	}

	return sum
}
