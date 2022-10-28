import { BelongsTo, Column, CreatedAt, ForeignKey, Model, Table, UpdatedAt } from "sequelize-typescript"
import User from "./User"

@Table
class Todo extends Model {

    @Column
    title!: string

    @Column
    message!: string

    @Column
    active!: boolean

    @Column
    @CreatedAt
    createdAt?: Date

    @Column
    @UpdatedAt
    updatedAt?: Date

    @Column
    @ForeignKey( () => User)
    userId!: number

    @BelongsTo(() => User)
    user!: User

    toJson<Todo>(): Todo {
        const todo = super.toJSON();
        return {...todo}
    }
}

export default Todo