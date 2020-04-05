package ui

import (
	"net/http"
	"testing"
	"github.com/stretchr/testify/assert"
)

func TestNewUIHandler(t *testing.T) {
	handler := NewUIHandler()
	assert.Implements(t, http.Handler(nil), handler)
}

func TestNewJSHandler(t *testing.T) {
	handler := NewJSHandler()
	assert.Implements(t, http.Handler(nil), handler)
}
