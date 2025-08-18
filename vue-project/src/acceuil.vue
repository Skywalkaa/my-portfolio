<template>
  <div class="portfolio">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 style="text-align:center; color:black;">{{ t('home.greeting') }} <br> <span style="color:orange; font-weight:bold;">{{ t('home.name') }}</span></h1>
          <h2 style="text-align:center;"><br></h2>
          <p class="intro">{{ t('home.description') }}</p>
          <div class="cta-buttons">
            <router-link to="/contact" class="btn btn-primary">
              <span class="btn-text">{{ t('home.contactBtn') }}</span>
              <span class="btn-icon">→</span>
            </router-link>
            <router-link to="/projets" class="btn btn-secondary">
              <span class="btn-text">{{ t('home.projectsBtn') }}</span>
              <span class="btn-icon">↗</span>
            </router-link>
          </div>
        </div>
        <div class="hero-image">
            <div class="image-upload-container">
              <!-- Navigation Arrows -->
              <button class="nav-arrow left-arrow" @click.stop="prevImage" aria-label="Previous image">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              
              <div class="image-content" @click="triggerFileInput">
                <input 
                  type="file" 
                  ref="fileInput" 
                  @change="handleImageUpload" 
                  accept="image/*"
                  class="file-input"
                />
                <div class="image-preview">
                  <img :src="currentImage" alt="Profile Preview" class="profile-image" />
                  <div class="image-overlay">
                    <span>{{ t('home.changePhoto') }}</span>
                  </div>
                </div>
              </div>
              
              <button class="nav-arrow right-arrow" @click.stop="nextImage" aria-label="Next image">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
              
              <!-- Dots Indicator -->
              <div class="dots-indicator">
                <button 
                  v-for="(img, index) in images" 
                  :key="index"
                  class="dot" 
                  :class="{ 'active': currentImageIndex === index }"
                  @click.stop="selectImage(index)"
                  :aria-label="`Go to image ${index + 1}`"
                ></button>
              </div>
              
              <div class="shape shape-1"></div>
              <div class="shape shape-2"></div>
            </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import meImage from '@/assets/me.jpeg';
import { useLanguage } from '@/composables/useLanguage';
import { onMounted, ref } from 'vue';

export default {
  name: 'Acceuil',
  setup() {
    const { t } = useLanguage();
    const fileInput = ref(null);
    
    return { 
      t,
      fileInput
    };
  },
  data() {
    return {
      currentImageIndex: 0,
      images: [
        meImage,
        'https://via.placeholder.com/600x800/f5f5f5/666666?text=Portrait+1',
        'https://via.placeholder.com/600x800/e5e5e5/666666?text=Portrait+2',
        'https://via.placeholder.com/600x800/d5d5d5/666666?text=Portrait+3'
      ],
      projects: [
        {
          title: 'Application Web Moderne',
          description: 'Une application web complète avec authentification et base de données en temps réel.',
          tags: ['Vue.js', 'Firebase', 'SCSS'],
          image: 'https://via.placeholder.com/600x400',
          demo: '#',
          github: '#'
        },
        {
          title: 'Site E-commerce',
          description: 'Plateforme de commerce électronique avec panier d\'achat et paiement en ligne.',
          tags: ['React', 'Node.js', 'MongoDB'],
          image: 'https://via.placeholder.com/600x400',
          demo: '#',
          github: '#'
        },
        {
          title: 'Application Mobile',
          description: 'Application mobile multiplateforme pour la gestion des tâches quotidiennes.',
          tags: ['React Native', 'Redux', 'Firebase'],
          image: 'https://via.placeholder.com/600x400',
          demo: '#',
          github: '#'
        }
      ]
    };
  },
  mounted() {
    // Load saved image index from localStorage if available
    const savedIndex = localStorage.getItem('portfolioImageIndex');
    if (savedIndex !== null) {
      this.currentImageIndex = parseInt(savedIndex, 10);
    }
  },
  computed: {
    currentImage() {
      return this.images[this.currentImageIndex];
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          // Add the new image to the images array
          this.images.push(e.target.result);
          this.currentImageIndex = this.images.length - 1;
          this.saveImageIndex();
        };
        reader.readAsDataURL(file);
      }
    },
    nextImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      this.saveImageIndex();
    },
    prevImage() {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
      this.saveImageIndex();
    },
    selectImage(index) {
      this.currentImageIndex = index;
      this.saveImageIndex();
    },
    saveImageIndex() {
      localStorage.setItem('portfolioImageIndex', this.currentImageIndex);
    }
  }
}
</script>

<style scoped>
/* Global Styles */
:root {
  --primary-color: #3a86ff;
  --secondary-color: #8338ec;
  --dark-color: #1a1a2e;
  --light-color: #f8f9fa;
  --text-color: #333;
  --text-light: #6c757d;
  --white: #ffffff;
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--white);
  overflow-x: hidden;
}

.container {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
}

section {
  padding: 100px 0;
}

