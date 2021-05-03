module.exports = (sequelize, dataType) => {

    alias = 'Movie',

    cols = {
        title: dataType.STRING,
        rating: dataType.DECIMAL,
        awards: dataType.INTEGER,
        release_date: dataType.INTEGER,
        length: dataType.INTEGER,
        genre_id: dataType.INTEGER
    }

    config = {
        tablename: 'movies',
        timestamps: false
    }

    var Movie = sequelize.define(alias, cols, config)
    
    Movie.associate = function(models){
        Movie.belongsTo(models.Genre, {
            as: 'genero',
            foreignKey: 'genre_id'
        })

        Movie.belongsToMany(models.Actor, {
            as: 'actores',
            through: 'actor_movie',
            foreignKey: 'movie_id',
            other_id: 'actor_id',
            timestamps: false
        })
    }   
    return Movie
}