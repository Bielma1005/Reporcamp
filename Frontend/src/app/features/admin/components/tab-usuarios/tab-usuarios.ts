import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario, USUARIOS_MOCK } from '../../../../models/usuario';

@Component({
  selector: 'app-tab-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tab-usuarios.html',
  styleUrl: './tab-usuarios.scss'
})
export class TabUsuarios implements OnInit {

  usuarios = signal<Usuario[]>([]);
  busqueda = signal('');
  filtroRol = signal('all');
  mostrarModal = signal(false);

  // Nuevo usuario
  nuevoNombre  = '';
  nuevoCorreo  = '';
  nuevoRol     = 'ciudadano';
  nuevoArea    = '';

  usuariosFiltrados = () => {
    let lista = this.usuarios();
    const b = this.busqueda().toLowerCase();
    const r = this.filtroRol();
    if (r !== 'all') lista = lista.filter(u => u.rol === r);
    if (b) lista = lista.filter(u =>
      u.nombre.toLowerCase().includes(b) ||
      u.correo.toLowerCase().includes(b)
    );
    return lista;
  };

  ngOnInit(): void { this.usuarios.set(USUARIOS_MOCK); }

  getRolClass(rol: string): string { return `rol-${rol}`; }
  getRolLabel(rol: string): string {
    const labels: Record<string, string> = { admin: 'Admin', tecnico: 'Técnico', ciudadano: 'Ciudadano', invitado: 'Invitado' };
    return labels[rol] ?? rol;
  }

  abrirModal():  void { this.mostrarModal.set(true);  }
  cerrarModal(): void { this.mostrarModal.set(false); }

  crearUsuario(): void {
    if (!this.nuevoNombre.trim() || !this.nuevoCorreo.trim()) {
      window.alert('Completa nombre y correo para crear el usuario.');
      return;
    }

    const nuevo: Usuario = {
      id: Date.now(),
      nombre: this.nuevoNombre.trim(),
      apellido: '',
      correo: this.nuevoCorreo.trim(),
      rol: this.nuevoRol as any,
      area: this.nuevoArea.trim(),
      iniciales: this.nuevoNombre.trim().substring(0, 2).toUpperCase(),
      color: '#7A1F2B',
      activo: true,
      ultimoAcceso: 'Ahora',
      totalReportes: 0
    };

    this.usuarios.update(list => [...list, nuevo]);
    this.cerrarModal();
    this.nuevoNombre = '';
    this.nuevoCorreo = '';
    this.nuevoArea   = '';

    window.alert('Usuario creado correctamente.');
  }
}