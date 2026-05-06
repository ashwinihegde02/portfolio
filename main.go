package main

import (
	"embed"
	"io/fs"
	"log"
	"net/http"
	"os"
	"strings"
)

//go:embed out
var rawFS embed.FS

func main() {
	// Strip the leading "out/" prefix so assets are served from root.
	stripped, err := fs.Sub(rawFS, "out")
	if err != nil {
		log.Fatalf("failed to sub filesystem: %v", err)
	}

	fileServer := http.FileServer(http.FS(stripped))

	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Try to open the requested path in the embedded FS.
		// Clean the path: remove leading slash for FS lookup.
		p := strings.TrimPrefix(r.URL.Path, "/")
		if p == "" {
			p = "index.html"
		}

		f, err := stripped.Open(p)
		if err == nil {
			f.Close()
			// File exists — serve it normally.
			fileServer.ServeHTTP(w, r)
			return
		}

		// File not found — fall back to index.html for SPA client-side routing.
		r2 := r.Clone(r.Context())
		r2.URL.Path = "/"
		fileServer.ServeHTTP(w, r2)
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8090"
	}

	log.Printf("serving on http://localhost:%s", port)
	if err := http.ListenAndServe(":"+port, mux); err != nil {
		log.Fatalf("server error: %v", err)
	}
}
