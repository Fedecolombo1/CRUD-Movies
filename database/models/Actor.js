module.exports = (sequelize, dataType) => {

    alias = 'Actor',

    cols = {
        first_name: dataType.STRING,
        last_name: dataType.STRING,
        rating: dataType.DECIMAL,
        favorite_movie_id: dataType.STRING
    }

    config = {
        tablename: 'actors',
        timestamps: false
    }

    var Actor = sequelize.define(alias, cols, config)

    Actor.associate = function(models){
        Actor.belongsToMany(models.Movie, {
            as: 'peliculas',
            through: 'actor_movie',
            foreignKey: 'actor_id',
            other_id: 'movie_id',
            timestamps: false
        })
    }

    return Actor
}