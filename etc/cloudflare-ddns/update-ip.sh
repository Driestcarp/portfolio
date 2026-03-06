#!/bin/bash

ZONE_ID="04dc8dd503f836240e4cc466fe67a17c"
RECORD_NAME="albinlofgren.se"
API_TOKEN="YmgWK4Asbz5LPRCk9gMKVwgfvJSBFFBqrfcX-vpM"

IP=$(curl -s https://api.ipify.org)

RECORD_ID=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records?name=$RECORD_NAME" \
     -H "Authorization: Bearer $API_TOKEN" \
     -H "Content-Type: application/json" | jq -r '.result[0].id')

curl -s -X PUT "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$RECORD_ID" \
     -H "Authorization: Bearer $API_TOKEN" \
     -H "Content-Type: application/json" \
     --data "{\"type\":\"A\",\"name\":\"$RECORD_NAME\",\"content\":\"$IP\",\"ttl\":120,\"proxied\":true}"