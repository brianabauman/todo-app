import { config } from "./app.config";
import { Todo } from "./app.model";
import { Injectable } from "@angular/core";
import {
    AngularFirestoreDocument,
    AngularFirestore,
    AngularFirestoreCollection
} from "@angular/fire/firestore";

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    todos: AngularFirestoreCollection<Todo>;
    private todoDoc: AngularFirestoreDocument<Todo>;

    constructor(private db: AngularFirestore) {
        //Get the tasks collection
        this.todos = db.collection<Todo>(config.collection_endpoint);
    }

    addTodo(todo) {
        //Add the new todo to the collection
        this.todos.add(todo);
    }   //addTodo

    updateTodo(id, update) {
        //Get the todo document
        this.todoDoc = this.db.doc<Todo>(`${config.collection_endpoint}/${id}`);
        this.todoDoc.update(update);
    } //updateTodo

    updateTodoDueDate(id, newDueDate) {
        this.todoDoc = this.db.doc<Todo>(`${config.collection_endpoint}/${id}`);
        this.todoDoc.update({ dueDate: newDueDate });
    }

    deleteTodo(id) {
        //Get the todo document
        this.todoDoc = this.db.doc<Todo>(`${config.collection_endpoint}/${id}`);
        //Delete the document
        this.todoDoc.delete();
    } //deleteTodo
}
