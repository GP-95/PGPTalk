export interface MessageData {
  message: string
  username: string
  encrypted: boolean
  verified: boolean | null
  room: string
  id: string
  event: string
}

export interface EncryptMessage {
  message: string
  publicKey: string
  privateKey: string
  password?: string
}

export interface KeyPair {
  name: string
  email: string
  publicKey: string
  privateKey: string
  password: string
}

export interface RecipientKey {
  public: string
}
