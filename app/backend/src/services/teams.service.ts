import Team from '../database/models/teams.model';
import ITeam from '../interfaces';

export default class TeamsService {
  static async findAll(): Promise<ITeam[]> {
    const data = await Team.findAll();
    return data;
  }

  static async findById(id: string): Promise<ITeam | null> {
    const data = await Team.findByPk(id);
    return data;
  }
}
