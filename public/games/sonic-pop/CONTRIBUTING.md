# 🤝 Contributing to Audio Balloon Pop Game

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

---

## How to Contribute

### 1. Fork the Repository

Click the "Fork" button on GitHub to create your own copy.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR-USERNAME/balloon_game_ver1.git
cd balloon_game_ver1
```

### 3. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

Use descriptive branch names:
- `feature/new-level`
- `fix/audio-bug`
- `docs/update-readme`

### 4. Make Your Changes

Follow the project structure:
- **New levels**: Add to `src/levels/`
- **Core features**: Modify `src/core/`
- **Backend**: Edit `server/`
- **Documentation**: Update `.md` files

### 5. Test Your Changes

```bash
# Install dependencies
pip3 install -r server/requirements.txt

# Run local server
python3 server/api_server.py

# Test at http://localhost:8080/
```

### 6. Commit Your Changes

```bash
git add .
git commit -m "Brief description of changes"
```

**Good commit messages:**
- ✅ "Add new level: Rapid Fire Challenge"
- ✅ "Fix audio sync issue in Bomb Dodger"
- ✅ "Update README with new features"

**Bad commit messages:**
- ❌ "Update"
- ❌ "Fix stuff"
- ❌ "Changes"

### 7. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 8. Create Pull Request

1. Go to the original repository on GitHub
2. Click "Pull Requests" → "New Pull Request"
3. Select your branch
4. Describe your changes
5. Submit!

---

## Code Style Guidelines

### JavaScript

- Use `camelCase` for variables and functions
- Use descriptive names: `calculateScore()` not `calc()`
- Add comments for complex logic
- Keep functions small and focused

### Python

- Use `snake_case` for functions and variables
- Follow PEP 8 style guide
- Add docstrings to functions
- Use type hints where helpful

### File Structure

```
src/
├── core/           # Core game systems (don't change unless necessary)
├── levels/         # Level implementations (safe to add new ones)
└── (no games/)     # Racing games removed

server/
├── api_server.py          # Development server
├── api_server_production.py # Production server (careful!)
├── database.py            # SQLite database
└── database_postgres.py   # PostgreSQL database
```

---

## What to Contribute

### Ideas Welcome! 🎯

- **New Levels**: Create new balloon popping challenges
- **Accessibility**: Improve features for visually impaired players
- **Bug Fixes**: Fix issues you find while playing
- **Performance**: Optimize audio or physics
- **Documentation**: Improve README or guides
- **Testing**: Add test cases

### Not Accepted ❌

- Racing games (moved to separate project)
- Breaking changes to core audio system
- Changes that reduce accessibility
- Unnecessary dependencies

---

## Questions?

- **Open an Issue**: Describe what you want to do
- **Discussion**: Ask in Pull Request comments
- **Email**: Contact repository maintainers

---

## Code of Conduct

- Be respectful and inclusive
- Help others learn
- Accept constructive feedback
- Focus on the best solution, not being right

---

**Thank you for contributing!** 🎈
