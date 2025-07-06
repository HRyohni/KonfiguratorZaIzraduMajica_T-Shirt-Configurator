Naravno, evo prijedloga za kvalitetan i detaljan `README.md` file, napisan na hrvatskom i formatiran za GitHub.

Samo trebate kreirati datoteku pod nazivom `README.md` u korijenu (root) vašeg projekta i kopirati ovaj sadržaj u nju.

-----

# 👕 Konfigurator za Izradu Majica

Potpuno responzivna web aplikacija koja korisnicima omogućuje jednostavnu izradu i narudžbu personaliziranih majica. Aplikacija je izgrađena kao SPA (Single Page Application) koristeći Vue.js 3 i Vuetify 3, s pametnim "backend-less" pristupom za obradu narudžbi.

[](https://www.google.com/search?q=) ---

## галерија

| Glavno sučelje | Pregled narudžbe i mobilni prikaz |
| :---: | :---: |
| *(Ovdje dodajte screenshot glavnog sučelja)* | *(Ovdje dodajte screenshot mobilnog prikaza)* |

-----

## ✨ Glavne Funkcionalnosti

  - **🎨 Dinamički odabir proizvoda i boja:** Korisnik može birati između različitih modela majica (npr. Malfini, Sol's, Kariban). Paleta boja se automatski ažurira i prikazuje samo dostupne boje za odabrani model provjerom dostupnosti slika.
  - **🖼️ Upload i pozicioniranje dizajna:** Mogućnost uploada vlastitih slika i postavljanja na različite lokacije na majici (prsa, leđa, srce, rukavi).
  - **👁️ Live Preview:** Interaktivni pregled majice u stvarnom vremenu. Prikaz se ažurira s odabranom bojom i pozicijom uploadanih slika, uz odvojene prikaze za prednju i zadnju stranu.
  - **🛒 Sustav košarice:** Korisnici mogu konfigurirati više različitih stavki (npr. različite boje ili dizajni) i dodati ih u jednu zajedničku narudžbu.
  - **📝 Unos podataka i R1 račun:** Standardna forma za unos podataka o kupcu, s opcionalnim poljima za unos podataka tvrtke za R1 račun.
  - **📱 Potpuno Responzivan Dizajn:** Sučelje je prilagođeno za korištenje na svim uređajima, od desktop računala do mobilnih telefona, uključujući i ljepljivi gumb za dodavanje u košaricu na dnu ekrana.
  - **⚙️ "Backend-less" Arhitektura:** Aplikacija ne zahtijeva tradicionalni backend server.
      - Slike dizajna se uploadaju na **ImgBB** servis putem njihovog API-ja.
      - Podaci o narudžbi, zajedno s linkovima na slike, šalju se direktno na email adresu administratora koristeći **EmailJS**.

-----

## 🛠️ Korištene Tehnologije

  - **Frontend:**
      - [Vue.js 3](https://vuejs.org/) (Composition API sa `<script setup>`)
      - [Vuetify 3](https://vuetifyjs.com/) (Material Design komponentni framework)
      - [Vue Router](https://router.vuejs.org/)
  - **Servisi (API):**
      - [EmailJS](https://www.emailjs.com/): Za slanje emailova s narudžbom direktno s klijentske strane.
      - [ImgBB](https://api.imgbb.com/): Za hosting uploadanih slika dizajna.
  - **Development:**
      - [Vite](https://vitejs.dev/): Kao build alat i dev server.
      - [Axios](https://axios-http.com/): Za slanje HTTP zahtjeva (provjera dostupnosti boja i upload na ImgBB).

-----

## 🚀 Pokretanje Projekta

Za pokretanje projekta lokalno na vašem računalu, slijedite ove korake:

### 1\. Klonirajte repozitorij

```bash
git clone https://github.com/vas-username/ime-repozitorija.git
cd ime-repozitorija
```

### 2\. Instalirajte ovisnosti (dependencies)

```bash
npm install
```

### 3\. Konfiguracija (.env)

Aplikacija zahtijeva API ključeve za EmailJS i ImgBB. Kreirajte `.env` datoteku u korijenu projekta kopiranjem `.env.example` datoteke (ako ste je kreirali) ili kreiranjem nove.

Unutar `.env` datoteke, unesite svoje ključeve:

```env
# .env

# Ključ za ImgBB API (dobijete na api.imgbb.com)
VITE_IMGBB_API_KEY='vas_imgbb_api_kljuc'

# Podaci za EmailJS (dobijete na emailjs.com)
VITE_EMAILJS_SERVICE_ID='vas_emailjs_service_id'
VITE_EMAILJS_TEMPLATE_ID='vas_emailjs_template_id'
VITE_EMAILJS_PUBLIC_KEY='vas_emailjs_public_key'
```

**Važno:** Ne zaboravite zamijeniti hardkodirane konstante u vašem `.vue` fileu s `import.meta.env.NAZIV_VARIJABLE` kako je prethodno objašnjeno.

### 4\. Pokrenite dev server

Nakon što ste spremili svoje ključeve i instalirali ovisnosti, pokrenite server.

```bash
npm run dev
```

Aplikacija će biti dostupna na `http://localhost:5173` (ili na portu koji Vite odabere).

-----

## 🏗️ Build za produkciju

Za kreiranje optimizirane verzije aplikacije spremne za postavljanje na hosting:

```bash
npm run build
```

Generirane datoteke će se nalaziti u `dist` direktoriju.

-----

## ✍️ Autor

**(Ovdje unesite svoje ime i kontakt, npr. GitHub profil ili email)**
