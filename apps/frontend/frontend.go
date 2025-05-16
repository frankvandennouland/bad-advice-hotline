package frontend

import (
	"embed"
	"io/fs"
	"log"
	"net/http"
)

//go:embed dist/*
var dist embed.FS

//encore:api public raw path=/frontend/*path
func Serve(w http.ResponseWriter, req *http.Request) {
	// Create a sub filesystem from the embedded `dist` directory
	subFS, err := fs.Sub(dist, "dist")
	if err != nil {
		log.Fatalf("Failed to create sub filesystem: %v", err)
	}

	// Use `http.FileServer` with the sub filesystem
	handler := http.StripPrefix("/frontend/", http.FileServer(http.FS(subFS)))
	handler.ServeHTTP(w, req)
}
