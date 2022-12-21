export interface Venta {
    id?:                number;
    fechaCreacion?:     Date | null;
    fechaModificacion?: Date | null;
    fechaBaja?:         Date | null;
    direccion?:         Direccion;
    pago?:              Pago;
    carrito?:           Carrito;
}

export interface Carrito {
    id?:                number;
    fechaCreacion?:     Date;
    fechaModificacion?: null;
    fechaBaja?:         null;
    precioTotal?:       number;
    items?:             Item[];
}

export interface Item {
    id?:                number;
    fechaCreacion?:     Date;
    fechaModificacion?: null;
    fechaBaja?:         null;
    publicacion?:       Publicacion;
    precioUnitario?:    number;
    cantidad?:          number;
    subTotal?:          number;
}

export interface Publicacion {
    id?:                    number;
    fechaCreacion?:         Date;
    fechaModificacion?:     null;
    fechaBaja?:             null;
    nombre?:                PublicacionNombre;
    categoria?:             Categoria;
    vendedor?:              VendedorEnum;
    imagen?:                string;
    stock?:                 number;
    estado?:                Estado;
    productoPersonalizado?: ProductoPersonalizado;
}

export enum Categoria {
    PrendaSuperior = "prenda-superior",
}

export enum Estado {
    Activa = "ACTIVA",
}

export enum PublicacionNombre {
    RemeraPersonalizadaDeSpidermanParaNiños = "Remera personalizada de Spiderman para niños",
    RemeraPersonalizadaDeTuHombreArañaFavoritoParaNiños = "Remera personalizada de tu hombre araña favorito para niños",
    RemeraPersonalizadaDelCapitanAmericaParaNiños = "Remera personalizada del capitan america para niños",
}

export interface ProductoPersonalizado {
    id?:                number;
    fechaCreacion?:     Date;
    fechaModificacion?: null;
    fechaBaja?:         null;
    producto?:          Producto;
    vendedor?:          VendedorClass;
    personalizaciones?: Personalizacione[];
    precio?:            number;
}

export interface Personalizacione {
    id?:                     number;
    fechaCreacion?:          Date;
    fechaModificacion?:      null;
    fechaBaja?:              null;
    posiblePersonalizacion?: Posible;
    contenido?:              Contenido;
    precioXPersonalizacion?: number;
}

export enum Contenido {
    Advanger = "Advanger",
    CapitanAmerica = "Capitan America",
    Spiderman = "Spiderman",
}

export interface Posible {
    id?:                number;
    fechaCreacion?:     Date;
    fechaModificacion?: null;
    fechaBaja?:         null;
    area?:              Pago;
    tipo?:              Pago;
}

export interface Pago {
    id?:                number;
    fechaCreacion?:     Date;
    fechaModificacion?: null;
    fechaBaja?:         null;
    nombre?:            PagoNombre;
    tipo?:              Tipo;
}

export enum PagoNombre {
    Delante = "Delante",
    Dibujo = "Dibujo",
    Frente = "Frente",
    Imagen = "Imagen",
    Pecho = "Pecho",
    PrendaSuperior = "Prenda superior",
    Texto = "Texto",
}

export enum Tipo {
    Efectivo = "Efectivo",
    Tarjeta = "Tarjeta",
}

export interface Producto {
    id?:                        number;
    fechaCreacion?:             Date;
    fechaModificacion?:         null;
    fechaBaja?:                 null;
    nombre?:                    ProductoNombre;
    color?:                     Color;
    precioBase?:                number;
    tiempoDeFabricacion?:       number;
    categoria?:                 Pago;
    posiblesPersonalizaciones?: Posible[];
    gestor?:                    Gestor;
}

export enum Color {
    Blanco = "Blanco",
    Gris = "Gris",
}

export interface Gestor {
    id?:                number;
    fechaCreacion?:     Date;
    fechaModificacion?: null;
    fechaBaja?:         null;
    nombre?:            GestorNombre;
    apellido?:          GestorApellido;
    dni?:               string;
    email?:             GestorEmail;
}

export enum GestorApellido {
    Prieto = "Prieto",
}

export enum GestorEmail {
    CamiloprietoGmailCOM = "camiloprieto@gmail.com",
}

export enum GestorNombre {
    Camilo = "Camilo",
}

export enum ProductoNombre {
    Remera = "Remera",
}

export interface VendedorClass {
    id?:                number;
    fechaCreacion?:     Date;
    fechaModificacion?: null;
    fechaBaja?:         null;
    nombre?:            VendedorNombre;
    apellido?:          VendedorApellido;
    dni?:               string;
    email?:             VendedorEmail;
    nombreTienda?:      NombreTienda;
    logo?:              string;
    tiposDePagos?:      Pago[];
}

export enum VendedorApellido {
    Perez = "Perez",
}

export enum VendedorEmail {
    JuanperezGmailCOM = "juanperez@gmail.com",
}

export enum VendedorNombre {
    Juan = "Juan",
}

export enum NombreTienda {
    MagicStore = "Magic Store",
}

export enum VendedorEnum {
    Magic = "magic",
}

export interface Direccion {
    id?:                number;
    fechaCreacion?:     Date;
    fechaModificacion?: null;
    fechaBaja?:         null;
    calle?:             Calle;
    altura?:            string;
    piso?:              string;
    depto?:             string;
    localidad?:         Localidad;
    provincia?:         Provincia;
}

export enum Calle {
    Bonifacini = "Bonifacini",
    Calle = "calle",
    Campos = "campos",
}

export enum Localidad {
    Localidad = "localidad",
    SANMartin = "San martin",
}

export enum Provincia {
    BuenosAires = "Buenos Aires",
    Provincia = "provincia",
}
