import { Component, computed, signal } from '@angular/core';
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

  filter = signal<'all' | 'pending' | 'completed'>('all');
  //computed: Crea un nuevo estado  a partir de los estados que esta vigilando
  //Todas las signals que esten dentro de el cuando cambien van a hacer que surga un nuevo estado
  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'pending'){
      return tasks.filter(task => !task.completed);
    }
    if (filter === 'completed'){
      return tasks.filter(task => task.completed);
    }
    return tasks;

  }
  )

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

  updateTaskEditingMode(index: number){
    this.tasks.update((task) => {
      return task.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            editing: true,
          };
        }
        return {
          ...task,
          editing: false,
        };
      })
    })

  }

  updateTaskText(index: number, event: Event){
    const input = event.target  as HTMLInputElement;
    this.tasks.update((prevState) => {
      return prevState.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            tittle: input.value,
            editing: false,
          };
        }
        return task;
      })
    })

  }

  changeFilter(filter: 'all' | 'pending' | 'completed'){
    this.filter.set(filter);
  }
}
