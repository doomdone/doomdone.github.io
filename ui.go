package ui

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"reflect"
)

const (
	jsBundlePath = "./static/js/bundle.js"
	htmlFilePath = "./static/start.html"
)

var jsBundle, htmlFile []byte

func init() {
	jsBundle, err := ioutil.ReadFile(jsBundlePath)
	if err != nil {
		log.Fatal(err)
	}

	htmlFile, err := ioutil.ReadFile(htmlFilePath)
	if err != nil {
		log.Fatal(err)
	}

}

func NewUIHandler() http.HandlerFunc {
	fmt.Println(string(jsBundle))
	//absolute, err := filepath.Abs(htmlFilePath)
	//if err != nil {
	//	log.Fatal(err)
	//}
	//fmt.Printf("filepath.Abs(htmlFilePath) : %s\n", absolute)
	//
	//twd, err := os.Getwd()
	//if err != nil {
	//	log.Fatal(err)
	//}
	//fmt.Printf("os.Getwd() : %s\n", twd)
	//
	//file, err := os.Open(htmlFilePath)
	//if err != nil {
	//	log.Fatal(err)
	//}
	//fmt.Printf("os.Open(htmlFilePath) : %s\n", file.Name())
	//
	//var reflectUI ui
	//pkgPath := reflect.TypeOf(reflectUI).PkgPath()
	//fmt.Printf("PkgPath():%s\n", pkgPath)

	return func(rw http.ResponseWriter, r *http.Request) {
		http.ServeFile(rw, r, htmlFilePath)
	}

}

func NewJSHandler() http.HandlerFunc {
	fmt.Println(string(jsBundle))
	//filePath, err := filepath.Abs(jsBundlePath)
	//if err != nil {
	//	panic(err)
	//}
	//fmt.Println(filePath)
	//
	//file, err := os.Open(htmlFilePath)
	//if err != nil {
	//	panic(err)
	//}
	//fmt.Println(file.Name())

	return func(rw http.ResponseWriter, r *http.Request) {
		http.ServeFile(rw, r, jsBundlePath)
	}
}

type ui struct {
}
