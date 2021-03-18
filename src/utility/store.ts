import { writable } from 'svelte/store'
import type { Keys, RecipientKey } from '../../types/interfaces'

export const keys = writable<Keys>({
  public: '',
  private: '',
})

export const recipientKey = writable<RecipientKey>({
  public: '',
})
