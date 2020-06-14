package ui

import (
	"fmt"
	"net/http"
	"path/filepath"
)

const (
	jsBundlePath = "static/js/bundle.js"
	htmlFilePath = "static/start.html"
)

func NewUIHandler() http.HandlerFunc {
	filePath, err := filepath.Abs(htmlFilePath)
	if err != nil {
		panic(err)
	}
	fmt.Println(filePath)
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
	return func(rw http.ResponseWriter, r *http.Request) {
		http.ServeFile(rw, r, jsBundlePath)
	}
}
