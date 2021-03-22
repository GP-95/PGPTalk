import { encrypt, Message, readKey, decryptKey, decrypt } from './pgp'
import * as openpgp from './pgp'
import type { EncryptMessage, KeyPair, MessageData } from 'types/interfaces'

export async function createPGPMessage({
  message,
  publicKey,
  privateKey,
  password,
}: EncryptMessage) {
  if (password) {
    const messageObj = Message.fromText(message)
    const publicKeyObj = await readKey({ armoredKey: publicKey })
    const privateKeyObj = await readKey({ armoredKey: privateKey })
    const decryptedPrivateKey = await decryptKey({
      privateKey: privateKeyObj,
      passphrase: password,
    })
    const encryptedMessage = await encrypt({
      message: messageObj,
      publicKeys: publicKeyObj,
      privateKeys: decryptedPrivateKey,
    })
    return encryptedMessage
  } else {
    const messageObj = Message.fromText(message)
    const publicKeyObj = await readKey({ armoredKey: publicKey })
    const privateKeyObj = await readKey({ armoredKey: privateKey })
    const encryptedMessage = await encrypt({
      message: messageObj,
      publicKeys: publicKeyObj,
      privateKeys: privateKeyObj,
    })
    return encryptedMessage
  }
}

export async function decryptMessage(
  { message, username, encrypted, room, id, event }: MessageData,
  { publicKey, privateKey, password }: KeyPair
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
  return {
    message: decryptedMessage.data,
    username,
    encrypted: false,
    room,
    id,
    event,
  }
}
