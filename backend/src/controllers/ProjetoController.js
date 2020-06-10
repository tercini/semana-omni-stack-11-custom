const connection = require('../database/connection');

module.exports = {

    async index(request, response){

        const { page = 1} = request.query;

        const [count] = await connection('projetos').count();

        const projetos = await connection('projetos')
        .join('inovadores', 'inovadores.id', '=', 'projetos.inovadores_id')
        .limit(5)
        .offset( (page-1) * 5 )
        .select([
            'projetos.*',
            'inovadores.name',
            'inovadores.email',
            'inovadores.whatsapp',
            'inovadores.city',
            'inovadores.uf'
        ]);

        response.header('X-Total-Count', count['count(*)']);
        
        
        return response.json(projetos);
    },

    async create(request, response) {
        const {title, description, value} = request.body;
        const inovadores_id = request.headers.authorization;

        const [id] = await connection('projetos').insert({
            title,
            description,
            value,
            inovadores_id,
        });

        return response.json({id});
    },

    async delete (request, response){
        const { id } = request.params;
        const inovadores_id = request.headers.authorization;
        
        const projeto = await connection('projetos')
            .where('id', id)
            .select('inovadores_id')
            .first();            

        if(projeto.inovadores_id != inovadores_id){
            return response.status(401).json({error: 'Operation not permited.' });
        }

        await connection('projetos').where('id', id).delete();

        return response.status(204).send();
    }
};

//Parei em 1:09:31