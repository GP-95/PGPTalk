import { encrypt, Message, readKey, decryptKey, decrypt, sign } from './pgp'
import * as openpgp from './pgp'
import type { EncryptMessage, KeyPair, MessageData } from 'types/interfaces'
import { pubKey } from './publicKey'

export async function createPGPMessage(
  { message, publicKey, privateKey, password }: EncryptMessage,
  signMessage: boolean
) {
  // Creates PGP object types
  let messageObj = Message.fromText(message)
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
    const signature = await messageObj.signDetached([privateKeyObj])
    console.log(signature)
    const encryptedMessage = await encrypt({
      message: messageObj,
      publicKeys: publicKeyObj,
      privateKeys: privateKeyObj,
      signature: signature,
    })
    return encryptedMessage
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
  let privateKeyObj = await readKey({ armoredKey: privateKey })
  if (password) {
    privateKeyObj = await decryptKey({
      privateKey: privateKeyObj,
      passphrase: password,
    })
  }

  let messageObj = await openpgp.readMessage({ armoredMessage: message })
  const decryptedMessage: any = await decrypt({
    message: messageObj,
    privateKeys: privateKeyObj,
  })

  // if (false) {
  //   const publicKeyObj = await readKey({ armoredKey: pubKey })

  //   console.log('-------------------------')
  //   console.log(verifiedMsg)
  //   console.log('-------------------------')
  // }

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
