<template>
  <v-container class="fill-height pb-15 pt-15">
    <v-row class="fill-height" align="start" justify="center" >
      <v-col cols="12" md="6" class="pa-4">
        <v-card class="pa-4 custom-card">
          <v-card-title class="d-flex justify-center text-h5 mb-4">Izradi Majicu</v-card-title>
          <v-form @submit.prevent="addItemToCart">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field v-model="formData.firstName" label="Ime" variant="outlined" required class="mb-2"></v-text-field>
                <v-text-field v-model="formData.lastName" label="Prezime" variant="outlined" required class="mb-2"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="formData.phone" label="Broj telefona" variant="outlined" type="tel" required class="mb-2"></v-text-field>
                <v-text-field v-model="formData.email" label="Email" variant="outlined" type="email" required class="mb-4"></v-text-field>
              </v-col>
            </v-row>
            <v-switch v-model="formData.isBusiness" label="Plaćanje preko firme (R1 račun)?" color="primary" class="mb-0"></v-switch>
            <div v-if="formData.isBusiness" class="mb-4">
              <div class="text-subtitle-1 mb-2">Podaci o firmi:</div>
              <v-card variant="outlined" class="pa-4">
                <v-text-field v-model="formData.businessDetails.name" label="Ime firme" variant="outlined" required class="mb-2"></v-text-field>
                <v-text-field v-model="formData.businessDetails.oib" label="OIB firme" variant="outlined" required class="mb-2"></v-text-field>
                <v-text-field v-model="formData.businessDetails.address" label="Adresa firme" variant="outlined" required class="mb-2"></v-text-field>
              </v-card>
            </div>
            <v-textarea
              v-model="formData.note"
              label="Napomena za stavku (opcionalno)"
              placeholder="Posebne želje za ovu stavku..."
              variant="outlined"
              rows="3"
              auto-grow
              class="mb-4"
            ></v-textarea>
            <v-divider class="my-4"></v-divider>

            <h3 class="text-h6 mb-3">Konfiguriraj stavku:</h3>
            <v-select
              v-model="formData.productType"
              :items="productOptions"
              label="Vrsta proizvoda"
              item-title="text"
              item-value="value"
              variant="outlined"
              required
              class="mb-4"
            />
            <div class="text-subtitle-1 mb-2">Boja majice:</div>
            <v-row no-gutters class="color-palette mb-4">
              <v-col v-for="color in filteredColors" :key="color.imageName" cols="auto" class="pa-1">
                <v-hover v-slot="{ isHovering, props }">
                  <v-card v-bind="props" :color="color.hex" class="color-swatch" @click="formData.tshirtColor = color.imageName" :style="{ borderColor: formData.tshirtColor === color.imageName ? '#673AB7' : 'transparent' }">
                    <v-tooltip activator="parent" location="bottom">{{ color.name }}</v-tooltip>
                    <v-icon v-if="formData.tshirtColor === color.imageName" class="selected-icon">mdi-check-circle</v-icon>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>

            <div class="text-subtitle-1 mb-2">Dodaj slike na dizajn:</div>
            <v-card variant="outlined" class="pa-3 mb-4">
              <v-row align="center">
                <v-col cols="12" sm="6">
                  <v-select v-model="newImage.location" :items="imageLocationOptions" item-title="name" item-value="value" label="Prvo odaberi lokaciju" variant="outlined" density="compact" hide-details></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-btn block variant="outlined" @click="triggerImageUpload" :disabled="!newImage.location"><v-icon left>mdi-upload</v-icon> Zatim odaberi sliku</v-btn>
                  <input type="file" ref="imageInput" style="display: none;" accept="image/*" @change="handleImageSelection">
                </v-col>
              </v-row>
            </v-card>

            <div v-if="formData.images.length > 0">
              <div class="text-subtitle-1 mb-2">Dodane slike:</div>
              <v-list lines="one" class="mb-4">
                <v-list-item v-for="image in formData.images" :key="image.id" :title="image.name" :subtitle="`Lokacija: ${getImageLocationName(image.location)}`" variant="outlined" class="mb-2">
                  <template v-slot:prepend><v-avatar :image="image.url" rounded="0"></v-avatar></template>
                  <template v-slot:append><v-btn icon="mdi-close" variant="text" @click="removeImage(image.id)"></v-btn></template>
                </v-list-item>
              </v-list>
            </div>

            <div class="text-h6 mb-2">Veličine majica:</div>
            <v-row>
              <v-col cols="12" md="6">
                <div class="text-subtitle-1 mb-2">Muške majice:</div>
                <v-row no-gutters class="mb-4">
                  <v-col cols="4" v-for="(_, size) in formData.sizes.male" :key="size" class="d-flex align-center pa-1">
                    <v-text-field :label="size" v-model.number="formData.sizes.male[size]" type="number" min="0" density="compact" variant="outlined" hide-details></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="6">
                <div class="text-subtitle-1 mb-2">Ženske majice:</div>
                <v-row no-gutters class="mb-6">
                  <v-col cols="4" v-for="(_, size) in formData.sizes.female" :key="size" class="d-flex align-center pa-1">
                    <v-text-field :label="size" v-model.number="formData.sizes.female[size]" type="number" min="0" density="compact" variant="outlined" hide-details></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-btn class="pa-30 d-none d-md-block" type="submit" color="primary" size="large" block>
              <v-icon left>mdi-cart-plus</v-icon>
              Dodaj u narudžbu
            </v-btn>
            <div class="d-md-none" style="height: 100px;"></div>
          </v-form>

          <div v-if="cart.length > 0" class="mt-10">
            <v-divider></v-divider>
            <h2 class="text-h5 my-4">Pregled narudžbe</h2>
            <v-list lines="three">
              <v-list-item v-for="(item, index) in cart" :key="item.id" class="mb-2" variant="outlined">
                <v-list-item-title class="text-h6">Stavka {{ index + 1 }}: {{ productTypeText(item.productType) }}</v-list-item-title>
                <v-list-item-subtitle>Boja: {{ getSavedColorName(item.tshirtColor) }} | Ukupno komada: {{ calculateTotalQuantity(item.sizes) }}</v-list-item-subtitle>
                <div class="d-flex my-2">
                  <v-avatar v-for="img in item.images" :key="img.id" :image="img.url" rounded="0" class="mr-2"></v-avatar>
                </div>
                <template v-slot:append>
                  <v-btn color="red" icon="mdi-delete-outline" variant="text" @click="removeItemFromCart(item.id)"></v-btn>
                </template>
              </v-list-item>
            </v-list>
            <v-btn class="mt-6" @click="sendOrder" color="success" size="large" block :loading="isLoading" :disabled="isLoading">
              <v-icon left>mdi-send</v-icon>
              Pošalji cijelu narudžbu
            </v-btn>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" class="pa-4 d-flex align-center justify-center">
        <v-card class="" width="100%" elevation="1">
          <div class="tshirt-previews-wrapper">
            <div class="single-tshirt-preview">
              <v-img :src="previewFrontUrl" alt="Majica Prednja" class="tshirt-base-image" height="auto" width="100%" contain @error="onImageError"></v-img>
              <img v-for="image in frontImages" :key="image.id" :src="image.url" :alt="`Preview ${image.location}`" :class="`overlay-image overlay-image-${image.location}`">
            </div>
            <div class="single-tshirt-preview">
              <v-img :src="previewBackUrl" alt="Majica Zadnja" class="tshirt-base-image" height="auto" width="100%" contain @error="onImageError"></v-img>
              <img v-for="image in backImages" :key="image.id" :src="image.url" :alt="`Preview ${image.location}`" :class="`overlay-image overlay-image-${image.location}`">
            </div>
          </div>
          <div class="justify-center d-flex">
            <div class="justify-center align-center">
              <div class="d-flex justify-center align-center"><h3>Ova slika je samo prikaz</h3></div>
              <div class="d-flex justify-center align-center"><h5>u stvarnosti je drugačije</h5></div>
            </div>
          </div>
          <v-card-text class="mt-4">
            <div class="text-h6">Trenutni odabir:</div>
            <hr>
            <div>
              <p>Boja: {{ selectedColorName }}</p>
              <p v-if="formData.images.length > 0">Broj slika: {{ formData.images.length }}</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="4000" location="top">
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="snackbar.show = false">
          Zatvori
        </v-btn>
      </template>
    </v-snackbar>

    <div class="sticky-footer-mobile d-md-none">
      <v-btn @click="addItemToCart" color="primary" size="large" block>
        <v-icon left>mdi-cart-plus</v-icon>
        Dodaj u narudžbu
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import emailjs from '@emailjs/browser';

