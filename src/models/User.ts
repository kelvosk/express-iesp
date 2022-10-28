import {AutoIncrement, Column, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table
class User extends Model {

  @Column
  name?:string

  @Column
  password!: string

  @Column
  userName!: string

  @Column
  active!: boolean

  toJSON<User>(): User {
    const user = super.toJSON();
    return {...user, password: undefined}
  }
}

export default User