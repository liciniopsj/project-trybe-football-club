import { DataTypes, Model } from 'sequelize';
import ITeam from '../../interfaces';
import db from '.';

export default class Team extends Model<ITeam> {
  declare id: number;
  declare teamName: string;
}

Team.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    teamName: {
      field: 'team_name',
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'teams',
    sequelize: db,
    underscored: true,
    timestamps: false,
  },
);
