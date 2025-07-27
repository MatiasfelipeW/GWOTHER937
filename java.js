// Configuración inicial
const ADMIN_SECRET = "Gwother937";
let publishedEvents = JSON.parse(localStorage.getItem('publishedEvents')) || [];

// Función para renderizar eventos
function renderPublishedEvents() {
  const container = document.getElementById('published-events-list');
  
  if (!container) return; // Salir si no existe el contenedor
  
  if (publishedEvents.length === 0) {
    container.innerHTML = '<div class="alert alert-dark">No hay streams programados aún. Vuelve pronto.</div>';
    return;
  }
  
  // Ordenar eventos por fecha
  const sortedEvents = [...publishedEvents].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  container.innerHTML = sortedEvents.map(event => `
    <div class="event-card">
      <h4>${event.title}</h4>
      <div class="event-date">📅 ${formatEventDate(event.date)}</div>
      <p>No te pierdas este stream especial. ¡Agéndalo!</p>
      <button class="add-to-calendar" onclick="addToCalendar('${event.title}', '${event.date}')">
        🗓️ Agregar a mi calendario
      </button>
      <button class="btn btn-sm btn-outline-danger mt-2 admin-controls" 
              onclick="deleteEvent('${event.id}')" style="display: none;">
        Eliminar
      </button>
    </div>
  `).join('');
}

// Formatear fecha
function formatEventDate(dateString) {
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit',
    timeZoneName: 'short'
  };
  return new Date(dateString).toLocaleDateString('es-ES', options);
}

// Eliminar evento
function deleteEvent(eventId) {
  if (confirm('¿Estás seguro de eliminar este evento?')) {
    publishedEvents = publishedEvents.filter(e => e.id !== eventId);
    localStorage.setItem('publishedEvents', JSON.stringify(publishedEvents));
    renderPublishedEvents();
  }
}

