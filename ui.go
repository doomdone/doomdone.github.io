package ui

import (
	"fmt"
	"net/http"
	"os"
)

const (
	jsBundlePath = "./static/js/bundle.js"
	htmlFilePath = "./static/start.html"
)

func NewUIHandler() http.HandlerFunc {
	file, err := os.Open(htmlFilePath)
	if err != nil {
		panic(err)
	}
	fmt.Println(file.Name())
	return func(rw http.ResponseWriter, r *http.Request) {
		http.ServeFile(rw, r, htmlFilePath)
	}
}

func NewJSHandler() http.HandlerFunc {
	file, err := os.Open(htmlFilePath)
	if err != nil {
		panic(err)
	}
	fmt.Println(file.Name())
	return func(rw http.ResponseWriter, r *http.Request) {
		http.ServeFile(rw, r, jsBundlePath)
	}
}
