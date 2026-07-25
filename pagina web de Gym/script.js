document.addEventListener('DOMContentLoaded', () => {
    /* =========================================================
       1. LÓGICA DEL MODO CLARO / OSCURO (TU CÓDIGO ORIGINAL)
    ========================================================= */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const moonIcon = document.querySelector('.icon-moon');
    const sunIcon = document.querySelector('.icon-sun');

    // Verificar si hay un tema guardado previamente en localStorage
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        if (moonIcon && sunIcon) {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'inline';
        }
    } else {
        // Por defecto o si está guardado como 'dark', se mantiene en modo oscuro
        document.body.classList.remove('light-mode');
        if (moonIcon && sunIcon) {
            moonIcon.style.display = 'inline';
            sunIcon.style.display = 'none';
        }
    }

    // Escuchar el evento de clic en el botón de cambio de tema
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            // Alternar la clase 'light-mode' en la etiqueta <body>
            document.body.classList.toggle('light-mode');

            const isLightMode = document.body.classList.contains('light-mode');

            // Cambiar los íconos (Sol <-> Luna) y actualizar localStorage
            if (isLightMode) {
                if (moonIcon && sunIcon) {
                    moonIcon.style.display = 'none';
                    sunIcon.style.display = 'inline';
                }
                localStorage.setItem('theme', 'light');
            } else {
                if (moonIcon && sunIcon) {
                    moonIcon.style.display = 'inline';
                    sunIcon.style.display = 'none';
                }
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    /* =========================================================
       2. LÓGICA DE LA VENTANA EMERGENTE (MODAL PANTALLA COMPLETA)
    ========================================================= */
    const modal = document.getElementById('modal-inscripcion');
    const openBtns = document.querySelectorAll('.open-modal-btn');
    const closeBtn = document.getElementById('close-modal');

    // Abrir el modal en pantalla completa al presionar el botón "Comienza Hoy"
    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Evita el desplazamiento del fondo
            }
        });
    });

    // Cerrar el modal mediante el botón con la "X"
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restaura el desplazamiento
        });
    }

    // Cerrar el modal al hacer clic en el fondo oscuro fuera del contenedor principal
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
});

/* =========================================================
       3. ENVÍO DEL FORMULARIO A WHATSAPP
    ========================================================= */
    const formInscripcion = document.getElementById('form-inscripcion');

    if (formInscripcion) {
        formInscripcion.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la página se recargue

            // 1. Obtener valores introducidos por el usuario
            const nombre = document.getElementById('nombre').value.trim();
            const correo = document.getElementById('correo').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const edad = document.getElementById('edad').value.trim();
            const plan = document.getElementById('plan').value;
            const objetivo = document.getElementById('objetivo').value.trim();

            // 2. Definir número de teléfono (formato internacional sin espacios ni guiones)
            const numeroWhatsApp = "18498029673";

            // 3. Crear el mensaje formateado
            let mensaje = `🏋️‍♂️ *NUEVA INSCRIPCIÓN - DARK GYM* 🏋️‍♂️\n\n`;
            mensaje += `👤 *Nombre:* ${nombre}\n`;
            mensaje += `📧 *Correo:* ${correo}\n`;
            mensaje += `📞 *Teléfono:* ${telefono}\n`;
            mensaje += `🎂 *Edad:* ${edad} años\n`;
            mensaje += `💳 *Plan seleccionado:* ${plan}\n`;
            if (objetivo) {
                mensaje += `🎯 *Objetivo:* ${objetivo}\n`;
            }

            // 4. Codificar el texto para que sea compatible con URLs
            const mensajeCodificado = encodeURIComponent(mensaje);

            // 5. Construir enlace de WhatsApp y redirigir en una nueva pestaña
            const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;
            window.open(urlWhatsApp, '_blank');

            // 6. Limpiar el formulario y cerrar la ventana modal
            formInscripcion.reset();
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
