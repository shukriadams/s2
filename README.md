# http-filestore

Put, list and get files via HTTP with cURL.

## Commands

Add file

    curl -X POST -H "Authorization: Bearer 12345" -H "Content-Type: application/octet-stream" -T ./index.js http://localhost:4060/file/mybucket/path/in/bucket


List files

    curl -H "Authorization: Bearer 12345" http://localhost:4060/list/mybucket

Read file back

    curl -o myfile -H "Authorization: Bearer 12345" http://localhost:4060/file/mybucket/in/bucket23
