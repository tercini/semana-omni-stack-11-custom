exports.up = function(knex) {
    return knex.schema.createTable('projetos', function (table){
      table.increments();
      table.string('title').notNullable();
      table.string('description').notNullable();
      table.decimal('value').notNullable();
      
      table.string('inovadores_id').notNullable();
      table.foreign('inovadores_id').references('id').inTable('inovadores');
    });
  };
  
  exports.down = function(knex) {
   return knex.schema.dropTable('projetos');
  };
  