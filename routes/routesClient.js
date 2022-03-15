const router = require('express').Router()
const Client = require('../models/Client')

router.post('/', async (req, res) =>{

    const {name, email, telephone,  approved} = req.body

    if(!name) {
        res.status(422).json({error: 'O nome é obrigatório!'})
        return
    }

    const client = {
        name,
        email,
        telephone,     
        approved,   
    }

    try{
        await Client.create(client)

        res.status(201).json({ message: 'Cliente inserido com sucesso'})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/', async (req, res) => {

    try{
        const clients = await Client.find()

        res.status(200).json(clients)
    } catch{
        res.status(500).json({ error: error})
    }
})

router.get('/:id', async (req, res) => {

    const id = req.params.id
    
    try{
        const client = await Client.findOne({_id: id})

        if(!client) {
            res.status(422).json({ message: 'O nome é obrigatório'})
            return
        }

        res.status(200).json(client)

    } catch (error) {
        res.status(500).json({ error: error })
    }

})

router.patch('/:id', async (req, res) => {
    
    const id = req.params.id

    const {name, email, telephone,  approved} = req.body

    const client = {
        name,
        email,
        telephone,     
        approved,   
    }

    try {
        
        const updatedClient = await Client.updateOne({_id: id}, client)
        
        if(updatedClient.matchedCount == 0) {
            res.status(422).json({ message: 'Usuário não encontrado'})
            return 
        }

        res.status(200).json(client)

    } catch(error) {
        res.status(500).json({ error: error })
    }
})

router.delete('/:id', async (req, res) => {

    const id = req.params.id

    const client = await Client.findOne({ _id: id})

    if(!client) {
        res.status(422).json({ message: 'Usuário não encontrado'})
        return
    }

    try {

        await Client.deleteOne({_id: id})

        res.status(200).json({ message: 'Usuário removido com sucesso'})

    } catch(error) {
        res.status(500).json({ error: error })  
    }

})


module.exports = router