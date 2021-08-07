import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatosInventario } from '../models/inventario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  readonly URL = 'http://localhost:3501/inventario';

  info: any = [];

  selectInventario: DatosInventario;
  DatosInventario: DatosInventario[];

  constructor(private http: HttpClient) {
    this.http.get(this.URL).subscribe((resp: any) => {
      this.info = resp;
    });
  }
  postDatos(inv: any) {
    return this.http.post(this.URL, inv);
  }

  getDatosList() {
    return this.http.get(this.URL);
  }

  putDatos(inv: DatosInventario) {
    return this.http.put(this.URL + `/${inv._id}`, inv);
  }
  
  deleteDato(id: string) {
    return this.http.delete(this.URL + `/${id}`);
  }
}
