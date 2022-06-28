import { Component } from '@angular/core';
import { Firestore, collectionData, collection, setDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'firebase-todolist';
  todos$: Observable<any>; // Variable namens item deklariert ($ hat keine Bedeutung)
  todos: Array<string> = ['todo1', 'todo2'];
  todotext: string = '';


  constructor(private firestore: Firestore) {
    const coll: any = collection(firestore, 'todos');
    this.todos$ = collectionData(coll);

    this.todos$.subscribe((newTodos) => {
      console.log('Neue Todos sind', newTodos);
      this.todos = newTodos;
    });
  }

  addTodo() {
    const coll: any = collection(this.firestore, 'todos');
    setDoc(doc(coll), { name: this.todotext });
  }
}
