import { LotteryTwitterBot } from './LotteryTwitterBot'

import * as dotenv from 'dotenv'
import * as http from 'http'
dotenv.config()
const PORT = process.env.PORT || 8080
function handleRequest (request, response) {
  response.end('EuroMillions Twitter Bot. Powered by Heroku')
}
const server = http.createServer(handleRequest)
server.listen(PORT, function () {
  console.log('Server listening on: http://localhost:%s', PORT)
  const game = new LotteryTwitterBot()
  game.startListening('#MakeMeRichEuromillions')
})
