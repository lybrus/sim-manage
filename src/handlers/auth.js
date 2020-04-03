import request, { updateToken } from '~/request'

const definitions = [
    { name: 'pair', defaultOption: true, multiple: true }
]

async function auth({ pair }) {
    const [username, password] = pair

    try {
        const response = await request({
            path: `/oauth/token`,
            method: 'POST',
            ignoreAuth: true,
            urlParams: {
                grant_type: 'password',
                client_id: username,
                username,
                password
            }
        })

        const { access_token: accessToken, refresh_token: refreshToken, expires_in: expiresIn } = response

        updateToken({
            accessToken,
            refreshToken,
            expiresIn: +new Date() + expiresIn
        })

        return `access token: ${ accessToken }\nok`
    } catch (e) {
        const { statusCode } = e

        if (statusCode === 401) {
            return 'Auth fails'
        }
    }
}

export async function refreshToken(refreshToken) {
    try {
        const response = await request({
            path: `/oauth/token`,
            method: 'POST',
            ignoreAuth: true,
            urlParams: {
                grant_type: 'refresh_token',
                refresh_token: refreshToken
            }
        })

        const { access_token: accessToken, refresh_token: refreshToken, expires_in: expiresIn } = response

        updateToken({
            accessToken,
            refreshToken,
            expiresIn: +new Date() + expiresIn
        })

        return true
    } catch (e) {
        return false
    }
}

export default {
    definitions,
    handle: auth
}
