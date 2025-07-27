// Puedes agregar funcionalidades aquí si las necesitas
console.log("Página de Gwother937 cargada correctamente.");


document.addEventListener('DOMContentLoaded', () => {
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'es';
  changeLanguage(preferredLanguage);
  
  renderPublishedEvents();

  // Detectar modo admin por URL
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('admin') === ADMIN_SECRET) {
    document.body.classList.add('show-admin');
  }

  // Evento para publicar
  document.getElementById('publish-event').addEventListener('click', () => {
    const title = document.getElementById('admin-event-title').value;
    const date = document.getElementById('admin-event-date').value;

    if (!title || !date) {
      alert('Por favor completa todos los campos');
      return;
    }

    const newEvent = {
      id: Date.now().toString(),
      title,
      date,
      publishedAt: new Date().toISOString()
    };

    publishedEvents.push(newEvent);
    localStorage.setItem('publishedEvents', JSON.stringify(publishedEvents));
    renderPublishedEvents(); // <-- asegura mostrarlo

    document.getElementById('admin-event-title').value = '';
    document.getElementById('admin-event-date').value = '';

    alert('¡Stream publicado exitosamente!');
  });
});
