package ui

import (
	"net/http"
)

const (
	jsBundlePath = "github.com/damino/ui/static/js/bundle.js"
	htmlFilePath = "github.com/damino/ui/static/start.html"
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
