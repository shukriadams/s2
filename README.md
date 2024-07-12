# S2

Not quite as good as S3. Put, list and get files from buckets, via HTTP, with cURL.

## Commands

Authorization header is required if Bucket has auth enabled.

Add file

    curl -X POST -H "Authorization: Bearer 12345" -H "Content-Type: application/octet-stream" -T ./index.js http://localhost:4060/file/mybucket/path/in/bucket


List files

    curl -H "Authorization: Bearer 12345" http://localhost:4060/list/mybucket

Read file back

    curl -o myfile -H "Authorization: Bearer 12345" http://localhost:4060/file/mybucket/in/bucket23

Delete file back

    curl -X DELETE -H "Authorization: Bearer 12345" http://localhost:4060/file/mybucket/in/bucket23

## View from browser

Add `mime:true` to bucket config to allow browser get. Mime file support is limited.