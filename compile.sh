pnpm install
pnpm build
go mod tidy
GOOS=linux GOARCH=arm64 go build -o portfolio-termux
go build -o portfolio-server
