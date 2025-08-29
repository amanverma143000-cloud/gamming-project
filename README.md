# GameZone - Ultimate Gaming Website

A complete, modern gaming website built with React.js featuring responsive design, smooth animations, and interactive gaming features.

## 🎮 Features

### Core Pages
- **Home Page**: Animated landing with gaming theme, live trailers carousel, trending games leaderboard
- **Game Library**: Filterable game collection with search, category filters, and pagination
- **Game Details**: Detailed game information with screenshots, reviews, and system requirements
- **Community**: Live chat, player profiles, multiplayer room finder, and forums
- **Tournaments**: Event calendar with countdown timers and registration system

### Interactive Features
- **Daily Reward System**: Spin-the-wheel animation for daily login rewards
- **Theme Toggle**: Dark mode and cyberpunk mode switching
- **Live Player Counter**: Real-time active users display
- **Background Music**: Toggle-able ambient gaming music
- **Particle Effects**: Animated background particles for gaming atmosphere
- **Smooth Scrolling**: Lenis smooth scrolling implementation
- **Responsive Design**: Mobile, tablet, and desktop optimized

### Animations & Effects
- **Framer Motion**: Smooth page transitions and component animations
- **GSAP Ready**: Prepared for advanced animations
- **Parallax Scrolling**: Background parallax effects
- **Hover Effects**: Interactive card and button animations
- **Loading States**: Animated loading spinners and states

## 🛠️ Technology Stack

- **React.js 18.2.0**: Latest version with functional components and hooks
- **React Router DOM**: Client-side routing
- **Framer Motion**: Animation library
- **GSAP**: Animation framework (ready to use)
- **Lenis**: Smooth scrolling
- **Context API**: State management
- **CSS3**: Modern styling with custom properties
- **Responsive Design**: Mobile-first approach

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.js       # Navigation with theme toggle
│   ├── Footer.js       # Footer with links and stats
│   ├── GameCard.js     # Game display card
│   ├── ParticleBackground.js  # Animated particles
│   └── SpinWheel.js    # Daily reward wheel
├── pages/              # Main pages
│   ├── Home.js         # Landing page
│   ├── Games.js        # Game library
│   ├── GameDetails.js  # Individual game page
│   ├── Community.js    # Community features
│   └── Tournaments.js  # Tournaments and events
├── context/            # State management
│   └── GameContext.js  # Global game state
├── data/               # Mock data
│   └── gamesData.js    # Games, users, tournaments data
├── styles/             # Global styles
│   └── globals.css     # CSS variables and utilities
└── App.js              # Main app component
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   cd gamming-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
```

## 🎨 Customization

### Themes
The website supports two themes:
- **Dark Mode**: Default gaming theme with green accents
- **Cyberpunk Mode**: Purple/pink cyberpunk aesthetic

Themes can be switched using the navbar toggle button.

### Colors
Customize colors in `src/styles/globals.css`:
```css
:root {
  --primary-bg: #0a0a0a;
  --secondary-bg: #1a1a1a;
  --accent-color: #00ff88;
  --accent-secondary: #ff0080;
  /* ... more variables */
}
```

### Adding New Games
Add games to `src/data/gamesData.js`:
```javascript
{
  id: 7,
  title: "Your Game Title",
  category: "FPS", // FPS, RPG, Racing, Adventure
  difficulty: "Medium", // Easy, Medium, Hard
  rating: 4.5,
  activePlayers: 50000,
  // ... more properties
}
```

## 🎮 Features in Detail

### Daily Reward System
- Spin wheel animation with 8 different rewards
- Local storage to track daily claims
- Animated reward display with confetti effects

### Live Chat System
- Real-time message simulation
- User avatars and timestamps
- Scrollable message history

### Tournament System
- Countdown timers for upcoming events
- Registration forms with validation
- Event calendar view

### Game Filtering
- Search by game title
- Filter by category (FPS, RPG, Racing, Adventure)
- Filter by difficulty level
- Pagination for large game collections

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🔧 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🎯 Performance Features

- **Lazy Loading**: Images and components load on demand
- **Optimized Animations**: 60fps smooth animations
- **Efficient State Management**: Context API for minimal re-renders
- **Code Splitting**: Ready for route-based code splitting

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎮 Demo Features

- **Live Player Counter**: Simulated active user count
- **Auto-rotating Trailers**: Featured game videos
- **Interactive Spin Wheel**: Daily reward system
- **Real-time Chat**: Simulated community messages
- **Tournament Countdown**: Live countdown timers
- **Multiplayer Rooms**: Join game rooms simulation

## 🔮 Future Enhancements

- User authentication system
- Real backend integration
- Actual game integration
- Payment system for tournaments
- Advanced chat features (private messages, voice chat)
- Achievement system
- Clan/guild features
- Streaming integration

---

**Built with ❤️ for the gaming community**

Enjoy gaming! 🎮✨