const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const inovador_id = request.headers.authorization;
        
        const projetos = await connection('projetos')
            .where('inovadores_id',inovador_id )
            .select('*');

        return response.json(projetos);
    }
}