// --- CONSTANTS ---



// U TshirtConfigurator.vue zamijenite konstante s ovim:
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;
// --- REACTIVE STATE ---
const router = useRouter();
const imageInput = ref(null);
const isLoading = ref(false);
const cart = reactive([]);

const snackbar = reactive({
  show: false,
  text: '',
  color: 'error',
});

const formData = reactive({
  firstName: '', lastName: '', phone: '', email: '',
  isBusiness: false,
  businessDetails: { name: '', oib: '', address: '' },
  // Item specific data
  note: '',
  productType: '129',
  tshirtColor: '00',
  images: [],
  sizes: {
    male: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0, '3XL': 0 },
    female: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0, '3XL': 0 },
  },
});

const newImage = reactive({
  file: null,
  url: null,
  location: 'prsa'
});

// --- STATIC DATA ---
const productOptions = [
  { text: 'Basic (Malfini)', value: '129', brand: 'malfini' },
  { text: 'Heavy (Malfini)', value: '137', brand: 'malfini' },
  { text: 'Focus Polo (Malfini)', value: '232', brand: 'malfini' },
  { text: 'Polo (Kariban)', value: 'K254', brand: 'kariban' },
  { text: 'Imperial (Sol\'s)', value: '11500', brand: 'sols' },
];

const availableColors = reactive([
  // Malfini Boje
  { name: 'WHITE', hex: '#FFFFFF', imageName: '00', solsCode: null, available: false },
  { name: 'BLACK', hex: '#010101', imageName: '01', solsCode: null, available: false },
  { name: 'NAVY BLUE', hex: '#020230', imageName: '02', solsCode: null, available: false },
  { name: 'ROYAL BLUE', hex: '#0505FF', imageName: '05', solsCode: null, available: false },
  { name: 'RED', hex: '#FF0000', imageName: '07', solsCode: null, available: false },
  { name: 'STEEL GRAY', hex: '#9E9E9E', imageName: '12', solsCode: null, available: false },
  { name: 'EBONY GRAY', hex: '#424242', imageName: '94', solsCode: null, available: false },
  { name: 'CASTOR GRAY', hex: '#676767', imageName: '67', solsCode: null, available: false },
  { name: 'LIGHT ANTHRACITE', hex: '#616161', imageName: '36', solsCode: null, available: false },
  { name: 'LIGHT GRAY', hex: '#E0E0E0', imageName: '03', solsCode: null, available: false },
  { name: 'ICE GRAY', hex: '#B0BEC5', imageName: '51', solsCode: null, available: false },
  { name: 'ALMOND', hex: '#F0E6D2', imageName: '08', solsCode: null, available: false },
  { name: 'CHOCOLATE', hex: '#D2691E', imageName: '38', solsCode: null, available: false },
  { name: 'COFFEE', hex: '#6F4E37', imageName: '27', solsCode: null, available: false },
  { name: 'BURGUNDY', hex: '#880E4F', imageName: '86', solsCode: null, available: false },
  { name: 'MARLBORO RED', hex: '#C62828', imageName: '23', solsCode: null, available: false },
  { name: 'GARNET', hex: '#880E4F', imageName: '13', solsCode: null, available: false },
  { name: 'ORANGE', hex: '#FF9800', imageName: '11', solsCode: null, available: false },
  { name: 'TANGERINE ORANGE', hex: '#F48C06', imageName: 'A2', solsCode: null, available: false },
  { name: 'CORAL', hex: '#FF7F50', imageName: 'A1', solsCode: null, available: false },
  { name: 'PINK', hex: '#FFC0CB', imageName: '30', solsCode: null, available: false },
  { name: 'RHODODENDRON', hex: '#AD1457', imageName: '49', solsCode: null, available: false },
  { name: 'PURPLE', hex: '#9C27B0', imageName: '43', solsCode: null, available: false },
  { name: 'LAVENDER', hex: '#E6E6FA', imageName: '64', solsCode: null, available: false },
  { name: 'LIGHT BLUE', hex: '#ADD8E6', imageName: '15', solsCode: null, available: false },
  { name: 'SKY BLUE', hex: '#87CEEB', imageName: '14', solsCode: null, available: false },
  { name: 'AZURE BLUE', hex: '#007FFF', imageName: '70', solsCode: null, available: false },
  { name: 'MIDNIGHT BLUE', hex: '#191970', imageName: '87', solsCode: null, available: false },
  { name: 'DENIM', hex: '#1560BD', imageName: '60', solsCode: null, available: false },
  { name: 'PETROL BLUE', hex: '#005F6B', imageName: '93', solsCode: null, available: false },
  { name: 'BLUE ATOLL', hex: '#00CED1', imageName: '44', solsCode: null, available: false },
  { name: 'TURQUOISE', hex: '#40E0D0', imageName: '19', solsCode: null, available: false },
  { name: 'EMERALD', hex: '#50C878', imageName: '95', solsCode: null, available: false },
  { name: 'MINT', hex: '#3EB489', imageName: 'A7', solsCode: null, available: false },
  { name: 'ARMY', hex: '#4B5320', imageName: '39', solsCode: null, available: false },
  { name: 'KELLY GREEN', hex: '#4CBB17', imageName: '16', solsCode: null, available: false },
  { name: 'GRASS GREEN', hex: '#7CFC00', imageName: '92', solsCode: null, available: false },
  { name: 'APPLE GREEN', hex: '#8BC34A', imageName: '62', solsCode: null, available: false },
  { name: 'BOTTLE GREEN', hex: '#006A4E', imageName: '06', solsCode: null, available: false },
  { name: 'MILITARY', hex: '#6B8E23', imageName: '69', solsCode: null, available: false },
  { name: 'NATURAL', hex: '#F5F5DC', imageName: '09', solsCode: null, available: false },
  { name: 'SAND', hex: '#F4A460', imageName: '29', solsCode: null, available: false },
  { name: 'NOUGAT', hex: '#D2B48C', imageName: '28', solsCode: null, available: false },
  { name: 'LEMON', hex: '#FFF200', imageName: '04', solsCode: null, available: false },
  { name: 'LIME PUNCH', hex: '#CCFF00', imageName: '96', solsCode: null, available: false },

  // Sol's Imperial Boje
  { name: 'Sol\'s White', hex: '#FFFFFF', imageName: 'c102', solsCode: '102', available: false },
  { name: 'Deep Black', hex: '#010101', imageName: 'c309', solsCode: '309', available: false },
  { name: 'Pure Grey', hex: '#BDBDBD', imageName: 'c342', solsCode: '342', available: false },
  { name: 'Light Grey', hex: '#E0E0E0', imageName: 'c380', solsCode: '380', available: false },
  { name: 'Grey Melange', hex: '#9E9E9E', imageName: 'c350', solsCode: '350', available: false },
  { name: 'Mouse Grey', hex: '#757575', imageName: 'c381', solsCode: '381', available: false },
  { name: 'Dark Grey', hex: '#424242', imageName: 'c384', solsCode: '384', available: false },
  { name: 'Absolute White', hex: '#F5F5F5', imageName: 'c117', solsCode: '117', available: false },
  { name: 'Ash', hex: '#E0E0E0', imageName: 'c300', solsCode: '300', available: false },
  { name: 'Off-white', hex: '#F5F5DC', imageName: 'c104', solsCode: '104', available: false },
  { name: 'Cream', hex: '#F0E6D2', imageName: 'c106', solsCode: '106', available: false },
  { name: 'Sand', hex: '#F4A460', imageName: 'c115', solsCode: '115', available: false },
  { name: 'Lemon', hex: '#FFF59D', imageName: 'c302', solsCode: '302', available: false },
  { name: 'Gold', hex: '#FFC107', imageName: 'c301', solsCode: '301', available: false },
  { name: 'Orange', hex: '#FF9800', imageName: 'c400', solsCode: '400', available: false },
  { name: 'Hibiscus', hex: '#EF5350', imageName: 'c168', solsCode: '168', available: false },
  { name: 'Red', hex: '#F44336', imageName: 'c145', solsCode: '145', available: false },
  { name: 'Tango Red', hex: '#D32F2F', imageName: 'c154', solsCode: '154', available: false },
  { name: 'Chili', hex: '#B71C1C', imageName: 'c150', solsCode: '150', available: false },
  { name: 'Burgundy', hex: '#880E4F', imageName: 'c146', solsCode: '146', available: false },
  { name: 'Candy Pink', hex: '#F8BBD0', imageName: 'c127', solsCode: '127', available: false },
  { name: 'Orchid Pink', hex: '#F06292', imageName: 'c136', solsCode: '136', available: false },
  { name: 'Fuchsia', hex: '#E91E63', imageName: 'c140', solsCode: '140', available: false },
  { name: 'Ancient Pink', hex: '#BCAAA4', imageName: 'c170', solsCode: '170', available: false },
  { name: 'Light Purple', hex: '#B39DDB', imageName: 'c710', solsCode: '710', available: false },
  { name: 'Dark Purple', hex: '#673AB7', imageName: 'c712', solsCode: '712', available: false },
  { name: 'Sky Blue', hex: '#81D4FA', imageName: 'c220', solsCode: '220', available: false },
  { name: 'Ice Blue', hex: '#90A4AE', imageName: 'c245', solsCode: '245', available: false },
  { name: 'Caribbean Blue', hex: '#26C6DA', imageName: 'c237', solsCode: '237', available: false },
  { name: 'Atoll Blue', hex: '#00BCD4', imageName: 'c225', solsCode: '225', available: false },
  { name: 'Aqua', hex: '#0097A7', imageName: 'c321', solsCode: '321', available: false },
  { name: 'Blue', hex: '#2196F3', imageName: 'c205', solsCode: '205', available: false },
  { name: 'Royal Blue', hex: '#1E88E5', imageName: 'c241', solsCode: '241', available: false },
  { name: 'Ultramarine', hex: '#303F9F', imageName: 'c238', solsCode: '238', available: false },
  { name: 'Denim', hex: '#546E7A', imageName: 'c244', solsCode: '244', available: false },
  { name: 'Navy', hex: '#283593', imageName: 'c318', solsCode: '318', available: false },
  { name: 'French Navy', hex: '#1A237E', imageName: 'c319', solsCode: '319', available: false },
  { name: 'Petroleum Blue', hex: '#006064', imageName: 'c249', solsCode: '249', available: false },
  { name: 'Green Sage', hex: '#A5D6A7', imageName: 'c273', solsCode: '273', available: false },
  { name: 'Apple Green', hex: '#CDDC39', imageName: 'c280', solsCode: '280', available: false },
  { name: 'Emerald', hex: '#009688', imageName: 'c270', solsCode: '270', available: false },
  { name: 'Kelly Green', hex: '#4CAF50', imageName: 'c272', solsCode: '272', available: false },
  { name: 'Bottle Green', hex: '#2E7D32', imageName: 'c264', solsCode: '264', available: false },
  { name: 'Khaki', hex: '#827717', imageName: 'c268', solsCode: '268', available: false },
  { name: 'Zinc', hex: '#616161', imageName: 'c330', solsCode: '330', available: false },
  { name: 'Army', hex: '#558B2F', imageName: 'c269', solsCode: '269', available: false },
  { name: 'Dark Khaki', hex: '#3E2723', imageName: 'c289', solsCode: '289', available: false },
  { name: 'Terracotta', hex: '#A1887F', imageName: 'c407', solsCode: '407', available: false },
  { name: 'Chocolate', hex: '#5D4037', imageName: 'c398', solsCode: '398', available: false },
  { name: 'Earth', hex: '#4E342E', imageName: 'c397', solsCode: '397', available: false },
]);

