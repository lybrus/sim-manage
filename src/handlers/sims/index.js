import request, { updateToken } from '~/request'

const definitions = [
    { name: 'pair', defaultOption: true, multiple: true }
]

async function sims() {
    try {
        const response = await request({ path: `/get_account_sims` })

        const { found, offset, total, sims } = response
        //const sim = sims.filter(({status: {primary}}) => primary === 'ON')[0]

        //simSleep(sim)
        //return sims.filter(({ group }) => group === 'Store').map(({ iccid }) => iccid).join('\n')
        return sims.map(({ iccid }) => iccid).join('\n')
    } catch (e) {
        return 'error'
    }
}

export default {
    definitions,
    handle: sims
}
