#!/usr/bin/env bash
set -euo pipefail

service="elevenlabs-api"
account="${USER:-pds-flows}"

printf "Paste ElevenLabs API key. Input will be hidden: "
IFS= read -r -s api_key
printf "\n"

if [[ -z "${api_key}" ]]; then
  echo "No key entered. Nothing installed."
  exit 1
fi

security add-generic-password -U -s "$service" -a "$account" -w "$api_key" >/dev/null
echo "Installed ElevenLabs API key in macOS Keychain service: $service"
