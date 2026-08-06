FROM nginx:alpine

# Elimina archivos por defecto
RUN rm -rf /usr/share/nginx/html/*

# Copia los archivos del sitio
COPY . /usr/share/nginx/html/

# Opcional: Asegura permisos de lectura para Nginx
RUN chmod -R 755 /usr/share/nginx/html