[x]prefix
[x]orientation
[]word
[]reference
[]course
[]documentation
---[x]export from postman
---[]create yaml file from apimatic
---[]set up server

npm install swagger-ui-express yamljs
create swagger.ymal and copy apimatic text

server.js

```js
app.get('/docs', (req, res) => {
  res.send('<h1>Hamoria api</h1><a href="api-docs">Documentation</a>')
})

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation))
```
