import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  //Convertimos un arreglo en una señal
  welcome = 'Hola !!';
  tasks = signal([
    'Instalar en angular en CLI',
    'Crear proyecto',
    'Crear componentes',
  ]);
  name = signal('Makyp');
  age = 20;
  disabled = true;//Asignando una propiedad
  img = 'https://w3schools.com/howto/img_avatar.png';
  //Creando objetos
  person = signal({
    name: 'Makyp',
    age: 20,
    avatar: 'https://w3schools.com/howto/img_avatar.png'
  });

  clickHandler(){
    alert('Hola')
  }

  changeHandler(event: Event){
    const input = event.target as HTMLInputElement;
    const nerValue = input.value;
    this.name.set(nerValue);//Es la mejor manera para que sea dinamico y reaccione

  }

  keydownHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement;
    console.log(input.value)

  }

  changeAge(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return {
        ...prevState,
        age: parseInt(newValue,10)
      }
    } );
  }

  changeName(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return {
        ...prevState,
        name: newValue
      }
    } );
  }

  colorCtrl = new FormControl();

  constructor (){
    this.colorCtrl.valueChanges.subscribe(value => {
      console.log(value)
    })
  }

  widthCrtl = new FormControl(50,{
    nonNullable: true,
  });
}
