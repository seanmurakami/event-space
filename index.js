require('dotenv/config')
const server = require('json-server')
const rp = require('request-promise')
const bodyParser = require('body-parser')

const app = server.create()
const middleware = server.defaults()
const router = server.router('db.json')

const settings = {
  url: 'https://api.yelp.com/v3/businesses/search?location=California&term=Starbucks',
  headers: {Authorization: `Bearer ${process.env.KEY}`},
  json: true
}

rp.get(settings)
  .then(data => console.log(data))

app.use(bodyParser.json())
app.use(middleware)
app.use(router)
app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT)
})
