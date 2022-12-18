export interface Carrito {
    id:                number;
    fechaCreacion:     Date;
    fechaModificacion: null;
    fechaBaja:         null;
    precioTotal:       number;
    items:             Item[];
}

export interface Item {
    id:                number;
    fechaCreacion:     Date;
    fechaModificacion: null;
    fechaBaja:         null;
    publicacion:       Publicacion;
    precioUnitario:    number;
    cantidad:          number;
    subTotal:          number;
}

export interface Publicacion {
    id:                    number;
    fechaCreacion:         Date;
    fechaModificacion:     null;
    fechaBaja:             null;
    nombre:                string;
    categoria:             string;
    vendedor:              string;
    imagen:                string;
    stock:                 number;
    estado:                string;
    productoPersonalizado: ProductoPersonalizado;
}

export interface ProductoPersonalizado {
    id:                number;
    fechaCreacion:     Date;
    fechaModificacion: null;
    fechaBaja:         null;
    producto:          Producto;
    vendedor:          Vendedor;
    personalizaciones: Personalizacione[];
    precio:            number;
}

export interface Personalizacione {
    id:                     number;
    fechaCreacion:          Date;
    fechaModificacion:      null;
    fechaBaja:              null;
    posiblePersonalizacion: Posible;
    contenido:              string;
    precioXPersonalizacion: number;
}

export interface Posible {
    id:                number;
    fechaCreacion:     Date;
    fechaModificacion: null;
    fechaBaja:         null;
    area:              Categoria;
    tipo:              Categoria;
}

export interface Categoria {
    id:                number;
    fechaCreacion:     Date;
    fechaModificacion: null;
    fechaBaja:         null;
    nombre?:           string;
    tipo?:             string;
}

export interface Producto {
    id:                        number;
    fechaCreacion:             Date;
    fechaModificacion:         null;
    fechaBaja:                 null;
    nombre:                    string;
    color:                     string;
    precioBase:                number;
    tiempoDeFabricacion:       number;
    categoria:                 Categoria;
    posiblesPersonalizaciones: Posible[];
    gestor:                    Gestor;
}

export interface Gestor {
    id:                number;
    fechaCreacion:     Date;
    fechaModificacion: null;
    fechaBaja:         null;
    nombre:            string;
    apellido:          string;
    dni:               string;
    email:             string;
}

export interface Vendedor {
    id:                number;
    fechaCreacion:     Date;
    fechaModificacion: null;
    fechaBaja:         null;
    nombre:            string;
    apellido:          string;
    dni:               string;
    email:             string;
    nombreTienda:      string;
    logo:              string;
    tiposDePagos:      TiposDePago[];
}

export interface TiposDePago {
    id: number,
    fechaCreacion: Date,
    fechaModificacion: Date,
    fechaBaja: Date,
    tipo: string
}
