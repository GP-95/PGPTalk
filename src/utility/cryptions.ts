import { encrypt, Message, readKey, decryptKey, decrypt, sign } from './pgp'
import * as openpgp from './pgp'
import type { EncryptMessage, KeyPair, MessageData } from 'types/interfaces'

export async function createPGPMessage({
  message,
  publicKey,
  privateKey,
  password,
}: EncryptMessage) {
  // Creates PGP object types
  let messageObj = Message.fromText(message)
  const publicKeyObj = await readKey({ armoredKey: publicKey })
  let privateKeyObj = await readKey({ armoredKey: privateKey })

  // Decrypts private key, if it is encrypted
  if (password) {
    privateKeyObj = await decryptKey({
      privateKey: privateKeyObj,
      passphrase: password,
    })
  }

  // Signs message
  const clearText = openpgp.CleartextMessage.fromText(message)
  const signedMessage = await sign({
    message: clearText,
    privateKeys: privateKeyObj,
  })
  messageObj = Message.fromText(signedMessage)

  const encryptedMessage = await encrypt({
    message: messageObj,
    publicKeys: publicKeyObj,
    privateKeys: privateKeyObj,
  })

  return encryptedMessage
}

export async function decryptMessage(
  { message, username, encrypted, room, id, event }: MessageData,
  { publicKey, privateKey, password, name, email }: KeyPair,
  fromPublicKey: any
): Promise<MessageData> {
  // Creating and decrypting private key object
  let privateKeyObj = await readKey({ armoredKey: privateKey })
  if (password) {
    privateKeyObj = await decryptKey({
      privateKey: privateKeyObj,
      passphrase: password,
    })
  }

  // Creatingh and decrypting message object
  let messageObj = await openpgp.readMessage({ armoredMessage: message })
  const decryptedMessage: any = await decrypt({
    message: messageObj,
    privateKeys: privateKeyObj,
  })

  // Check signature with sender's public key
  const publicKeyObj: any = await readKey({ armoredKey: fromPublicKey })
  const signedMessage = await openpgp.readCleartextMessage({
    cleartextMessage: decryptedMessage.data,
  })
  const checkedMessage: any = await openpgp.verify({
    message: signedMessage,
    publicKeys: publicKeyObj,
  })

  console.log(checkedMessage)

  return {
    message: checkedMessage.data,
    username,
    encrypted: false,
    verified: checkedMessage.signatures[0].valid,
    room,
    id,
    event,
  }
}
