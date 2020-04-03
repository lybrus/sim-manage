import commandLineArgs from 'command-line-args'
import auth from './handlers/auth'
import sims from './handlers/sims'

const mainDefinitions = [
    { name: 'command', defaultOption: true }
]
const mainOptions = commandLineArgs(mainDefinitions, { stopAtFirstUnknown: true })

const commandsDefinitions = {
    auth,
    sims
}

const { command, _unknown: argv = [] } = mainOptions

;(async () => {
    if (commandsDefinitions[command]) {
        const { definitions, handle } = commandsDefinitions[command]

        const commandOptions = commandLineArgs(definitions, { argv })

        const result = await handle(commandOptions)

        console.log(result)
    }
})()