const imageLocationOptions = [
  { name: 'Srce', value: 'srce' }, { name: 'Prsa', value: 'prsa' }, { name: 'Leđa', value: 'leda' },
  { name: 'Desno rame', value: 'desno-rame' }, { name: 'Lijevo rame', value: 'lijevo-rame' },
];

// --- COMPUTED PROPERTIES ---
const currentProduct = computed(() => productOptions.find(p => p.value === formData.productType));
const selectedColorName = computed(() => getSavedColorName(formData.tshirtColor));
const frontImages = computed(() => formData.images.filter(img => img.location !== 'leda'));
const backImages = computed(() => formData.images.filter(img => img.location === 'leda'));
const filteredColors = computed(() => availableColors.filter(color => color.available));
const previewFrontUrl = computed(() => getProductImageUrl(currentProduct.value, formData.tshirtColor, 'front'));
const previewBackUrl = computed(() => getProductImageUrl(currentProduct.value, formData.tshirtColor, 'back'));

// --- METHODS ---
const getSavedColorName = (imageName) => availableColors.find(c => c.imageName === imageName)?.name || 'Nepoznato';
const productTypeText = (val) => productOptions.find(p => p.value === val)?.text || 'Nepoznato';
const getImageLocationName = (locationValue) => imageLocationOptions.find(opt => opt.value === locationValue)?.name || 'Nepoznato';
const calculateTotalQuantity = (sizes) => Object.values(sizes.male).reduce((a, b) => a + b, 0) + Object.values(sizes.female).reduce((a, b) => a + b, 0);

