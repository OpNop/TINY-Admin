Because the API server is not on GitHub (yet) and PHP isn't your language.
I figure I'll just post here what API endpoints are working here

### Endpoints
Base url: https://api.tinyarmy.org/
- /v1/ping
- /v1/auth/login
- /v1/guild
  - /v1/guild/log  (Params: type, limit, page)
  - /v1/guild/:id/log (params: same as /v1/guild/log)
  - /v1/guild/:id/members

### Pagination
I will try to add pagination to all endpoints. The default page `limit` is 20, and `page` starts at 1
When accessing a page, additional HTTP response headers may be available:

`X-Page-Size` – The size of a page (like the limit query parameter).
`X-Page-Total` – The total number of pages.
`X-Result-Count` – The number of resources on the current page (lower or equal to the page size).
`X-Result-Total` – The total number of resources.