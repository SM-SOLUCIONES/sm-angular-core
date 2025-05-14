const fs = require('fs');
const path = require('path');
// const execSync = require('child_process').execSync; // Ya no necesitamos esto

const archivo = 'package.json';
const versionFilePath = path.join(__dirname, archivo);

// Verificar si el archivo package.json existe
if (!fs.existsSync(versionFilePath)) {
    console.error('El archivo package.json no se encuentra en la ruta:', versionFilePath);
    process.exit(1);
}

// Cargar el contenido actual de package.json
let packageData;
try {
    packageData = JSON.parse(fs.readFileSync(versionFilePath, 'utf8'));
    // console.log('Contenido actual de package.json:', packageData); // Verificación
} catch (error) {
    console.error('Error al leer el archivo package.json:', error);
    process.exit(1);
}

// Obtener la versión actual y separarla
const currentVersion = packageData.version;
const versionParts = currentVersion.split('.');

if (versionParts.length !== 3) {
    console.error('Formato de versión inválido:', currentVersion);
    process.exit(1);
}

// Incrementar la versión menor (patch)
versionParts[2] = parseInt(versionParts[2]) + 1;
const newVersion = versionParts.join('.');

// Actualizar la propiedad "version"
packageData.version = newVersion;

// Escribir el nuevo contenido en el archivo package.json
try {
    fs.writeFileSync(versionFilePath, JSON.stringify(packageData, null, 2));
    console.log('Archivo package.json actualizado a la versión:', newVersion);
} catch (error) {
    console.error('Error al escribir el archivo package.json:', error);
    process.exit(1); // Salir si hay error al escribir el archivo
}