/**
 * Imports
 */
const axios = require('axios')

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
    const devs = await Dev.find()

    return res.json(devs)
  },

  /**
   * Cria uma nova instância de Dev
   * @param { Dados da Requisição } req 
   * @param { Dados da Resposta } res 
   */
  async store (req, res) {
    const { github_username, techs, latitude, longitude } = req.body

    let dev = await Dev.findOne( { github_username } )

    if (!dev) {
      
      const git_infos = await axios.get(`https://api.github.com/users/${github_username}`)

      const { name = login, avatar_url, bio } = git_infos.data

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }

      dev = await Dev.create(
        {
          name, github_username, avatar_url, bio, techs, location
        }
      )

    }

    return res.json(dev)
  },

  /**
   * DELETE
   * @param {Requisição} req 
   * @param {Resposta} res 
   */
  async destroy (req, res) {
    const { dev_id } = req.params
    const dev = await Dev.findByIdAndDelete(dev_id)
    return res.json(!!dev ? dev : {})
  },

  async edit (req, res) {
    const { dev_id } = req.params

    const last_dev = await Dev.findById( dev_id )

    const new_dev = { techs, latitude, longitude, name, avatar_url, bio } = req.body

    const dev = await Dev.findByIdAndUpdate( dev_id, Object.assign(last_dev, new_dev), { new: true } )

    return res.json(dev)
  }
}