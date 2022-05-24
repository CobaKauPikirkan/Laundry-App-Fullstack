'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detail_transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.transaksi,{
        foreignKey: "id_transaksi"
        // as: "transaksi detail id"
      })
      this.belongsTo(models.paket,{
        foreignKey: "id_paket"
        // as: "paket detail"
      })
    }
  }
  detail_transaksi.init({
    id_detail_transaksi: {
      type: DataTypes.INTEGER,
      primaryKey: true},
    id_transaksi: DataTypes.INTEGER,
    id_paket: DataTypes.INTEGER,
    qty: DataTypes.DOUBLE,
    keterangan: DataTypes.STRING,
    total_harga: DataTypes.DOUBLE,
    total_bayar: DataTypes.DOUBLE,
    kembalian: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'detail_transaksi',
    tableName: 'detail_transaksi',
  });
  return detail_transaksi;
};