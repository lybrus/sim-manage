import commandLineArgs from 'command-line-args'
import request from './request'
import auth from './handlers/auth'

const mainDefinitions = [
    { name: 'command', defaultOption: true }
]
const mainOptions = commandLineArgs(mainDefinitions, { stopAtFirstUnknown: true })

const commandsDefinitions = {
    auth
}

const { command, _unknown: argv = [] } = mainOptions

if (commandsDefinitions[command]) {
    const { definitions, handle } = commandsDefinitions[command]

    const commandOptions = commandLineArgs(definitions, { argv })

    handle(commandOptions)
}
