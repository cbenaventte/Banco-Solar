CREATE TABLE usuarios (
	id SERIAL PRIMARY KEY,
	nombre VARCHAR(50),
    balance FLOAT CHECK (balance >= 0));
	
	SELECT * FROM usuarios;

CREATE TABLE transferencias (
	id SERIAL PRIMARY KEY,
	emisor INT, receptor INT, 
	monto FLOAT,
	fecha TIMESTAMP,
	FOREIGN KEY (emisor) REFERENCES
    usuarios(id), FOREIGN KEY (receptor) REFERENCES usuarios(id));
	
	SELECT * FROM transferencias;
	
	
	SELECT fecha, emisor,receptor, nombre as nombre_emisor, monto FROM usuarios
	INNER JOIN transferencias ON usuarios.id = transferencias.emisor;
	
	
	
	