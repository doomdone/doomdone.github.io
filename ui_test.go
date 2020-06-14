package ui

import (
	"github.com/stretchr/testify/assert"
	"net/http"
	"testing"
)

func TestNewUIHandler(t *testing.T) {
	handler := NewUIHandler()
	assert.Implements(t, http.HandlerFunc(nil), handler)
}

func TestNewJSHandler(t *testing.T) {
	handler := NewJSHandler()
	assert.Implements(t, http.HandlerFunc(nil), handler)
	//http.Handle("/js", handler)
}
