package ui

import "net/http"

const (
	jsBundlePath = "./static/js/bundle.js"
	htmlFilePath = "./static/start.html"
)

func NewUIHandler() http.HandlerFunc {
	return func(rw http.ResponseWriter, r *http.Request) {
		http.ServeFile(rw, r, htmlFilePath)
	}
}

func NewJSHandler() http.HandlerFunc {
	return func(rw http.ResponseWriter, r *http.Request) {
		http.ServeFile(rw, r, jsBundlePath)
	}
}
