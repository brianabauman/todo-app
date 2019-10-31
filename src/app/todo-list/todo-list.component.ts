import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { config } from '../app.config';
import { Todo } from '../app.model';
import { TodoService } from '../todo.service'
import { TodoItemComponent } from '../todo-item/todo-item.component'; 

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  private todos: Observable<any>;

  constructor(private db: AngularFirestore, private todoService: TodoService) { }

  ngOnInit() {
      this.todos = this.db
            .collection(config.collection_endpoint)
            .snapshotChanges()
            .pipe(map(actions => {
                return actions.map(a => {
                    //Get document data
                    const data = a.payload.doc.data() as Todo;
                    //Get document id
                    const id = a.payload.doc.id;
                    //Use spread operator to add the id to the document data
                    return { id, ...data };
                });
            }));
  }

}
