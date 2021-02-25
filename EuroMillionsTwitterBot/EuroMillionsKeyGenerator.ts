import { EuroMillionsKey } from './EuroMillionsKey'
import { KeyGenerator } from './KeyGenerator'

export class EuroMillionsKeyGenerator implements KeyGenerator {
  generate (): EuroMillionsKey {
    const randomNumbers = this.shuffle(Array.from({ length: 50 }, (v, k) => k + 1)).slice(0, 5)
    const randomStars = this.shuffle(Array.from({ length: 12 }, (v, k) => k + 1)).slice(0, 2)
    const toMessage = `Your numbers are ${randomNumbers.join(', ')} and your stars are ${randomStars.join(', ')}`
    return {
      numbers: randomNumbers,
      stars: randomStars,
      toMessage
    } as EuroMillionsKey
  }

  private shuffle (array: number[]): number[] {
    return array.map((a) => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map((a) => a[1])
  }
}
