import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Todo } from '../app.model'
import { TodoService } from '../todo.service'

@Component({
  selector: 'app-new-todo-item',
  templateUrl: './new-todo-item.component.html',
  styleUrls: ['./new-todo-item.component.css']
})
export class NewTodoItemComponent implements OnInit {
  newTodoForm = new FormGroup({
    description: new FormControl(''),
    dueDate: new FormControl('')
  });

  constructor(private todoService: TodoService) { }

  onSubmit(todoData) { 
    const dueDate = this.newTodoForm.controls['dueDate'].value
    if (['urgent', 'week', 'days'].indexOf(dueDate) > -1) {
      const newTodo: Todo = {
        description: this.newTodoForm.controls['description'].value,
        dueDate: this.newTodoForm.controls['dueDate'].value
      };

      this.todoService.addTodo(newTodo);
      this.newTodoForm.reset();
    } else {
        alert("Please choose 'urgent', days', or 'week' as your due date.");
    }   
  }

  ngOnInit() {
  }

}
