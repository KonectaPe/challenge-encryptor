const textoUsuario = document.getElementById("texto-usuario");
const mensajeEncriptado = document.getElementById("texto-encriptado");

const llavesDeEncriptacion = [
  ["e", "enter"],
  ["i", "imes"],
  ["a", "ai"],
  ["o", "ober"],
  ["u", "ufat"],
];

function validarTextoUsuario(textoUsuario) {
  // /^(?=[a-z])[a-z\s]+$/
  // /^[a-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/
  return /^(?=[a-z!@#$%^&*()_+\-=\[\]{}])[a-z!@#$%^&*()_+\-=\[\]{}\s]+$/.test(
    textoUsuario.value.trim()
  )
    ? true
    : false || textoUsuario.focus();
}

function encriptar(textoUsuario) {
  for (let i = 0; i < llavesDeEncriptacion.length; i++) {
    if (textoUsuario.includes(llavesDeEncriptacion[i][0])) {
      textoUsuario = textoUsuario.replaceAll(
        llavesDeEncriptacion[i][0],
        llavesDeEncriptacion[i][1]
      );
    }
  }
  return textoUsuario;
}

function desencriptar(textoUsuario) {
  let llavesEncontradas = [];
  let caracteresRemplazar = [];
  for (let i = 0; i < llavesDeEncriptacion.length; i++) {
    if (textoUsuario.includes(llavesDeEncriptacion[i][1])) {
      // llavesEncontradas.push(llavesDeEncriptacion[i][1]);
      caracteresRemplazar.push(llavesDeEncriptacion[i][0]);
      llavesEncontradas.push(llavesDeEncriptacion[i][1]);
    }
  }

  let contador = 0;

  for (const llaves of llavesEncontradas) {
    textoUsuario = textoUsuario.replaceAll(
      llaves,
      caracteresRemplazar[contador]
    );
    contador++;
  }

  // console.log(llavesEncontradas);
  // console.log(caracteresRemplazar);
  return textoUsuario;
}

function textoTextarea(texto) {
  mensajeEncriptado.value = texto;
  textoUsuario.value = "";
}

function cambiarEstilosElementos(attribute, display) {
  document.getElementById(attribute).style.display = display;
}

function btnEncriptar() {
  if (validarTextoUsuario(textoUsuario)) {
    cambiarEstilosElementos("seccion-muñeco", "none");
    cambiarEstilosElementos("seccion-copiar", "block");
    const textoEncriptado = encriptar(textoUsuario.value);
    textoTextarea(textoEncriptado);
  } else {
    cambiarEstilosElementos("seccion-muñeco", "block");
    cambiarEstilosElementos("seccion-copiar", "none");
    alert("Ingrese solo letras minúsculas y sin acentos.");
  }
}

function btnDesencriptar() {
  if (validarTextoUsuario(textoUsuario)) {
    cambiarEstilosElementos("seccion-muñeco", "none");
    cambiarEstilosElementos("seccion-copiar", "block");
    const textoDesencriptado = desencriptar(textoUsuario.value);
    textoTextarea(textoDesencriptado);
  } else {
    cambiarEstilosElementos("seccion-muñeco", "block");
    cambiarEstilosElementos("seccion-copiar", "none");
    alert("Ingrese solo letras minúsculas y sin acentos.");
  }
}

async function copiarTexto() {
  try {
    await navigator.clipboard.writeText(mensajeEncriptado.value);
    alert("El texto se ha copiado correctamente");
    textoUsuario.focus();
  } catch (error) {
    console.error(`Ha ocurrido un error al copiar al portapapeles: ${error}`);
  }
}
