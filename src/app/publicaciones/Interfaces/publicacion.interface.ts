export interface PaginacionPublicacion {
    content:          Publicacion[];
    pageable:         Pageable;
    totalPages:       number;
    last:             boolean;
    totalElements:    number;
    size:             number;
    number:           number;
    sort:             Sort;
    numberOfElements: number;
    first:            boolean;
    empty:            boolean;
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
    tiposDePagos:      Categoria[];
}

export interface Pageable {
    sort:       Sort;
    offset:     number;
    pageSize:   number;
    pageNumber: number;
    unpaged:    boolean;
    paged:      boolean;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}

export interface Categoria {
    id:                number;
    fechaCreacion:     Date;
    fechaModificacion: null;
    fechaBaja:         null;
    nombre?:           string;
}