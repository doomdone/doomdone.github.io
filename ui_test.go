package ui

import (
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestNewUIHandler(t *testing.T) {
	handler := NewUIHandler()
	rw := httptest.NewRecorder()
	r := httptest.NewRequest(http.MethodGet, "/", nil)
	handler(rw, r)
	assert.Equal(t, http.StatusOK, rw.Code)
}

func TestNewJSHandler(t *testing.T) {
	handler := NewJSHandler()
	rw := httptest.NewRecorder()
	r := httptest.NewRequest(http.MethodGet, "/js", nil)
	handler(rw, r)
	assert.Equal(t, http.StatusOK, rw.Code)
}
