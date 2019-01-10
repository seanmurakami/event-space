require('dotenv/config')
const server = require('json-server')
const rp = require('request-promise')

const app = server.create()
const middleware = server.defaults()
const router = server.router('db.json')

app.get('/restaurants', (req, res, next) => {
  const query = {
    url: `https://api.yelp.com/v3/businesses/search?location=${req.query.location}&term=Starbucks`,
    headers: {Authorization: `Bearer ${process.env.KEY}`},
    json: true
  }
  rp.get(query)
    .then(data => res.send(data))
})

app.use(middleware)
app.use(router)

app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT)
})
