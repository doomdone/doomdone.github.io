package ui

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

const (
	jsBundlePath = "./static/js/bundle.js"
	htmlFilePath = "./static/start.html"
)

func NewUIHandler() http.HandlerFunc {
	absolute, err := filepath.Abs(htmlFilePath)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(absolute)

	twd, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(twd)

	file, err := os.Open(htmlFilePath)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(file.Name())

	return func(rw http.ResponseWriter, r *http.Request) {
		http.ServeFile(rw, r, htmlFilePath)
	}

}

func NewJSHandler() http.HandlerFunc {
	filePath, err := filepath.Abs(jsBundlePath)
	if err != nil {
		panic(err)
	}
	fmt.Println(filePath)

	file, err := os.Open(htmlFilePath)
	if err != nil {
		panic(err)
	}
	fmt.Println(file.Name())

	return func(rw http.ResponseWriter, r *http.Request) {
		http.ServeFile(rw, r, jsBundlePath)
	}
}
