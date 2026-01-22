# 🎬 Kansei Anime Hub

Modern anime streaming platform with advanced search, filtering, and multi-source video player integration.

![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 🎥 **Dynamic Anime Catalog** - Browse thousands of anime with real-time updates
- 🔍 **Advanced Search** - Smart filtering by genre, status, and popularity
- 🎨 **Theme Switching** - Light/Dark mode for comfortable viewing
- 📺 **Multi-Source Video Player** - Integrated Sibnet player support
- ⚡ **Real-Time Performance** - Optimized with Vite and lazy loading
- 📱 **Fully Responsive** - Works seamlessly on all devices
- 🔄 **Redux State Management** - Global query and search state
- 🎬 **Featured Content Slider** - Hero section with latest anime

## 🚀 Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite (ultra-fast build)
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **API Integration**: Jikanjs (Anime API)
- **Styling**: CSS Modules + Modern CSS
- **UI Components**: Material Design patterns
- **Video Player**: Sibnet integration
- **Development**: ESLint + Prettier

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/aleks2005vk/Anime-site.git
cd Kansei

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Project Structure

```
src/
├── components/          # React components
│   ├── pages/          # Page components
│   ├── ui/             # UI components
│   └── ...
├── context/            # React Context
├── features/           # Redux slices
├── hooks/              # Custom hooks
├── services/           # API services
└── main.jsx            # Entry point
```

## 🔑 Key Components

- **AnimeDetail** - Detailed anime information page
- **AnimeCatalog** - Browsable anime grid with filtering
- **HeroSlider** - Featured content carousel
- **VideoPlayer** - Integrated video playback
- **Navbar** - Navigation with search
- **Footer** - Site footer with links

## 🌐 API Integration

Uses **Jikanjs** for anime data:
- Real-time anime information
- Episode details
- Genre filtering
- Advanced search capabilities

## 📊 Performance Optimizations

- ⚡ **Code Splitting** - Lazy loaded routes
- 🎯 **Skeleton Loading** - Better UX during data fetch
- 🔄 **Redux Optimization** - Efficient state updates
- 📦 **Bundle Size** - Minimal dependencies
- 🚀 **Vite Build** - Sub-second HMR

## 🎨 Theming

Dark/Light mode support with context API:
- Persistent theme preference
- Smooth transitions
- Full component coverage

## 🛠️ Development

```bash
# Run dev server with HMR
npm run dev

# Build for production
npm run build

# Preview build
npm run preview

# Lint code
npm run lint
```

## 📝 Environment Variables

Create `.env` file:
```
VITE_API_BASE_URL=https://api.jikan.moe/v4
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details

## 👨‍💻 Author

**aleks2005vk** - Full Stack Developer
- GitHub: [@aleks2005vk](https://github.com/aleks2005vk)
- Project: [Anime-site](https://github.com/aleks2005vk/Anime-site)

## 🙏 Acknowledgments

- Jikanjs team for anime API
- React community
- Vite for incredible build tool

## 📞 Support

For support, open an issue on [GitHub Issues](https://github.com/aleks2005vk/Anime-site/issues)

---

**Happy Anime Watching!** 🎬✨
