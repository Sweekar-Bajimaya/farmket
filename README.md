# 🌾 Farmket

Farmket is a full-stack E-commerce platform for buying and selling fresh fruits and vegetables online.  
It connects farmers, vendors, and customers through a seamless digital marketplace.

---

## 🚀 Tech Stack

### Backend
- Django
- Django Rest Framework (DRF)
- PostgreSQL

### Frontend
- Next.js
- React.js

---

## 📌 Features

- 🛒 E-commerce product listing
- 👨‍🌾 Vendor product management
- 🥕 Fruits & vegetables categories
- 🔐 Authentication & authorization
- 📦 Order management
- 🔎 Product search & filtering
- 📡 RESTful API integration

---

## 🏗 Architecture

```
Next.js (Frontend)
        ↓
Django + DRF (Backend API)
        ↓
PostgreSQL (Database)
```

---

# ⚙ Installation Guide

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/farmket.git
cd farmket
```

---

# 🖥 Backend Setup (Django + DRF)

## Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

## Install Dependencies

```bash
pip install -r requirements.txt
```

## Configure Database (PostgreSQL)

Update your `settings.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'farmket_db',
        'USER': 'your_db_user',
        'PASSWORD': 'your_db_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

## Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

## Create Superuser

```bash
python manage.py createsuperuser
```

## Start Backend Server

```bash
python manage.py runserver
```

Backend runs at:
```
http://127.0.0.1:8000/
```

---

# 🌐 Frontend Setup (Next.js)

## Navigate to Frontend Folder

```bash
cd frontend
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variable

Create `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

## Run Development Server

```bash
npm run dev
```

Frontend runs at:
```
http://localhost:3000/
```

---

# 📡 Example API Endpoints

```
GET    /api/products/
POST   /api/products/
GET    /api/products/{id}/
PUT    /api/products/{id}/
DELETE /api/products/{id}/
```

---

# 📦 Example Product JSON

```json
{
  "id": 1,
  "name": "Fresh Apples",
  "category": "Fruit",
  "price": 120,
  "stock": 50,
  "description": "Fresh organic apples from local farms"
}
```

---

# 🛠 Troubleshooting

### PostgreSQL Issues
- Ensure PostgreSQL service is running
- Verify credentials in `settings.py`

### CORS Issues
Install:

```bash
pip install django-cors-headers
```

Add to `settings.py`:

```python
INSTALLED_APPS = [
    ...
    "corsheaders",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    ...
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]
```

---

# 👥 Contributors

- Myself

---

# 📄 License

This project is licensed under the MIT License.
