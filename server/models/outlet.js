'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class outlet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.transaksi,{
        foreignKey: "id_outlet"
        // as: "transaksi outlet"
      })
      this.hasMany(models.user,{
        foreignKey: "id_outlet"
        // as: "user outlet"
      })
      this.hasMany(models.paket,{
        foreignKey: "id_outlet"
        // as: "outlet paket"
      })
    }
  }
  outlet.init({
    id_outlet: {
      type: DataTypes.INTEGER,
      primaryKey: true},
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    tlp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'outlet',
    tableName: 'outlet'
  });
  return outlet;
};