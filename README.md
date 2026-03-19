# Finansai

## phpMyAdmin

Paleidžiamas per docker compose ant port `8080`
Username: `root`
Password `hunter2`

### 1. Backend

1. Atidaryti terminala server kataloge.
2. Paleisti komanda: npm install
3. Paleisti komanda: npm run dev

Backend - http://localhost:3000
trans http://localhost:3000/api/transactions

### 2. Frontend

1. Atidaryti terminala public kataloge.
2. Paleisti komanda: npm install
3. Paleisti komanda: npm run dev

Frontend - http://localhost:5173



DB paleidimui naudoti: docker compose up

DB duomenu uzpildymui: npx prisma db seed