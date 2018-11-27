#!/bin/bash

GRAPHQL_URL="https://staging-apis-sls.klearexpressapp.com/graphql" ## DEV
# GRAPHQL_URL="http://localhost:3000/graphql"   ##PROD

SCHEMA_JSON_DESTINATION="./js/schema.json"

curl -X GET --header "Authorization : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0b2RkZW4uc3VwZXJ0ZWFjaGVyQGFpc2Nob29sLm5ldCIsInV0Ijoic3RhZmYiLCJyb2xlcyI6WyJ0ZWFjaGVyIiwicmV2aWV3ZXIiLCJhZG1pbiJdLCJvaWQiOjEsImlhdCI6MTUyMjIyOTI0N30.3V1f4c4uN-zvTNpndj8_pb9oeggrmjxVjy0YP8t1USk" $GRAPHQL_URL'?query=%7B%0A%20%20__schema%20%7B%0A%20%20%20%20types%20%7B%0A%20%20%20%20%20%20kind%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20possibleTypes%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A' -o $SCHEMA_JSON_DESTINATION
