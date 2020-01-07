import cluster from 'cluster'
import useCluster from './server/helpers/cluster'
import server from './server/server'
import config from './server/config/config'

console.log('========================')
console.log(process.env)
console.log('========================')

if (useCluster) {
    if (cluster.isMaster) {
        console.log(`Running cluster's master. Number of CPUs: ${useCluster}`)
        forkWorkers(useCluster)
    } else {
        startWorker()
    }
} else {
    console.log('Running without cluster.')
    startWorker()
}

function startWorker() {
    server.listen(config.port)
}

function forkWorkers(numberOfCpus) {
    for (let i = 0; i < numberOfCpus; i++) {
        const worker = cluster.fork()
        console.log(`Forked new worker: ${worker.id}`)
        worker.on('exit', (code, signal) => {
            if (signal) {
                console.error(`Worker was killed by signal: ${signal}`)
            } else if (code !== 0) {
                console.error(`Worker exited with error code: ${code}`)
            } else {
                console.log('Worker success!')
            }
        })
    }
}
