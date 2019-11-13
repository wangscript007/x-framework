import * as developmentPath from '@/api/path/path-development'
import * as productionPath from '@/api/path/path-production'

const apiPath = process.env.NODE_ENV === 'production' ? productionPath : developmentPath

export default apiPath