h1, h2, h3, h4, h5, h6 {
  margin-bottom: 1rem;
  font-weight: 700;
  line-height: 1.3;
}

p {
  margin-bottom: 1rem;
  color: var(--text-light);
}

a {
  text-decoration: none;
  color: var(--primary-color);
  transition: var(--transition);
}

.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 32px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 2px solid transparent;
  overflow: hidden;
  z-index: 1;
}

.btn-primary {
  background-color: var(--primary-color);
  color: var(--white);
  border-color: var(--primary-color);
  box-shadow: 0 4px 15px rgba(58, 134, 255, 0.3);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(58, 134, 255, 0.4);
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  z-index: -1;
  transition: opacity 0.4s ease;
  opacity: 1;
}

.btn-primary:hover::before {
  opacity: 0.9;
}

.btn-secondary {
  background-color: rgba(58, 134, 255, 0.1);
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background-color: var(--primary-color);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(58, 134, 255, 0.4);
}

.dark .btn-secondary {
  background-color: rgba(102, 126, 234, 0.2);
  color: #667eea;
  border-color: #667eea;
}

.dark .btn-secondary:hover {
  background-color: #667eea;
  color: white;
}

/* Remove any hover effects */
.btn-secondary::after,
.btn-secondary:hover::after {
  display: none;
}

.btn-small {
  padding: 8px 20px;
  font-size: 0.9rem;
}

.btn-text {
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
  color: inherit;
  pointer-events: none;
}

.btn-icon {
  margin-left: 10px;
  transition: all 0.4s ease;
  display: inline-block;
  transform: translateX(0);
}

.btn:hover .btn-icon {
  transform: translateX(5px);
}

.btn-secondary:hover .btn-icon {
  transform: translateX(5px) rotate(-45deg);
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 70px;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  border-radius: 2px;
}

/* Hero Section Styles */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.dark .hero {
  background: linear-gradient(135deg, #4c51bf 0%, #553c9a 100%);
}

.hero .container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  box-sizing: border-box;
  position: relative;
  z-index: 2;
}

.hero h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 15px;
  line-height: 1.2;
  color: var(--dark-color);
}

.hero h2 {
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  color: var(--primary-color);
  margin-bottom: 20px;
  font-weight: 500;
}

.highlight {
  position: relative;
  color: var(--primary-color);
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 10px;
  background-color: rgba(58, 134, 255, 0.2);
  z-index: -1;
  border-radius: 5px;
}

.intro {
  font-size: 1.1rem;
  margin-bottom: 30px;
  color: var(--text-light);
  max-width: 500px;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.hero-content {
  flex: 0 1 600px;
  min-width: 0;
  padding-right: 40px;
  box-sizing: border-box;
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-image {
  flex: 0 1 500px;
  min-width: 0;
  position: relative;
  z-index: 1;
  perspective: 1000px;
  margin-top: 0;
}

.image-upload-container {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  transform-style: preserve-3d;
  animation: float 6s ease-in-out infinite;
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotateY(-5deg); }
  50% { transform: translateY(-20px) rotateY(5deg); }
}

.file-input {
  display: none;
}

.image-content {
  position: relative;
  width: 90%;
  height: 90%;
  cursor: pointer;
}

.image-preview {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform: translateZ(20px);
  border: 2px dashed #e0e9ff;
}

.image-preview:hover {
  transform: translateZ(30px) scale(1.02);
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.15);
}

.image-preview.has-image {
  border-color: transparent;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

/* Navigation Arrows */
.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.8);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: var(--primary-color);
}

.nav-arrow:hover {
  background: white;
  transform: translateY(-50%) scale(1.1);
}

.left-arrow {
  left: 10px;
}

.right-arrow {
  right: 10px;
}

.dark .nav-arrow {
  background: rgba(0, 0, 0, 0.5);
  color: white;
}

.dark .nav-arrow:hover {
  background: rgba(0, 0, 0, 0.7);
}

/* Dots Indicator */
.dots-indicator {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 8px;
  z-index: 10;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot:hover {
  background-color: rgba(255, 255, 255, 0.8);
}

.dot.active {
  background-color: white;
  transform: scale(1.2);
}

.dark .dot {
  background-color: rgba(255, 255, 255, 0.3);
}

.dark .dot:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.dark .dot.active {
  background-color: white;
}

.upload-icon {
  width: 40px;
  height: 40px;
  margin-bottom: 15px;
  stroke-width: 1.5;
  color: var(--primary-color);
  opacity: 0.8;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  color: white;
  font-weight: 500;
  font-size: 1.1rem;
  backdrop-filter: blur(2px);
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
}

.image-preview:hover .image-overlay {
  opacity: 1;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  opacity: 0.1;
  z-index: -1;
  filter: blur(30px);
  animation: pulse 8s infinite alternate;
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: -150px;
  right: -100px;
  animation-delay: 0.5s;
}

.shape-2 {
  width: 200px;
  height: 200px;
  bottom: -50px;
  left: -50px;
  animation-delay: 1s;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.1; }
  100% { transform: scale(1.2); opacity: 0.2; }
}

