import { Key } from './Key'

export interface KeyGenerator {
  generate(): Key
}
