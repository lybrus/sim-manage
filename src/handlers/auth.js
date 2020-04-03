

const definitions = [
    { name: 'pair', defaultOption: true, multiple: true }
]

function auth({ pair }) {
    const [username, password] = pair

    console.log(username, password)
}

export default {
    definitions,
    handle: auth
}
