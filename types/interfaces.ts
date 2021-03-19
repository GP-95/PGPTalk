export interface MessageData {
  message: string
  username: string
  encrypted: boolean
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
