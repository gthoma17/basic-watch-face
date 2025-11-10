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

The project includes a GitHub Actions workflow that automatically builds and publishes releases:

### Pipeline Jobs

1. **Test**: Runs the Jest test suite on every push and pull request
2. **Build**: Creates a `.pbw` (Pebble Watch Bundle) artifact containing the packaged watch face
3. **Release**: Automatically creates GitHub releases with the `.pbw` artifact attached when version tags are pushed

### Creating a Release

To create a new release and publish the watch face:

1. Update the version in `package.json` if needed
2. Commit your changes:
   ```bash
   git add .
   git commit -m "Prepare release vX.Y.Z"
   ```

3. Create and push a version tag (format: `vX.Y.Z`):
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

4. The CI/CD pipeline will automatically:
   - Run all tests
   - Build the watch face and create the `.pbw` artifact
   - Create a GitHub release with the tag
   - Attach the `.pbw` file to the release
   - Generate release notes from commits

### Release Artifact

Each release includes a `basic-watch-face-X.Y.Z.pbw` file that contains:
- Application source code (`src/main.js`, `src/settings.js`)
- Manifest configuration (`manifest.json`)
- Package metadata with build information

The `.pbw` file is a standard zip archive that can be extracted and inspected if needed.

### Manual Build

You can also build the `.pbw` artifact locally:

```bash
./scripts/build-pbw.sh 1.0.0
```

This will create `build/basic-watch-face-1.0.0.pbw` in your local directory.

## License

MIT License - feel free to use this project as a starting point for your own watch face applications.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Built with [Moddable SDK](https://github.com/Moddable-OpenSource/moddable)
- Inspired by the need for simple, customizable watch faces