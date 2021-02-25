
import * as Twitter from 'twitter'
import * as events from 'events'
import { KeyFactory, KeyType } from './KeyFactory'
import { Key } from './Key'
export class LotteryTwitterBot {
  private twitterClient: Twitter;
  private readonly STREAM_METHOD: string = 'statuses/filter'
  private readonly GAME_TYPE: KeyType = 'Euromillions'
  constructor () {
    this.twitterClient = new Twitter({
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      access_token_key: process.env.ACCESS_TOKEN_KEY,
      access_token_secret: process.env.ACCESS_TOKEN_SECRET
    })
  }

  startListening (hashtag: string): void {
    this.twitterClient.stream(this.STREAM_METHOD, { track: hashtag }, (stream: events.EventEmitter) => {
      stream.on('data', (tweet: Twitter.ResponseData) => {
        console.log(tweet.user.screen_name + ' got a chance to be filthy rich!')
        const key = KeyFactory.getGenerator(this.GAME_TYPE).generate()
        console.log(key)
        console.log(tweet)
        this.twitterClient.post('direct_messages/events/new', this.generateDM(key, tweet), (error, tweetReply) => {
          // if we get an error print it out
          if (error) {
            throw error
          }
          // print the text of the tweet we sent out
          console.log(tweetReply.text)
        })
      })
      stream.on('error', (error: Error) => {
        throw error
      })
    })
  }

  private generateDM (key: Key, tweet: Twitter.ResponseData): any {
    const response = {
      event:
      {
        type: 'message_create',
        message_create: {
          target: {
            recipient_id: tweet.user.id,
            message_data: {
              text: `Hi ${tweet.user.name}. ${key.toMessage}`
            }
          }
        }
      }
    }
    return response
  }
}
