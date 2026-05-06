# Stage 1: Build everything (mirrors compile.sh)
FROM golang:alpine AS build
WORKDIR /app
RUN apk add --no-cache nodejs npm && npm install -g pnpm
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm build
RUN CGO_ENABLED=0 go build -o server .

# Stage 2: Minimal runtime
FROM alpine:3
WORKDIR /app
COPY --from=build /app/server .
EXPOSE 8090
ENV PORT=8090
CMD ["./server"]
