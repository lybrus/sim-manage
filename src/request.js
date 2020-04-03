import fs from 'fs'
import path from 'path'
import request from 'request-promise'

const baseUrl = 'https://api.1ot.mobi/v1'

const tokenFile = '../token'
const tokenFilePath = path.resolve(__dirname, tokenFile)
let token = ''

if (fs.existsSync(tokenFilePath)) {
    token = fs.readFileSync(tokenFilePath, { encoding: 'utf-8' })
}

export default async ({ path, method = 'GET', data }) => {
    const response = await request[method.toLowerCase()]({
        url: `${ baseUrl }${ path }`,
        body: data,
        json: true
    })

    return response
}
