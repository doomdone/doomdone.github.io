package ui

import "net/http"

const (
	jsBundlePath = "./static/js/bundle.js"
	htmlFilePath = "./static/start.html"
)

func NewUIHandler() http.Handler {
	return http.FileServer(http.Dir(htmlFilePath))
}

func NewJSHandler() http.Handler {
	return http.FileServer(http.Dir(jsBundlePath))
}
