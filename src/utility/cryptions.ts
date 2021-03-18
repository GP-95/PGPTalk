import { encrypt, Message, readKey } from './pgp'
import type { EncryptMessage } from 'types/interfaces'
// import { encrypt, readKey, Message } from 'openpgp'

export async function encryptMessage(options: EncryptMessage) {
  if (options.password) {
    const encryptedMessage = await encrypt({
      message: Message.fromText(options.message),
      publicKeys: readKey({ armoredKey: options.publicKey }),
      privateKeys: readKey({ armoredKey: options.privateKey }),
      passwords: options.password,
    })
    console.log(encryptedMessage)
    return encryptedMessage
  } else {
    const encryptedMessage = await encrypt({
      message: Message.fromText(options.message),
      publicKeys: readKey({ armoredKey: options.publicKey }),
      privateKeys: readKey({ armoredKey: options.privateKey }),
    })
    console.log(encryptedMessage)
    return encryptedMessage
  }
}
