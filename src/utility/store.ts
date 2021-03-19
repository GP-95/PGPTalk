import { writable } from 'svelte/store'
import type { KeyPair, RecipientKey } from '../../types/interfaces'

export const keys = writable<KeyPair>({
  publicKey: '',
  privateKey: '',
  password: '',
})

export const recipientKey = writable<RecipientKey>({
  public: '',
})