// Añadir a Google Calendar
function addToCalendar(title, date) {
  const startDate = new Date(date).toISOString().replace(/-|:|\.\d+/g, '');
  const endDate = new Date(new Date(date).getTime() + 2 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d+/g, '');
  
  const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=Transmisión en vivo de ${encodeURIComponent(title)}&location=${encodeURIComponent(window.location.href)}`;
  
  window.open(url, '_blank');
}

// Función para cambiar el idioma
function changeLanguage(lang) {
  const translations = {
    es: {
      title: "Gwother937",
      description: "🔥 Atrévete a descubrir mi mundo exclusivo 🔥<br>Contenido premium, sensualidad sin límites y acceso directo a mí.",
      live_info: "En el botón de transmisión en vivo encontrarás acceso directo a la página en la que estaré en vivo. Únete a mi canal privado de Telegram y sigue mis streams.",
      onlyfans: "OnlyFans",
      telegram: "Telegram",
      instagram: "Instagram",
      whatsapp: "WhatsApp",
      tiktok: "TikTok",
      flirt4free: "Flirt4Free",
      copyright: "© 2025 Gwother937. Todos los derechos reservados.",
      live: "Transmisión en Vivo"
    },
    en: {
      title: "Gwother937",
      description: "🔥 Dare to discover my exclusive world 🔥<br>Premium content, limitless sensuality and direct access to me.",
      live_info: "In the live streaming button you'll find direct access to the page where I'll be live. Join my private Telegram channel and follow my streams.",
      onlyfans: "OnlyFans",
      telegram: "Telegram",
      instagram: "Instagram",
      whatsapp: "WhatsApp",
      tiktok: "TikTok",
      flirt4free: "Flirt4Free",
      copyright: "© 2025 Gwother937. All rights reserved.",
      live: "Live Streaming"
    },
    de: {
      title: "Gwother937",
      description: "🔥 Wage es, meine exklusive Welt zu entdecken 🔥<br>Premium-Inhalte, grenzenlose Sinnlichkeit und direkter Zugang zu mir.",
      live_info: "Im Live-Streaming-Button findest du direkten Zugang zu der Seite, auf der ich live sein werde. Trete meinem privaten Telegram-Kanal bei und verfolge meine Streams.",
      onlyfans: "OnlyFans",
      telegram: "Telegram",
      instagram: "Instagram",
      whatsapp: "WhatsApp",
      tiktok: "TikTok",
      flirt4free: "Flirt4Free",
      copyright: "© 2025 Gwother937. Alle Rechte vorbehalten.",
      live: "Live-Streaming"
    },
    ru: {
      title: "Gwother937",
      description: "🔥 Осмельтесь открыть для себя мой эксклюзивный мир 🔥<br>Премиум-контент, безграничная чувственность и прямой доступ ко мне.",
      live_info: "В кнопке прямой трансляции вы найдете прямой доступ к странице, где я буду в эфире. Присоединяйтесь к моему приватному Telegram-каналу и следите за моими трансляциями.",
      onlyfans: "OnlyFans",
      telegram: "Telegram",
      instagram: "Instagram",
      whatsapp: "WhatsApp",
      tiktok: "TikTok",
      flirt4free: "Flirt4Free",
      copyright: "© 2025 Gwother937. Все права защищены.",
      live: "Прямой эфир"
    },
    zh: {
      title: "Gwother937",
      description: "🔥 敢于探索我的专属世界 🔥<br>优质内容，无限性感，直接与我互动。",
      live_info: "在直播按钮中，您将找到我将直播的页面的直接访问链接。加入我的私人Telegram频道并关注我的直播。",
      onlyfans: "OnlyFans",
      telegram: "Telegram",
      instagram: "Instagram",
      whatsapp: "WhatsApp",
      tiktok: "TikTok",
      flirt4free: "Flirt4Free",
      copyright: "© 2025 Gwother937。保留所有权利。",
      live: "直播"
    }
  };

  document.querySelector('html').lang = lang;
  document.querySelector('#languageDropdown').textContent = 
    lang === 'es' ? 'Español' : 
    lang === 'en' ? 'English' : 
    lang === 'de' ? 'Deutsch' : 
    lang === 'ru' ? 'Русский' : '中文';
  
  // Actualizar todos los elementos con data-translate
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[lang] && translations[lang][key]) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.value = translations[lang][key];
      } else {
        element.innerHTML = translations[lang][key];
      }
    }
  });
  
  // Actualizar texto del botón de live
  const liveButton = document.getElementById('liveButton');
  if (translations[lang] && translations[lang]['live']) {
    liveButton.querySelector('.d-none.d-md-inline').textContent = translations[lang]['live'];
  }
  
  // Guardar preferencia de idioma
  localStorage.setItem('preferredLanguage', lang);
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  console.log("Página de Gwother937 cargada correctamente.");

  // Cargar idioma preferido
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'es';
  changeLanguage(preferredLanguage);
  
  // Event listeners para los items del dropdown de idioma
  document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const lang = this.getAttribute('data-lang');
      changeLanguage(lang);
    });
  });

  // Cargar eventos al iniciar
  renderPublishedEvents();
  
  // Configurar botón de publicar
  const publishBtn = document.getElementById('publish-event');
  if (publishBtn) {
    publishBtn.addEventListener('click', () => {
      const title = document.getElementById('admin-event-title').value;
      const date = document.getElementById('admin-event-date').value;
      
      if (!title || !date) {
        alert('Por favor completa todos los campos');
        return;
      }
      
      // Validar que la fecha sea futura
      if (new Date(date) < new Date()) {
        alert('La fecha debe ser futura');
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
      renderPublishedEvents();
      
      // Limpiar formulario
      document.getElementById('admin-event-title').value = '';
      document.getElementById('admin-event-date').value = '';
      
      alert('¡Stream publicado exitosamente!');
    });
  }
  
  // Configurar botón de admin
  const adminBtn = document.getElementById('admin-toggle-btn');
  if (adminBtn) {
    adminBtn.addEventListener('click', () => {
      const password = prompt('Ingresa la clave de administrador:');
      if (password === ADMIN_SECRET) {
        document.body.classList.toggle('show-admin');
        alert('Modo admin ' + (document.body.classList.contains('show-admin') ? 'activado' : 'desactivado'));
        renderPublishedEvents(); // Re-render para mostrar/ocultar botones de admin
      } else if (password) {
        alert('Clave incorrecta');
      }
    });
  }
  
  // Verificar parámetro de admin en URL
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('admin') === ADMIN_SECRET) {
    document.body.classList.add('show-admin');
    renderPublishedEvents();
  }
});