const getProductImageUrl = (product, colorImageName, side) => {
  if (!product || !colorImageName) return '';
  const sideCode = side === 'front' ? 'A' : 'B';

  switch (product.brand) {
    case 'malfini':
      return `/malfini-proxy/image/product/${product.value}/${product.value}_${colorImageName}_${sideCode.toLowerCase()}~.jpg`;
    case 'sols':
      const colorInfo = availableColors.find(c => c.imageName === colorImageName);
      if (colorInfo && colorInfo.solsCode) {
        return `/sols-proxy/is/image/soloinvest/vc${product.value}${colorInfo.solsCode}${sideCode}?$big_image_web$&fmt=webp`;
      }
      return '';
    case 'kariban':
      const isBack = side === 'back' ? '-B' : '';
      if (colorImageName === '00') {
        return `https://cdn.karibanbrands.com/packshots/PS_K254${isBack}-2_WHITE.png`;
      }
      if (colorImageName === '01') {
        return `https://cdn.karibanbrands.com/packshots/PS_K254${isBack}-2_BLACK.png`;
      }
      return '';
    default:
      return '';
  }
};

const triggerImageUpload = () => {
  imageInput.value.click();
};

const handleImageSelection = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    snackbar.text = 'Molimo odaberite slikovnu datoteku (npr. JPG, PNG).';
    snackbar.color = 'warning';
    snackbar.show = true;
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const image = new Image();
    image.onload = () => {
      if (image.width < 200 || image.height < 200) {
        snackbar.text = `Slika je premala (${image.width}x${image.height}px). Minimalna veličina je 200x200px.`;
        snackbar.color = 'error';
        snackbar.show = true;
        if (imageInput.value) imageInput.value.value = '';
      } else {
        newImage.file = file;
        newImage.url = e.target.result;
        addImageToDesign();
      }
    };
    image.src = e.target.result;
  };
  reader.readAsDataURL(file);
};

