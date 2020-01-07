import os from 'os'
import config from '../config/config.js'

let useCluster = false
if (config.cluster === 'auto' && process.env.NODE_ENV === 'production') {
    useCluster = os.cpus().length
} else if (typeof config.cluster === 'number' && config.cluster > 0) {
    useCluster = Math.trunc(config.cluster)
}

export default useCluster
