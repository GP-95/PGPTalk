export interface MessageData {
  message: string
  username: string
  encrypted: boolean
  room: string
  id: number
  event: string
}

export interface EncryptMessage {
  message: string
  publicKey: string
  privateKey: string
  password?: string
}

export interface KeyPair {
  publicKey: string
  privateKey: string
  password: string
}

export interface RecipientKey {
  public: string
}
