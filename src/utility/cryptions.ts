import { encrypt } from './pgp'

export async function encryptMessage(
  message: any,
  publickey: any,
  privateKey: any
) {
  const encryptedMessage = await encrypt({
    message: message,
    publicKeys: publickey,
    privateKeys: privateKey,
  })

  console.log(encryptedMessage)
}
