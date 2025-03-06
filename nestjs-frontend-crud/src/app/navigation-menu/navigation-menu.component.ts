import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent {
  loadComponent(component: string): void {
    const content = document.getElementById('content');
    if (content) {
      if (component === 'productos') {
        content.innerHTML = '<app-lista-producto></app-lista-producto>';
      } else if (component === 'departamentos') {
        content.innerHTML = '<app-lista-departamento></app-lista-departamento>';
      }
    }
  }
}
