import { EuroMillionsKeyGenerator } from './EuroMillionsKeyGenerator'
import { KeyGenerator } from './KeyGenerator'

export type KeyType = 'Euromillions' | 'Lotto'
export class KeyFactory {
  static getGenerator (type: KeyType): KeyGenerator {
    switch (type) {
      case 'Euromillions': return new EuroMillionsKeyGenerator()
      default: throw new Error('Game not available')
    }
  }
}
