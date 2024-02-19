# Tugas1-Kriptografi

### Deskripsi singkat program

Program menggunakan React + Vite + Typescript untuk frontend dan Flask untuk backend yang dibuat untuk mengimplementasikan kriptografi pada mata kuliah IF4020 Kriptografi. Pengguna akan memberikan input berupa file atau pesan yang diketik, metode, dan key yang digunakan, lalu program akan mengeluarkan hasil enkripsi atau dekripsi pada layar.

## Requirement program dan instalasi

Pengunduhan Python dapat dilakukan melalui situs berikut.

https://www.python.org/downloads/

Pengunduhan Ruby dapat dilakukan melalui situs berikut. (Opsional)

https://rubyinstaller.org/downloads/

## Cara menggunakan program

### Frontend

```
> cd frontend
> cp .env.example .env
> npm install
> npm run dev
```
Notes: Isi key VITE_API_URL pada .env untuk terhubung ke backend

### Backend Flask

```
> cd backend
> pip install -r requirements.txt
> python3 app.py
```

### Backend Rails (Opsional)

```
> cd backend_rails
> bundle install
> rails s
```

## Author
Willy Wilsen - 13520160