import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  titulo: string = 'Listado de Posts desde API';

  posts: any[] = [];

  // Paginación
  paginaActual: number = 1;
  itemsPorPagina: number = 5;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarPosts();
  }

  cargarPosts() {
    this.apiService.getPosts().subscribe({
      next: (data: any) => {
        this.posts = data;
      },
      error: (error) => {
        console.error('Error al obtener datos de la API', error);
      },
    });
  }

  get postsPaginados() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    return this.posts.slice(inicio, inicio + this.itemsPorPagina);
  }

  eliminarPost(id: number) {
    this.apiService.deletePost(id).subscribe({
      next: () => {
        this.posts = this.posts.filter((post) => post.id !== id);
      },
      error: (error) => {
        console.error('Error al eliminar', error);
      },
    });
  }

  siguientePagina() {
    if (this.paginaActual * this.itemsPorPagina < this.posts.length) {
      this.paginaActual++;
    }
  }

  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
    }
  }
}
