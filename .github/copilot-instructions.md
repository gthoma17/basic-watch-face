# GitHub Copilot Instructions for Basic Watch Face

## Project Overview

This repository contains a simple, elegant watch face application built with the Moddable SDK. The app displays the current time in a large, centered font with configurable 12-hour or 24-hour format.

## Technology Stack

- **Moddable SDK**: IoT and embedded device development platform
- **JavaScript (ES6+)**: Primary programming language
- **Node.js 18+**: Development environment
- **Jest**: Testing framework
- **GitHub Actions**: CI/CD pipeline

## Project Structure

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
└── README.md           # Project documentation
```

## Development Commands

### Install Dependencies
```bash
npm install
```

### Run Tests
```bash
npm test
```
Tests are written in Jest and cover:
- Time formatting logic (12-hour and 24-hour formats)
- Settings persistence
- Edge cases (midnight, noon, etc.)

### Build Application
```bash
# For simulator (requires Moddable SDK installation)
npm run build

# For device
npm run build:device
```

**Note**: Building requires the Moddable SDK to be installed and configured. The SDK must be cloned and built separately. Environment variables `MODDABLE` and `PATH` must be set appropriately.

## Code Style and Conventions

1. **JavaScript Style**:
   - Use modern ES6+ features
   - Follow existing code patterns in the repository
   - Maintain consistent indentation (tabs/spaces as per existing files)

2. **Testing**:
   - All new features should include corresponding Jest tests
   - Tests should be placed in the `test/` directory
   - Follow the naming convention: `<feature>.test.js`
   - Tests should cover edge cases (midnight, noon, format transitions)

3. **Documentation**:
   - Update README.md when adding new features
   - Include inline comments for complex logic
   - Keep package.json scripts documented

## Common Development Workflows

### Adding a New Feature
1. Write tests first (TDD approach preferred)
2. Implement the feature in `src/`
3. Update manifest.json if new modules are added
4. Run tests: `npm test`
5. Update README.md if user-facing changes are made

### Fixing a Bug
1. Add a failing test that reproduces the bug
2. Fix the bug in the source code
3. Verify the test passes
4. Run full test suite to ensure no regressions

### Updating Dependencies
1. Check for compatibility with Moddable SDK
2. Update package.json
3. Run `npm install`
4. Run full test suite
5. Test build process if SDK-related changes

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci.yml`) runs on:
- All pushes to `main`/`master`
- All pull requests
- Version tags (format: `v*`)

Pipeline stages:
1. **Test**: Runs Jest test suite
2. **Build**: Compiles Moddable application (may fail if SDK setup is incomplete)
3. **Release**: Creates GitHub releases for version tags with build artifacts

## Important Notes

1. **Moddable SDK Specifics**:
   - The SDK is not included in the repository
   - Build steps in CI may continue-on-error due to SDK complexity
   - Local development requires manual SDK installation

2. **Settings Persistence**:
   - Uses Moddable Preference API
   - Settings survive app restarts
   - Test mocks should simulate preference storage

3. **Time Formatting**:
   - Handles both 12-hour (with AM/PM) and 24-hour formats
   - Edge cases: midnight (00:00/12:00 AM), noon (12:00/12:00 PM)
   - Padding: single-digit hours may or may not have leading zeros depending on format

## Minimal Changes Philosophy

When making changes to this repository:
- Make the smallest possible modifications to achieve the goal
- Preserve working code and tests
- Don't refactor unrelated code
- Focus on surgical, precise changes
- Validate changes don't break existing functionality

## Testing Requirements

Before submitting changes:
1. Run `npm test` to ensure all tests pass
2. Add tests for new functionality
3. Verify edge cases are covered
4. Check that CI pipeline will succeed

## Getting Help

- Review the [Moddable SDK documentation](https://github.com/Moddable-OpenSource/moddable)
- Check existing tests for examples of expected behavior
- Refer to README.md for setup instructions
- Look at CI workflow for build requirements
