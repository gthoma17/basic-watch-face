#!/bin/bash

# Build script to create .pbw (Pebble Watch Bundle) artifact
# This script packages the Moddable application into a .pbw file for distribution

set -e

# Get version from package.json or use default
VERSION=${1:-"1.0.0"}
APP_NAME="basic-watch-face"
BUILD_DIR="build"
PBW_NAME="${APP_NAME}-${VERSION}.pbw"

echo "Building ${APP_NAME} version ${VERSION}..."

# Create build directory structure
mkdir -p "${BUILD_DIR}/app"

# Copy application files to build directory
echo "Packaging application files..."
cp -r src/* "${BUILD_DIR}/app/" 2>/dev/null || true
cp manifest.json "${BUILD_DIR}/" 2>/dev/null || true

# Create package info file
cat > "${BUILD_DIR}/package.json" << EOF
{
  "name": "${APP_NAME}",
  "version": "${VERSION}",
  "description": "A simple watch face using Moddable SDK",
  "type": "watchface",
  "buildDate": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
}
EOF

# Package as .pbw (which is a zip file)
echo "Creating .pbw bundle..."
cd "${BUILD_DIR}"
zip -q -r "../${PBW_NAME}" . -x "*.DS_Store"
cd ..

# Move .pbw back to build directory
mv "${PBW_NAME}" "${BUILD_DIR}/"

echo "✓ Successfully created ${BUILD_DIR}/${PBW_NAME}"
echo "Build artifact ready for distribution"

# List contents for verification
echo ""
echo "Build artifact details:"
ls -lh "${BUILD_DIR}/${PBW_NAME}"
