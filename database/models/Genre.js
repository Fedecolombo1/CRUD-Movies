module.exports = (sequelize, dataType) => {

    alias = 'Genre',

    cols = {
        name: dataType.STRING,
        ranking: dataType.INTEGER,
    }

    config = {
        tablename: 'genres',
        timestamps: false
    }

    var Genre = sequelize.define(alias, cols, config)

    Genre.associate = function(models){
        Genre.hasMany(models.Movie, {
            as: 'peliculas',
            foreignKey: 'genre_id'
        })
    }

    return Genre
}