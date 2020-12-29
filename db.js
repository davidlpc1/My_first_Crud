const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./notes.db');

db.serialize(function(){
    
    //Criar a Tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS notes(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT NOT NULL
        ); 
    `);

    /*Inserir Dados Na Tabela
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    )
    VALUES (?,?,?,?,?);
    `

    const values = [
        'https://www.flaticon.com/svg/static/icons/svg/2729/2729007.svg',
        'Cursos de Programação',
        'Estudo',
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium consectetur alias rerum, eligendi necessitatibus ',
        'https://rocketseat.com.br/'
    ]

    
    db.run(query,values, function(err){
        if (err) return console.log(err)

        console.log(this)
    })
    */

    /* Deletar um dado na Tabela
    db.run(`DELETE FROM ideas WHERE id = ?`,[3], function(err){
        if(err) return console.log(err)

        console.log('Deletei', this)
    })
    */
    
    
    /*Consultar Dados na Tabela
    db.all(`SELECT * FROM ideas`,function(err,rows){
        if (err) return console.log(err)

        console.log(rows)
    })
    */

})

db.findAll = () => {
    return new Promise((resolve,reject) => {
        db.all(`SELECT * FROM notes`,(error,rows) => {
            if(error) reject(error)
    
            resolve(rows)
        })
    })
}

db.insertData = (data) => {
    return new Promise((resolve,reject) => {
        const query = `
        INSERT INTO notes(
            name,
            description
        )
        VALUES (?,?);
        `

        db.run(query,data,error => {
            if (error) return reject(error)
    
            resolve(`I have inserted ${this}`)
        })
    })
}

db.deleteNote = (id) => {
    return new Promise((resolve,reject) => {
        db.run(`DELETE FROM notes WHERE id = ?`,[id],error=>{
            if(error) return reject(error)
    
            resolve(`I have deleted the note with id ${id}`)
        })
    })
}

db.deleteAll = () => {
    return new Promise((resolve,reject) => {
        db.run(`DELETE FROM notes`,error=>{
            if(error) return reject(error)
    
            resolve('I have deleted all notes')
        })
    })
}

db.updateData = (data) => {
    return new Promise((resolve,reject) => {
        db.run(`UPDATE notes SET name = ?, description = ? WHERE id = ?`,[data.name,data.description,data.id],error=>{
            if(error) return reject(error)

            resolve(`I have updated the note with id ${data.id}`)
        })
    })
}

module.exports = db;

