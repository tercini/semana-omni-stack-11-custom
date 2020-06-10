const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const { id } = request.body;

        const inovador = await connection('inovadores')
        .where('id', id)
        .select('name')
        .first();

        if(!inovador){
            return response.status(400).json({error: 'No Project found with this Id'});
        }

        return response.json(inovador);
    }
}