export class ProductoModel { 
	
	public idproducto?: number;
	public idusuario?: number;
	public nombre?: string;
	public codigo?: string;
	public descripcion?: string;	
	public valid?: number;	

	constructor(idproducto?:number, idusuario?:number, nombre?:string, codigo?:string, descripcion?:string, valid?:number){
		this.idproducto = idproducto;
		this.idusuario = idusuario;
		this.nombre = nombre;
		this.codigo = codigo;
		this.descripcion = descripcion;
		this.valid = valid;
	}
	
}