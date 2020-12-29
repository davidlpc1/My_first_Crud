const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./notes.db');

db.serialize(() => {
    
    //Criar a Tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS notes(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT NOT NULL
        ); 
    `);

})

db.findAll = () => {
    return new Promise((resolve,reject) => {
        db.all(`SELECT * FROM notes`,(error,rows) => {
            if(error) reject(error)
    
            resolve(rows)
        })
    })
}

db.findOne = (id) => {
    return new Promise((resolve,reject) => {
        db.all(`SELECT * FROM notes WHERE id=?`,[id],(error,rows) => {
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

db.updateData = (data) => {
    return new Promise((resolve,reject) => {
        db.run(`UPDATE notes SET name = ?, description = ? WHERE id = ?`,[data.name,data.description,data.id],error=>{
            if(error) return reject(error)

            resolve(`I have updated the note with id ${data.id}`)
        })
    })
}

module.exports = db;