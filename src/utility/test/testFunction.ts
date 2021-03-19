import { encrypt, Message, readKey, decryptKey, decrypt } from '../pgp'
import * as openpgp from '../pgp'
import type { EncryptMessage, KeyPair, MessageData } from 'types/interfaces'

export async function createPGPMessage({
  message,
  publicKey,
  privateKey,
  password,
}: EncryptMessage) {
  if (password) {
    const messageObj = Message.fromText({ text: message })
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
    const messageObj = Message.fromText({ text: message })
    const publicKeyObj = await readKey({ armoredKey: publicKey })
    const privateKeyObj = await readKey({ armoredKey: privateKey })
    console.log('doing that')
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
  let scopedPrivate: any = privateKey
  if (password) {
    const privateKeyObj = await readKey({ armoredKey: privateKey })
    scopedPrivate = await decryptKey({
      privateKey: privateKeyObj,
      passphrase: password,
    })
  }
  const messageObj = await openpgp.readMessage({ armoredMessage: message })
  console.log(messageObj)
  const decryptedMessage = await decrypt({
    message: messageObj,
    privateKeys: scopedPrivate,
  })
  console.log(decryptedMessage)
  return { message: 'placeholder text', username, encrypted: false }
}

async function generateKeys(name, email) {
  const key = await openpgp.generateKey({
    userIds: { name: name, email: email },
  })
  return { public: key.publicKeyArmored, private: key.privateKeyArmored }
}

export async function decryptTest() {
  // Creating 2 users
  const user1 = await generateKeys('user1', 'user1@mail.com')
  const user2 = await generateKeys('user22', 'user2@mail.com')

  // Creating Key objects for both users

  // User1 Key Objects

  const user1PrivateKeyObject = await openpgp.readKey({
    armoredKey: user1.private,
  })
  const user1PublicKeyObject = await openpgp.readKey({
    armoredKey: user1.public,
  })

  //User2 Key Objects

  const user2PrivateKeyObject = await openpgp.readKey({
    armoredKey: user2.private,
  })
  const user2PublicKeyObject = await openpgp.readKey({
    armoredKey: user2.public,
  })

  // Creating Message object
  const messageObj = openpgp.Message.fromText({
    text: 'This is a message',
  })

  // Encrypting message with User1 private key
  const encryptedMessage = await openpgp.encrypt({
    message: messageObj,
    publicKeys: user2PublicKeyObject,
    privateKeys: user1PrivateKeyObject,
  })
  // Decrypting message-------------------------

  // Creating Message object from armored string
  const encryptedMessageObj = await openpgp.readMessage({
    armoredMessage: encryptedMessage,
  })

  // Decrypting Message object with User2 Private Key Object
  const decryptedMessage = await openpgp.decrypt({
    message: encryptedMessageObj,
    privateKeys: user2PrivateKeyObject,
  })

  return decryptedMessage
}
