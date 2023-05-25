# http-filestore

Put, list and get files via HTTP with cURL.

## Commands

    curl -X POST -H "Authorization: Bearer 12345" -H "Content-Type: application/octet-stream" -T ./index.js http://localhost:4060/file/mybucket/path/in/bucket

