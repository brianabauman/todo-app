import { Component, OnInit, Input } from '@angular/core';

import { Todo } from '../app.model'
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() id: string;
  @Input() description: string;
  @Input() dueDate: string;

  constructor(private todoService: TodoService) { }

  updateDueDate(dueDate) {
    this.todoService.updateTodoDueDate(this.id, dueDate);
  }

  deleteTodo(id) {
    this.todoService.deleteTodo(id);
  }
}
