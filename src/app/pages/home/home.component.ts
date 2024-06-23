import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Task } from './../../models/task.models'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
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
    }
  ]);

  changeHandler(event:Event){
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.addTask(newTask);
  }

  addTask(tittle: string){
    const newTask = {
      id : Date.now(),
      tittle,
      completed: false,
    };
    //Como agregar una nueva tarea
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index));

  }
}
