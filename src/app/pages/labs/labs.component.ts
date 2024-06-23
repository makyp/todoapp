import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Hola !!';
  tasks = [
    'Instalar en angular en CLI',
    'Crear proyecto',
    'Crear componentes',
  ]
  name = 'Makyp';
  age = 20;
  disabled = true;//Asignando una propiedad
  img = 'https://w3schools.com/howto/img_avatar.png';
  //Creando objetos
  person = {
    name: 'Maira',
    age: 15,
    avatar: 'https://w3schools.com/howto/img_avatar.png'
  }

  clickHandler(){
    alert('Hola')
  }

  changeHandler(event: Event){
    console.log(event)

  }

  keydownHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement;
    console.log(input.value)

  }
}
