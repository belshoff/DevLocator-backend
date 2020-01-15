/**
 * Impports
 */
const { Router } = require('express')

const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')


const routes = Router()

/**
 * /devs
 */
routes.get( '/devs', DevController.index )
routes.put( '/devs/:dev_id', DevController.edit )
routes.post( '/devs', DevController.store )
routes.delete( '/devs/:dev_id', DevController.destroy )

/**
 * /search
 */
routes.get( '/search', SearchController.index )

module.exports = routes