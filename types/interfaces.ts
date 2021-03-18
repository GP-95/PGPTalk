export interface Message {
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

export interface Keys {
  public: string
  private: string
  password: string
}

export interface RecipientKey {
  public: string
}
