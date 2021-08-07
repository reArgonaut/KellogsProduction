import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
//Material
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InventarioService } from 'src/app/services/invetario.service';
import { DatosInventario } from 'src/app/models/inventario';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public simpleForm: FormGroup;

  /*Cambiar color del fondo*/
  bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];
  htmlTag: HTMLElement = document.getElementsByTagName('html')[0];

  ELEMENT_DATA: DatosInventario[]=[];
  displayedColumns: string[] = [
    'nombre',
    'precio',
    'marca',
    'actions'
  ];
  dataSource = new MatTableDataSource<DatosInventario>(this.ELEMENT_DATA);
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  action = true;
  nuevo = true;
  constructor(public service: InventarioService) {this.simpleForm =  this.crearFormulario(); }

  ngOnInit(): void {
        /*Cambiar color del fondo*/
        this.bodyTag.classList.add('login-pagina');
        this.htmlTag.classList.add('login-pagina');
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.getAll();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onSubmit() {
    if (this.simpleForm.value._id == 0) {
      this.service.postDatos(this.simpleForm.value).subscribe((res) => {
        window.alert('Se Guardo Correctamente');
        this.getAll();
      });
    } else {
      this.service.putDatos(this.simpleForm.value).subscribe((res) => {
        window.alert('Se Actualizo Correctamente');
        this.getAll();
      });
    }
  }

  onEdit(inv: DatosInventario) {
    this.simpleForm.patchValue(inv)
  }

  onDelete(_id: string) {
    if (confirm('Estas Seguro que deseas eliminarlo ?') == true) {
      this.service.deleteDato(_id).subscribe((res) =>{
        this.getAll();
        window.alert({ html: 'Eliminado Correctamente', classes: 'rounded' });
        
      });
    }
  }
  resetForm(){
    this.simpleForm.reset(
      {_id: 0}
    );
  }

  getAll() {
    let resp = this.service.getDatosList();
    resp.subscribe((res) => (this.dataSource.data = res as DatosInventario[]));
  }

  crearFormulario(){
    return new FormGroup({
      _id      : new FormControl(0),
      nombre  : new FormControl(''),
      precio  : new FormControl(''),
      marca   : new FormControl('')
    })
  }

}