/* About Section */
.about {
  background-color: var(--white);
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
}

.about-text p {
  margin-bottom: 20px;
  font-size: 1.05rem;
  line-height: 1.8;
}

.personal-info {
  margin-top: 30px;
}

.info-item {
  display: flex;
  margin-bottom: 15px;
  font-size: 1.05rem;
}

.info-label {
  font-weight: 600;
  min-width: 120px;
  color: var(--dark-color);
}

.info-value {
  color: var(--text-light);
}

.skills h3 {
  font-size: 1.5rem;
  margin-bottom: 30px;
  color: var(--dark-color);
}

.skills-grid {
  display: grid;
  gap: 20px;
}

.skill-item {
  margin-bottom: 20px;
}

.skill-name {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--dark-color);
}

.skill-bar {
  height: 10px;
  background-color: #e9ecef;
  border-radius: 5px;
  overflow: hidden;
}

.skill-level {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  border-radius: 5px;
  transition: width 1s ease-in-out;
}

/* Projects Section */
.projects {
  background-color: #f8f9fa;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
}

.project-card {
  background-color: var(--white);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.project-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-content {
  padding: 25px;
}

.project-content h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: var(--dark-color);
}

.project-content p {
  margin-bottom: 20px;
  color: var(--text-light);
  line-height: 1.6;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.tag {
  display: inline-block;
  padding: 5px 12px;
  background-color: #e9ecef;
  border-radius: 50px;
  font-size: 0.8rem;
  color: var(--text-light);
}

.project-links {
  display: flex;
  gap: 15px;
}

/* Contact Section */
.contact {
  background-color: var(--white);
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  margin-top: 50px;
}

.contact-info h3 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: var(--dark-color);
}

.contact-info p {
  margin-bottom: 30px;
  font-size: 1.05rem;
  line-height: 1.8;
}

.contact-details {
  margin-bottom: 30px;
}

.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 1.05rem;
}

.contact-item i {
  width: 40px;
  height: 40px;
  background-color: #e9ecef;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  color: var(--primary-color);
}

.social-links {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background-color: #e9ecef;
  border-radius: 50%;
  color: var(--primary-color);
  font-size: 1.2rem;
  transition: var(--transition);
}

.social-link:hover {
  background-color: var(--primary-color);
  color: var(--white);
  transform: translateY(-5px);
}

.contact-form {
  background-color: #f8f9fa;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
}

.form-group {
  margin-bottom: 20px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .container {
    max-width: 100%;
    padding: 0 20px;
  }
  
  .hero h1 {
    font-size: 2.8rem;
  }
  
  .hero h2 {
    font-size: 1.8rem;
  }
}

@media (max-width: 992px) {
  section {
    padding: 80px 0;
  }
  
  .about-content,
  .contact-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .hero .container {
    flex-direction: column;
    text-align: center;
    padding: 0 15px;
  }
  
  .hero-content {
    margin-bottom: 40px;
    padding: 0;
  }
  
  .hero-image {
    padding: 0;
  }
  
  .cta-buttons {
    justify-content: center;
    gap: 15px;
  }
  
  .profile-placeholder {
    max-width: 100%;
    height: auto;
    aspect-ratio: 1/1;
  }
}

@media (max-width: 768px) {
  section {
    padding: 60px 0;
  }
  
  .section-title {
    font-size: 2rem;
    margin-bottom: 40px;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  
  .contact-form {
    padding: 25px;
  }
  
  .hero h1 {
    font-size: 2.5rem;
  }
  
  .hero h2 {
    font-size: 1.5rem;
  }
  
  .intro {
    font-size: 1.1rem;
  }
}

@media (max-width: 576px) {
  html {
    font-size: 14px;
  }
  
  section {
    padding: 50px 0;
  }
  
  .section-title {
    font-size: 1.8rem;
    margin-bottom: 30px;
  }
  
  .btn {
    width: 100%;
    margin-bottom: 12px;
    padding: 10px 20px;
  }
  
  .cta-buttons {
    flex-direction: column;
    gap: 12px;
  }
  
  .project-links {
    flex-direction: column;
    gap: 12px;
  }
  
  .project-links .btn {
    width: 100%;
    margin: 0;
  }
  
  .hero {
    padding: 70px 0 30px;
  }
  
  .hero h1 {
    font-size: 2.2rem;
    margin-bottom: 10px;
  }
  
  .hero h2 {
    font-size: 1.3rem;
    margin-bottom: 15px;
  }
  
  .intro {
    font-size: 1rem;
    margin-bottom: 25px;
  }
  
  .about-content {
    gap: 30px;
  }
  
  .info-item {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 10px;
  }
  
  .info-label {
    min-width: 100%;
    margin-bottom: 5px;
  }
}
</style>
