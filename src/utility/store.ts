import { writable } from 'svelte/store'
import type { Keys } from '../../types/interfaces'

export const keys = writable<Keys>({
  public: '',
  private: '',
})
