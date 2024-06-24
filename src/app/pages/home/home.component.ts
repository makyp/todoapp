import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { Task } from './../../models/task.models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      tittle: 'Estudiar Angular',
      completed: false,
    },
    {
      id: Date.now(),
      tittle: 'Crear proyecto de Angular',
      completed: false,
    },
    {
      id: Date.now(),
      tittle: 'Hacer ejercicio',
      completed: false,
    },
  ]);

  newTaskCrtl = new FormControl('',{
    nonNullable: true, //No acepte valores nulos
    validators: [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('')


    ]
  })

  //Ya no se tiene que preguntar por el tarjet porque ya lo incluye el controlador
  changeHandler() {
    if (this.newTaskCrtl.valid){
      const value = this.newTaskCrtl.value.trim();
      if (value != ''){
        this.addTask(value);
        this.newTaskCrtl.setValue('');
      }

    }

  }

  addTask(tittle: string) {
    const newTask = {
      id: Date.now(),
      tittle,
      completed: false,
    };
    //Como agregar una nueva tarea
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) =>
      tasks.filter((task, position) => position !== index)
    );
  }

  updateTask(index: number) {
    this.tasks.update((task) => {
      return task.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      })
    })
  }
}
