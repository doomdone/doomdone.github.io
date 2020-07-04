package ui

import (
	"fmt"
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
		panic(err)
	}
	fmt.Println(absolute)

	file, err := os.Open(absolute)
	if err != nil {
		panic(err)
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
