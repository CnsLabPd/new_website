# Changelog

All notable changes to the Audio Balloon Pop Game will be documented here.

---

## [v2.0.0] - 2026-02-10

### 🎯 Major Update - Racing Games Removal

**BREAKING CHANGES:**
- Removed Module 2 (Racing Games) entirely
- Now focused exclusively on balloon popping gameplay

### Removed
- ❌ `src/games/highwayracer/` directory (90MB, ~5,700 lines)
- ❌ Racing level files (level11.js, level12.js, level13.js)
- ❌ Module 2 configuration from levels.js
- ❌ Racing game audio prompts
- ❌ Database records for levels 11-13 (auto-cleanup)
- ❌ Unnecessary documentation files

### Added
- ✅ Automatic database cleanup for removed racing levels
- ✅ New simplified documentation structure
- ✅ DEPLOYMENT.md - Simple deployment guide
- ✅ CONTRIBUTING.md - Contribution guidelines
- ✅ This CHANGELOG.md file

### Changed
- 📝 Complete README.md rewrite
- 📝 Updated audio prompts (2 modules instead of 3)
- 📝 Streamlined project structure
- 🎮 Game now shows only 1 module with 4 levels

### Impact
- **Repository size**: -90MB (10MB total now)
- **Code reduction**: -6,090 lines
- **Deployment**: Faster and simpler
- **Focus**: Pure balloon popping experience

---

## [v1.5.0] - 2026-02-09

### Fixed
- 🐛 Fixed logout button not working on Render production
- 🐛 Fixed 404 errors for deleted asset files
- 🐛 Fixed Python 3.13 compatibility (psycopg2 issue)

### Changed
- 🔧 Improved logout redirect with absolute URLs
- 🔧 Added debug logging for logout flow
- 🔧 Updated auth.js version for cache refresh

---

## [v1.4.0] - 2026-02-04

### Added
- 🎨 Branding logo image on login page
- 🎥 Intro video sequence
- 📹 Looped background videos

### Changed
- 🎨 Fixed Modules button alignment
- 🎨 Improved navbar layout with display: contents
- 🎨 Removed overall progress card

### Removed
- ❌ Old background images and videos
- ❌ Unused level files (level1-5.js)

---

## [v1.3.0] - 2025-01-27

### Added
- 🎮 Module-based level organization
- 🏆 Leaderboard system
- 📊 Progress tracking
- 🎯 4 balloon shooting levels
- 🏎️ 3 racing game levels (now removed in v2.0.0)

### Security
- 🔐 User authentication system
- 🔑 Session management
- 💾 SQLite and PostgreSQL support

---

## [v1.2.0] - 2025-01-23

### Added
- 🚀 Production deployment configuration
- 📦 Render.com deployment support
- 🐘 PostgreSQL database option
- 🔧 Deployment automation scripts

---

## [v1.1.0] - 2024-12-03

### Added
- 💣 Bomb Field Challenge (Level 9 / Level 4)
- ❤️ Lives system for challenging levels
- 🎯 Progressive difficulty system

### Changed
- ⚡ Improved bomb mechanics
- 🎵 Enhanced spatial audio

---

## [v1.0.0] - 2024-10-21

### Initial Release

**Core Features:**
- 🎧 3D Spatial Audio (HRTF technology)
- 👋 Hand gesture tracking (MediaPipe)
- 🎈 Physics-based balloon movement (Matter.js)
- 🎯 Multiple game levels
- 🔊 Voice guidance system
- ♿ Accessibility-first design

**Levels:**
- Level 6: Floating Hunter
- Level 7: Bomb Dodger
- Level 8: Multi-Balloon Rush

---

## Version Format

This project follows [Semantic Versioning](https://semver.org/):
- **MAJOR** version (X.0.0): Breaking changes
- **MINOR** version (0.X.0): New features, backward compatible
- **PATCH** version (0.0.X): Bug fixes

---

**Legend:**
- ✅ Added
- 🔧 Changed
- 🐛 Fixed
- ❌ Removed
- 🔐 Security
- 📝 Documentation
