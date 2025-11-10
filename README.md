# Basic Watch Face

A simple, elegant watch face application built with the Moddable SDK. Displays the current time in a large, centered font with configurable 12-hour or 24-hour format.

## Features

- **Clean Design**: Time displayed in large, bold font centered on the screen
- **Configurable Format**: Switch between 12-hour and 24-hour time display
- **Persistent Settings**: Your time format preference is saved across app restarts
- **Modern JavaScript**: Built using the Moddable SDK with modern JavaScript (ES6+)
- **Automated Testing**: Comprehensive test suite with CI/CD pipeline
- **Continuous Deployment**: Automated builds and releases via GitHub Actions

## Screenshots

The watch face displays the current time in the center of the screen with a clean, minimalist design.

## Development

### Prerequisites

- Node.js 18 or higher
- Moddable SDK (for building and running the app)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/gthoma17/basic-watch-face.git
cd basic-watch-face
```

2. Install dependencies:
```bash
npm install
```

3. Install Moddable SDK (if not already installed):
```bash
cd ~
git clone https://github.com/Moddable-OpenSource/moddable.git
cd moddable/build/makefiles/lin  # or mac or win depending on your OS
make
```

4. Set up environment variables:
```bash
export MODDABLE=~/moddable
export PATH=$MODDABLE/build/bin/lin/release:$PATH
```

### Building

To build and run in the simulator:
```bash
npm run build
```

To build for a specific device:
```bash
npm run build:device
```

### Testing

Run the test suite:
```bash
npm test
```

Tests cover:
- Time formatting logic (12-hour and 24-hour formats)
- Settings persistence
- Edge cases (midnight, noon, etc.)

### Project Structure

```
basic-watch-face/
├── src/
│   ├── main.js          # Main watch face application
│   └── settings.js      # Settings UI for time format configuration
├── test/
│   ├── timeFormat.test.js   # Tests for time formatting
│   └── settings.test.js     # Tests for settings management
├── .github/
│   └── workflows/
│       └── ci.yml       # CI/CD pipeline configuration
├── manifest.json        # Moddable project manifest
├── package.json         # Node.js package configuration
└── README.md           # This file
```

## Settings

The watch face includes a settings page accessible through the Moddable simulator or device:

- **Use 24-Hour Format**: Toggle between 12-hour (default) and 24-hour time display

Settings are persisted using the Moddable Preference API and will be remembered across app restarts.

## CI/CD Pipeline

The project includes a GitHub Actions workflow that:

1. **Tests**: Runs the Jest test suite on every push and pull request
2. **Builds**: Compiles the Moddable application
3. **Releases**: Automatically creates releases with build artifacts when tags are pushed

To create a new release:
```bash
git tag v1.0.0
git push origin v1.0.0
```

## License

MIT License - feel free to use this project as a starting point for your own watch face applications.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Built with [Moddable SDK](https://github.com/Moddable-OpenSource/moddable)
- Inspired by the need for simple, customizable watch faces