const addImageToDesign = () => {
  if (!newImage.file || !newImage.location) return;

  formData.images.push({
    id: Date.now(),
    file: newImage.file,
    url: newImage.url,
    location: newImage.location,
    name: newImage.file.name,
  });

  newImage.file = null;
  newImage.url = null;
  if (imageInput.value) {
    imageInput.value.value = '';
  }
};

const removeImage = (idToRemove) => {
  formData.images = formData.images.filter(image => image.id !== idToRemove);
};

const resetForm = () => {
  formData.productType = '129';
  formData.tshirtColor = '00';
  formData.images = [];
  formData.note = '';
  Object.keys(formData.sizes.male).forEach(size => formData.sizes.male[size] = 0);
  Object.keys(formData.sizes.female).forEach(size => formData.sizes.female[size] = 0);
  newImage.file = null;
  newImage.url = null;
  newImage.location = 'prsa';
  if (imageInput.value) {
    imageInput.value.value = '';
  }
  checkColorAvailability(currentProduct.value);
};

// Pronađite ovu funkciju u svom kodu i zamijenite je
const addItemToCart = () => {
  const totalQuantity = calculateTotalQuantity(formData.sizes);
  if (totalQuantity === 0) {
    snackbar.text = 'Greška: Morate unijeti količinu za barem jednu veličinu.';
    snackbar.color = 'error';
    snackbar.show = true;
    return;
  }
  if (!formData.tshirtColor) {
    snackbar.text = 'Greška: Morate odabrati boju majice.';
    snackbar.color = 'error';
    snackbar.show = true;
    return;
  }

  const newItem = {
    id: Date.now(),
    productType: formData.productType,
    tshirtColor: formData.tshirtColor,
    note: formData.note,
    // --- ISPRAVAK JE OVDJE ---
    // Direktno dodjeljujemo polje slika. File objekti ostaju sačuvani.
    images: formData.images,
    // Duboko kopiranje za 'sizes' je i dalje dobra ideja da se izbjegnu problemi s reaktivnošću
    sizes: JSON.parse(JSON.stringify(formData.sizes)),
  };

  cart.push(newItem);
  snackbar.text = 'Stavka je uspješno dodana u narudžbu!';
  snackbar.color = 'success';
  snackbar.show = true;

  // resetForm će isprazniti formData.images, tako da nema problema s referencama
  resetForm();
};
const removeItemFromCart = (itemId) => {
  const index = cart.findIndex(item => item.id === itemId);
  if (index > -1) {
    cart.splice(index, 1);
  }
};

