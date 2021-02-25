import { LotteryTwitterBot } from './LotteryTwitterBot'

import * as dotenv from 'dotenv'
import * as http from 'http'
import Twitter from 'twitter'
dotenv.config()
const PORT = process.env.PORT || 8080
function handleRequest (request: any, response: { end: (arg0: string) => void }) {
  response.end('EuroMillions Twitter Bot. Powered by Heroku')
}
const server = http.createServer(handleRequest)
server.listen(PORT, function () {
  console.log('Server listening on: http://localhost:%s', PORT)
  const options: Twitter.AccessTokenOptions = {
    consumer_key: process.env.CONSUMER_KEY || '',
    consumer_secret: process.env.CONSUMER_SECRET || '',
    access_token_key: process.env.ACCESS_TOKEN_KEY || '',
    access_token_secret: process.env.ACCESS_TOKEN_SECRET || ''
  }
  const game = new LotteryTwitterBot(options)
  game.startListening('#MakeMeRichEuromillions')
})
