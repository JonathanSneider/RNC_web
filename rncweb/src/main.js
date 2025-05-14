import './components/app-navbar.js';
import './components/app-footer.js';
import './components/main-content.js';
import './components/quienes-somos-section.js';
import './components/ideologia-section.js';
import './components/tienda-section.js';
import './components/articulos-section.js';
import './components/donaciones-section.js';
import './components/producto-detalle.js';
import './components/articulo-detalle.js';
import './index.css';

document.addEventListener('DOMContentLoaded', () => {
  manejarRuta();
});

function mostrarDetalleProducto(id) {
  window.history.pushState({}, '', `?producto=${id}`);
  const pagina = document.getElementById('pagina-principal');
  const detalleProducto = document.getElementById('detalle-producto');

  pagina.style.display = 'none';
  detalleProducto.style.display = 'block';

  const comp = detalleProducto.querySelector('producto-detalle');
  comp.setAttribute('data-id', id);
}

function mostrarDetalleArticulo(id) {
  window.history.pushState({}, '', `?articulo=${id}`);
  const pagina = document.getElementById('pagina-principal');
  const detalleArticulo = document.getElementById('detalle-articulo');

  pagina.style.display = 'none';
  detalleArticulo.style.display = 'block';

  const comp = detalleArticulo.querySelector('articulo-detalle');
  comp.setAttribute('data-id', id);
}

function manejarRuta() {
  const params = new URLSearchParams(window.location.search);
  const productoId = params.get('producto');
  const articuloId = params.get('articulo');

  if (productoId) {
    mostrarDetalleProducto(productoId);
  } else if (articuloId) {
    mostrarDetalleArticulo(articuloId);
  } else {
    document.getElementById('pagina-principal').style.display = 'block';
    document.getElementById('detalle-producto').style.display = 'none';
    document.getElementById('detalle-articulo').style.display = 'none';
  }
}

window.addEventListener('popstate', manejarRuta);

// Exponer funciones globalmente
window.mostrarDetalleProducto = mostrarDetalleProducto;
window.mostrarDetalleArticulo = mostrarDetalleArticulo;
