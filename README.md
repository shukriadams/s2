# S2

S2 is like S3, except much less. It's buckets of files, over vanilla HTTP REST commands. S2 is for internal/private 
networks only, and is intended for individuals, small teams, devops systems etc that need easy REST without Boto, 
XML or any of the over-complicated rituals S3 demands. S2 SHOULD NOT BE EXPOSED TO THE PUBLIC INTERNET.

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