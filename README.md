# 🔢 Contador de Daniel

Aplicación React con Tailwind CSS para llevar conteos de observaciones de forma rápida y precisa.

---

## 📋 Instrucciones para correr el proyecto

### 1. Prerrequisitos
- [Node.js](https://nodejs.org/) v16 o superior
- npm (incluido con Node.js)

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar la aplicación

```bash
npm start
```

Se abre en: **http://localhost:3000**

---

## 🗂️ Estructura del proyecto

```
counter-app/
├── public/
│   └── index.html          # HTML base con Google Fonts
├── src/
│   ├── App.jsx             ← Componente principal
│   ├── index.js            # Punto de entrada de React
│   └── index.css           # Tailwind + animaciones
├── tailwind.config.js
├── package.json
└── README.md
```

---

## ✅ Funcionalidades implementadas

- [x] Contador en tiempo real con display tipo terminal
- [x] Botón de incremento (+1)
- [x] Botón de decremento (-1)
- [x] Botón de reinicio (reset a 0)
- [x] Validaciones: límite mínimo (-999) y máximo (999)
- [x] Validación: no reiniciar si ya está en cero
- [x] Mensajes de error descriptivos
- [x] Historial de las últimas 5 acciones con hora
- [x] Color dinámico: verde (+), rojo (-), amarillo (0)
- [x] Animaciones: pop al cambiar, efecto flicker, barra de progreso
- [x] Diseño retro-terminal con Tailwind CSS

---

## 🎨 Tecnologías usadas

| Tecnología | Versión |
|---|---|
| React | 18 |
| Tailwind CSS | 3 |
| Google Fonts | Bebas Neue + Share Tech Mono + DM Sans |
