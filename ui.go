package ui

import "net/http"

const (
	jsBundlePath = "./static/js/bundle.js"
	htmlFilePath = "./static/start.html"
)

func NewUIHandler() http.Handler {
	root := http.Dir(htmlFilePath)
	return http.FileServer(root)
}

func NewJSHandler() http.Handler {
	root := http.Dir(jsBundlePath)
	return http.FileServer(root)
}
