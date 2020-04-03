import fs from 'fs'
import path from 'path'
import bent from 'bent'
import { refreshToken as refreshTokenFunc } from './handlers/auth'

const baseUrl = 'https://api.1ot.mobi/v1'

const tokenFile = '../token'
const tokenFilePath = path.resolve(__dirname, tokenFile)
const tokenObject = {}

if (fs.existsSync(tokenFilePath)) {
    const tokenObjectString = fs.readFileSync(tokenFilePath, { encoding: 'utf-8' })

    Object.assign(tokenObject, JSON.parse(tokenObjectString))
}

export default async ({ path, method = 'GET', data = {}, ignoreAuth = false, urlParams = {} }) => {
    const { accessToken, expiresIn, refreshToken } = tokenObject

    if (!ignoreAuth) {
        if (accessToken === undefined) {
            console.log('not auth')
            throw new Error('not auth')
        }

        if (expiresIn < new Date()) {
            await refreshTokenFunc(refreshToken)
        }
    }

    const urlParamsString = Object
        .keys(urlParams)
        .map(key =>
            (urlParams[key] instanceof Array) ?
                urlParams[key].map(value => `${ key }=${ value }`).join('&') :
                `${ key }=${ urlParams[key] }`)
        .join('&')

    const fullPath = `${ path }${ urlParamsString ? '?' : '' }${ urlParamsString }`
    //console.log(`${ method } ${ baseUrl }${ fullPath }`)

    const headers = {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${ accessToken }`
    }
    //console.log(headers)

    const requestParams = method.toUpperCase() === 'GET' ? [fullPath] : [fullPath, data]

    const response = await bent(baseUrl, method.toUpperCase(), 'json', headers)(...requestParams)

    return response
}

export function updateToken(newTokenObject) {
    Object.assign(tokenObject, newTokenObject)
    fs.writeFileSync(tokenFilePath, JSON.stringify(tokenObject))
}
