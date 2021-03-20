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
    console.log('doing this')
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
  { message, username, encrypted }: MessageData,
  { publicKey, privateKey, password }: KeyPair
): Promise<MessageData> {
  console.log('Entered decryption')
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
  console.log('Checking armored message')
  // const messageObj = await Message.fromText({ text: message })
  const messageObj = await openpgp.readMessage({ armoredMessage: message })
  console.log(messageObj)
  const decryptedMessage: any = await decrypt({
    message: messageObj,
    privateKeys: scopedPrivate,
  })
  console.log(decryptedMessage)
  return { message: decryptedMessage.data, username, encrypted: false }
}