const uploadToImgbb = async (file) => {
  const formDataApi = new FormData();
  formDataApi.append('image', file);
  const response = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formDataApi);
  return response.data.data.url;
};

const sendOrder = async () => {
  if (!formData.firstName || !formData.lastName || !formData.phone || !formData.email) { alert('Molimo ispunite sve osobne podatke (Ime, Prezime, Telefon, Email).'); return; }
  if (formData.isBusiness && (!formData.businessDetails.name || !formData.businessDetails.oib || !formData.businessDetails.address)) { alert('Molimo ispunite sve podatke o firmi (Ime, OIB, Adresa).'); return; }
  if (cart.length === 0) { alert('Vaša narudžba je prazna. Molimo dodajte barem jedan proizvod.'); return; }

  isLoading.value = true;
  try {
    let orderSummaryHtml = '';
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      const uploadedImages = await Promise.all(item.images.map(img => uploadToImgbb(img.file)));
      const imageLocations = item.images.map(img => getImageLocationName(img.location));
      let sizesTableHtml = '';
      const sizesMale = Object.values(item.sizes.male).reduce((a, b) => a + b, 0);
      const sizesFemale = Object.values(item.sizes.female).reduce((a, b) => a + b, 0);

      if (sizesMale > 0) {
        sizesTableHtml += `<table style="width: 100%; border-collapse: collapse; margin-bottom: 10px; font-size: 14px;"><thead><tr style="background-color: #eeeeee;"><th style="padding: 8px; text-align: left;">Muške</th><th style="padding: 8px; text-align: center;">XS</th><th style="padding: 8px; text-align: center;">S</th><th style="padding: 8px; text-align: center;">M</th><th style="padding: 8px; text-align: center;">L</th><th style="padding: 8px; text-align: center;">XL</th><th style="padding: 8px; text-align: center;">XXL</th><th style="padding: 8px; text-align: center;">3XL</th></tr></thead><tbody><tr><td style="padding: 8px; text-align: left;">Kom.</td><td style="padding: 8px; text-align: center;">${item.sizes.male.XS}</td><td style="padding: 8px; text-align: center;">${item.sizes.male.S}</td><td style="padding: 8px; text-align: center;">${item.sizes.male.M}</td><td style="padding: 8px; text-align: center;">${item.sizes.male.L}</td><td style="padding: 8px; text-align: center;">${item.sizes.male.XL}</td><td style="padding: 8px; text-align: center;">${item.sizes.male.XXL}</td><td style="padding: 8px; text-align: center;">${item.sizes.male['3XL']}</td></tr></tbody></table>`;
      }
      if (sizesFemale > 0) {
        sizesTableHtml += `<table style="width: 100%; border-collapse: collapse; margin-bottom: 10px; font-size: 14px;"><thead><tr style="background-color: #eeeeee;"><th style="padding: 8px; text-align: left;">Ženske</th><th style="padding: 8px; text-align: center;">XS</th><th style="padding: 8px; text-align: center;">S</th><th style="padding: 8px; text-align: center;">M</th><th style="padding: 8px; text-align: center;">L</th><th style="padding: 8px; text-align: center;">XL</th><th style="padding: 8px; text-align: center;">XXL</th><th style="padding: 8px; text-align: center;">3XL</th></tr></thead><tbody><tr><td style="padding: 8px; text-align: left;">Kom.</td><td style="padding: 8px; text-align: center;">${item.sizes.female.XS}</td><td style="padding: 8px; text-align: center;">${item.sizes.female.S}</td><td style="padding: 8px; text-align: center;">${item.sizes.female.M}</td><td style="padding: 8px; text-align: center;">${item.sizes.female.L}</td><td style="padding: 8px; text-align: center;">${item.sizes.female.XL}</td><td style="padding: 8px; text-align: center;">${item.sizes.female.XXL}</td><td style="padding: 8px; text-align: center;">${item.sizes.female['3XL']}</td></tr></tbody></table>`;
      }

      orderSummaryHtml += `<div style="border: 1px solid #ddd; padding: 16px; margin-bottom: 24px; border-radius: 8px; background-color: #fff;"><h3 style="margin-top:0; color: #333;">Stavka ${i + 1}: ${productTypeText(item.productType)}</h3><p><strong>Boja:</strong> ${getSavedColorName(item.tshirtColor)}</p><p><strong>Ukupno komada:</strong> ${calculateTotalQuantity(item.sizes)}</p><h4 style="margin-top: 16px; margin-bottom: 10px;">Veličine:</h4>${sizesTableHtml}<h4 style="margin-top: 16px; margin-bottom: 10px;">Dizajni:</h4>${uploadedImages.map((url, index) => `<div style="margin-bottom: 10px;"><strong>${imageLocations[index]}:</strong><br/><img src="${url}" width="150" style="border:1px solid #ccc; border-radius: 4px;" /></div>`).join('')}</div>`;
    }

    let noteHtml = '';
    if (formData.note) { noteHtml = `<h3 style="margin-top: 32px; color: #333;">📝 Napomena kupca:</h3><p style="white-space: pre-wrap; background-color: #f0f0f0; border: 1px solid #ddd; padding: 10px; border-radius: 5px;">${formData.note}</p>`; }
    let businessInfoHtml = '';
    if (formData.isBusiness) { businessInfoHtml = `<h3 style="margin-top: 32px;">🏢 Podaci o firmi (R1):</h3><p><strong>Ime firme:</strong> ${formData.businessDetails.name}</p><p><strong>OIB:</strong> ${formData.businessDetails.oib}</p><p><strong>Adresa:</strong> ${formData.businessDetails.address}</p>`; }

    const emailParams = {
      firstName: formData.firstName, lastName: formData.lastName, phone: formData.phone, email: formData.email,
      note: noteHtml, businessInfo: businessInfoHtml, orderSummary: orderSummaryHtml,
    };
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailParams, EMAILJS_PUBLIC_KEY);
    router.push('/hvala');
  } catch (error) {
    console.error('Greška pri slanju:', error);
    alert('Došlo je do greške pri slanju narudžbe.');
  } finally {
    isLoading.value = false;
  }
};

