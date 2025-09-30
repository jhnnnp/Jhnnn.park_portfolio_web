# 🍎 Apple-Style Portfolio

A modern, minimalist portfolio website built with React, TypeScript, and Tailwind CSS, inspired by Apple's design philosophy.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-green)
![React](https://img.shields.io/badge/React-19.1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.11-38B2AC)

## ✨ Features

- **🎨 Apple-Inspired Design**: Clean, minimalist interface with Apple's design language
- **⚡ Modern Tech Stack**: React 19, TypeScript, Tailwind CSS 4
- **🎭 Smooth Animations**: Framer Motion and GSAP for fluid interactions
- **📱 Fully Responsive**: Optimized for all devices and screen sizes
- **🚀 Performance Optimized**: Fast loading with optimized assets
- **📧 Contact Form**: EmailJS integration for seamless communication
- **🎯 SEO Ready**: Meta tags and structured data for search engines
- **♿ Accessibility**: WCAG 2.1 AA compliant

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - Modern UI library
- **TypeScript 5.8.3** - Type-safe development
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **Vite 7.1.0** - Fast build tool

### Animation & Interactions
- **Framer Motion 12.23.12** - React animation library
- **GSAP 3.12.0** - Professional animation library
- **React Intersection Observer** - Scroll-based animations
- **Lenis** - Smooth scrolling

### Forms & Validation
- **React Hook Form 7.51.0** - Performant forms
- **Zod 3.23.0** - TypeScript-first schema validation
- **EmailJS** - Email service integration

### UI Components
- **Lucide React** - Beautiful icons
- **Class Variance Authority** - Type-safe component variants
- **Tailwind Merge** - Utility class merging

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jinhanpark/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your EmailJS credentials:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   └── textarea.tsx
│   │   ├── layout/          # Layout components
│   │   │   ├── Navigation.tsx
│   │   │   └── Footer.tsx
│   │   └── sections/        # Page sections
│   │       ├── Hero.tsx
│   │       ├── About.tsx
│   │       ├── Projects.tsx
│   │       ├── Experience.tsx
│   │       └── Contact.tsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useScrollAnimation.ts
│   │   └── useEmailForm.ts
│   ├── lib/                 # Utilities and constants
│   │   ├── utils.ts
│   │   └── constants.ts
│   └── styles/              # Global styles
├── public/                  # Static assets
├── tailwind.config.js       # Tailwind configuration
└── package.json
```

## 🎨 Design System

### Color Palette
```css
/* Apple-inspired colors */
--apple-gray-50: #F5F5F7
--apple-gray-100: #E5E5E7
--apple-gray-200: #D1D1D6
--apple-gray-300: #C7C7CC
--apple-gray-400: #AEAEB2
--apple-gray-500: #8E8E93
--apple-gray-600: #636366
--apple-gray-700: #48484A
--apple-gray-800: #3A3A3C
--apple-gray-900: #1D1D1F
--apple-blue: #007AFF
--apple-green: #30D158
--apple-orange: #FF9500
--apple-red: #FF3B30
--apple-purple: #AF52DE
```

### Typography
- **Font Family**: SF Pro Display, Inter, system-ui
- **Font Sizes**: 12px to 72px (responsive scale)
- **Line Heights**: Optimized for readability

### Spacing System
- **Base Unit**: 8px
- **Spacing Scale**: 8, 16, 24, 32, 48, 64, 80, 120, 160, 200px

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 639px
- **Tablet**: 640px - 1023px
- **Desktop**: 1024px - 1279px
- **Large Desktop**: 1280px+

### Mobile-First Approach
- Touch-friendly interactions (44px minimum touch targets)
- Optimized typography scaling
- Efficient navigation patterns

## 🎭 Animation System

### Scroll Animations
- **Fade In**: Elements appear as they enter viewport
- **Stagger**: Sequential animation of child elements
- **Parallax**: Background elements move at different speeds
- **Counter**: Animated number counting

### Interaction Animations
- **Hover Effects**: Scale, color, and shadow transitions
- **Button States**: Loading, success, and error states
- **Page Transitions**: Smooth navigation between sections

## 📧 Contact Form

### EmailJS Integration
The contact form uses EmailJS for reliable email delivery:

1. **Sign up** at [EmailJS](https://www.emailjs.com/)
2. **Create** an email service (Gmail, Outlook, etc.)
3. **Design** an email template
4. **Configure** environment variables

### Form Features
- **Real-time validation** with Zod schemas
- **Loading states** with spinner animations
- **Success/error feedback** with toast notifications
- **Accessibility** with ARIA labels and keyboard navigation

## 🚀 Deployment

### Vercel (Recommended)
1. **Connect** your GitHub repository to Vercel
2. **Configure** build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
3. **Deploy** with automatic previews

### Netlify
1. **Connect** your repository
2. **Set** build command: `npm run build`
3. **Set** publish directory: `dist`
4. **Deploy** with form handling

### Environment Variables
Set these in your deployment platform:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## 🧪 Testing

### Run Tests
```bash
npm run test
```

### Run Linter
```bash
npm run lint
```

### Build for Production
```bash
npm run build
```

## 📈 Performance

### Lighthouse Scores
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### Optimizations
- **Code Splitting**: Lazy-loaded components
- **Image Optimization**: WebP format with responsive sizes
- **Font Loading**: Preloaded critical fonts
- **Bundle Analysis**: Tree-shaking and minification

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Style
- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration
- **Prettier**: Consistent formatting
- **Conventional Commits**: Standard commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Apple Design Team** - For the inspiring design language
- **Framer Motion** - For the amazing animation library
- **Tailwind CSS** - For the utility-first CSS framework
- **Vite** - For the lightning-fast build tool

## 📞 Contact

- **Email**: contact@jinhanpark.dev
- **GitHub**: [@jinhanpark](https://github.com/jinhanpark)
- **LinkedIn**: [Jinhan Park](https://linkedin.com/in/jinhanpark)

---

Made with ❤️ by Jinhan Park
