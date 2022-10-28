import { AppError } from "../middlewares/errors";
import Todo from "../models/Todo";
import User from "../models/User";

export interface TodoRequest {
    title: string;
    message: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    userId: User;
}

class TodoService {

    findAll(): Promise<Todo[]> {
        return Todo.findAll({
           attributes: {
            exclude: ['active']
        }
        })
    }

    async create(todoRequest: TodoRequest): Promise<Todo> {
        try {
            return Todo.create({
                ...todoRequest
            })
        } catch (e) {
            throw new AppError({
                customMessage: 'Error while creating todo',
                status: 400
            })
        }
    }

    async update(id: number | string, todoRequest: TodoRequest) : Promise<Todo> {
        const todo = await this.findById(id)
        return todo.update(todoRequest)
    }

    async findById(id?: string | number | undefined): Promise<Todo> {
        this.validateId(id)
        
        const todo = await Todo.findOne({ where: { id } })

        if(!todo) {
            throw new AppError({
                customMessage: 'Todo not found',
                status: 404
            })
        }
        
        return todo
    }

    async deleteById(id?: string | number | undefined): Promise<Todo> {
       this.validateId(id)

       const todo = await this.findById(id)

       this.validateTodo(todo)

       Todo.destroy({ where: { id } })

       return todo
    }

    validateId(id?: string | number | undefined) {
        if(!id) {
            throw new AppError({
                customMessage: 'Please inform an Id',
                status: 400
            })
        }
    }

    validateTodo(todo: Todo) {
        if(!todo) {
            throw new AppError({
                customMessage: 'Todo informed not found',
                status: 404
            })
        }
    }

}

export default new TodoService()