const onImageError = (event) => {
  event.target.src = 'https://placehold.co/450x450/cccccc/ffffff?text=Slika+nedostupna';
};

const checkColorAvailability = (product) => {
  if (!product) return;

  availableColors.forEach(color => color.available = false);
  let defaultColorSet = false;

  if (product.brand === 'kariban') {
    const white = availableColors.find(c => c.imageName === '00');
    if (white) white.available = true;
    const black = availableColors.find(c => c.imageName === '01');
    if (black) black.available = true;
    formData.tshirtColor = '00';
    return;
  }

  availableColors.forEach(color => {
    let shouldCheck = false;
    if (product.brand === 'sols' && color.solsCode) {
      shouldCheck = true;
    } else if (product.brand === 'malfini' && !color.solsCode) {
      shouldCheck = true;
    }

    if (shouldCheck) {
      const imageUrl = getProductImageUrl(product, color.imageName, 'front');
      if (imageUrl) {
        axios.head(imageUrl)
          .then(() => {
            color.available = true;
            if (!defaultColorSet) {
              formData.tshirtColor = color.imageName;
              defaultColorSet = true;
            }
          })
          .catch(() => {
            color.available = false;
          });
      }
    }
  });
};

onMounted(() => {
  checkColorAvailability(currentProduct.value);
});

