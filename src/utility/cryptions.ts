import { encrypt, Message, readKey, decryptKey, decrypt, sign } from './pgp'
import * as openpgp from './pgp'
import type { EncryptMessage, KeyPair, MessageData } from 'types/interfaces'

export async function createPGPMessage(
  { message, publicKey, privateKey, password }: EncryptMessage,
  signMessage: boolean
) {
  // Creates PGP object types
  const messageObj = Message.fromText(message)
  const publicKeyObj = await readKey({ armoredKey: publicKey })
  let privateKeyObj = await readKey({ armoredKey: privateKey })

  // Decrypts private key if it is encrypted
  if (password) {
    privateKeyObj = await decryptKey({
      privateKey: privateKeyObj,
      passphrase: password,
    })
  }

  if (signMessage) {
    const signedMessage = sign({
      message: messageObj,
      privateKeys: privateKeyObj,
    })
    console.log(signedMessage)
  }

  const encryptedMessage = await encrypt({
    message: messageObj,
    publicKeys: publicKeyObj,
    privateKeys: privateKeyObj,
  })
  return encryptedMessage
}

export async function decryptMessage(
  { message, username, encrypted, room, id, event }: MessageData,
  { publicKey, privateKey, password, name, email }: KeyPair
): Promise<MessageData> {
  let scopedPrivate: any
  if (password) {
    const privateKeyObj = await readKey({ armoredKey: privateKey })
    scopedPrivate = await decryptKey({
      privateKey: privateKeyObj,
      passphrase: password,
    })
  } else {
    scopedPrivate = await openpgp.readKey({ armoredKey: privateKey })
  }
  const messageObj = await openpgp.readMessage({ armoredMessage: message })
  const decryptedMessage: any = await decrypt({
    message: messageObj,
    privateKeys: scopedPrivate,
  })

  console.log(decryptedMessage)

  return {
    message: decryptedMessage.data,
    username,
    encrypted: false,
    room,
    id,
    event,
  }
}
