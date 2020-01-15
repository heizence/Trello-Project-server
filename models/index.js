// const Sequelize = require('sequelize');
// const sequelize = new Sequelize(
//   "trello", "root", "13791379", {host : 'localhost', dialect :'mysql'}
// )
// const db = {};

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// db.User = require('./users')(sequelize, Sequelize);
// // db.Ing = require('./ingredients')(sequelize, Sequelize);
// // db.Menu = require('./menus')(sequelize, Sequelize);
// // db.User_Ing = require('./user_ing')(sequelize, Sequelize);
// // db.Branch = require('./branchs')(sequelize, Sequelize);
// // db.Post = require('./posts')(sequelize, Sequelize);
// // db.Reply = require('./replys')(sequelize, Sequelize);
// // db.Party = require('./parties')(sequelize, Sequelize);


// db.User.hasMany(db.User_Ing)
// db.User_Ing.belongsTo(db.User)

// db.Ing.hasMany(db.User_Ing)
// db.User_Ing.belongsTo(db.Ing)

// db.Menu.belongsTo(db.Ing)
// db.Ing.hasMany(db.Menu)

// db.Branch.hasMany(db.Post)
// db.Post.belongsTo(db.Branch)

// db.Post.hasMany(db.Reply)
// db.Reply.belongsTo(db.Post)

// db.User.hasMany(db.Post)
// db.Post.belongsTo(db.User)

// db.User.hasMany(db.Reply)
// db.Reply.belongsTo(db.User)

// db.Post.hasOne(db.Party)
// db.Party.belongsTo(db.Post)


// module.exports = db;