watch(() => formData.productType, (newProductValue) => {
  const newProduct = productOptions.find(p => p.value === newProductValue);
  checkColorAvailability(newProduct);
});

</script>

<style scoped>
.fill-height { min-height: calc(100vh - 64px); }
.custom-card { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); border-radius: 12px; height: 100%; display: flex; flex-direction: column; }
.color-palette { max-width: 100%; }
.color-swatch { width: 40px; height: 40px; border-radius: 50%; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; display: flex; align-items: center; justify-content: center; position: relative; border: 2px solid transparent; }
.color-swatch:hover { transform: scale(1.1); }
.selected-icon { color: white; font-size: 24px; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7); }
.tshirt-previews-wrapper { display: flex; justify-content: center; align-items: flex-start; gap: 20px; width: 100%; max-width: 900px; margin: 0 auto; }
.single-tshirt-preview { position: relative; flex: 1; max-width: 450px; }
.overlay-image { position: absolute; object-fit: contain; z-index: 10; pointer-events: none; }
.overlay-image-srce { top: 30%; left: 60%; transform: translateX(-50%); width: 18%; height: 18%; }
.overlay-image-prsa { top: 25%; left: 50%; transform: translateX(-50%); width: 20%; height: 35%; }
.overlay-image-leda { top: 15%; left: 50%; transform: translateX(-50%); width: 20%; height: 55%; }
.overlay-image-lijevo-rame { top: 33%; left: 20%; transform: translateX(-50%); width: 10%; height: 20%; }
.overlay-image-desno-rame { top: 33%; left: 80%; transform: translateX(-50%); width: 20%; height: 20%; }
@media (max-width: 960px) {
  .tshirt-previews-wrapper { flex-direction: column; align-items: center; gap: 15px; }
  .single-tshirt-preview { width: 100%; }
}
.sticky-footer-mobile { position: fixed; bottom: 0; left: 0; width: 100%; padding: 1rem; background: #FFFFFF; box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1); z-index: 100; }
</style>