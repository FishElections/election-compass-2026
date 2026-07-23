#!/usr/bin/env bash
# Build the image and (re)launch the container. Used by CI (GitHub Actions
# self-hosted runner) and runnable by hand. Reads runtime env (SITE_URL, GA_ID)
# from an env file on the host so secrets stay out of the repo.
set -euo pipefail

IMAGE="election-compass:latest"
NAME="election-compass"
ENV_FILE="${ENV_FILE:-/etc/election-compass.env}"

cd "$(dirname "$0")/.."

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing env file: $ENV_FILE" >&2
  echo "Create it with e.g.:" >&2
  echo "  SITE_URL=https://elections.fishdev.org" >&2
  echo "  GA_ID=G-XXXXXXXXXX" >&2
  exit 1
fi

echo "Building $IMAGE ..."
docker buildx build --platform linux/amd64 -t "$IMAGE" .

echo "Relaunching $NAME ..."
docker rm -f "$NAME" 2>/dev/null || true
docker run -d --name "$NAME" --restart unless-stopped \
  -p 127.0.0.1:3000:3000 \
  --env-file "$ENV_FILE" \
  "$IMAGE"

echo "Deployed. Container status:"
docker ps --filter "name=$NAME" --format '{{.Names}}: {{.Status}}'
