export interface Message {
  message: string
  username: string
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
}

export interface RecipientKey {
  public: string
}
