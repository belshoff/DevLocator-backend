/**
 * Imports
 */
const parseStringAssArray = require('../utils/parseStringAsArray')

/**
 * Models
 */
const Dev = require('../models/Dev')

module.exports = {

  /**
   * Listar os itens da tabela Dev
   * @param { Dados da Requisição } req 
   * @param { Dados da Resposta} res 
   */
  async index(req, res) {

    let { latitude, longitude, techs } = req.query

    techs = parseStringAssArray(techs)

    const devs = await Dev.find(
      {
        techs: {
          $in: techs
        },
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [ longitude, latitude ]
            },
            $maxDistance: 10000,
          },
        },
      }
    )

    return res.json(devs)
  }
}

/**
 * location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude]
            },
            $maxDistance: 10000,
          }
        }
 */