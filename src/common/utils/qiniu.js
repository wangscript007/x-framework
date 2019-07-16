import CryptoJS from 'crypto-js'
import { base64Encode } from './index'

const AK = 'Your AccessKey'
const SK = 'Your SecretKey'
const BUCKET = 'Your BucketName'
const DEADLINE = Math.round(new Date().getTime() / 1000) + 3600

export function createUploadToken () {
  const encoded = base64Encode(JSON.stringify({ scope: BUCKET, deadline: DEADLINE }))
  let encoded_signed = CryptoJS.HmacSHA1(encoded, SK).toString(CryptoJS.enc.Base64)
  encoded_signed = encoded_signed.replace(/\+/g, '-')
  encoded_signed = encoded_signed.replace(/\//g, '_')
  return `${AK}:${encoded_signed}:${encoded}`
}
