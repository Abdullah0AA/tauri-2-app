import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import { log } from 'console'

// Define paths
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const packageJsonPath = path.resolve(__dirname, '../package.json')
const cargoTomlPath = path.resolve(__dirname, '../src-tauri/Cargo.toml')

// Check if Git working directory is clean
try {
  const status = execSync('git status --porcelain').toString().trim()
  if (status) {
    console.error(
      '❌ Error: Git working directory not clean. Commit or stash your changes before bumping the version.'
    )
    process.exit(1)
  }
} catch (error) {
  console.error('❌ Error checking Git status:', error.message)
  process.exit(1)
}

// Get version bump type (patch, minor, major)
const bumpType = process.argv[2]
if (!['patch', 'minor', 'major'].includes(bumpType)) {
  console.error('❌ Error: You must specify "patch", "minor", or "major"')
  process.exit(1)
}

try {
  // Step 1️⃣: Bump package.json version (without git tag)
  execSync(`npm version ${bumpType} --no-git-tag-version`, { stdio: 'inherit' })

  // Step 2️⃣: Read the new version from package.json
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  const newVersion = packageJson.version

  // Step 3️⃣: Update Cargo.toml with new version
  let cargoToml = fs.readFileSync(cargoTomlPath, 'utf8')
  const updatedCargoToml = cargoToml.replace(
    /version = "(\d+\.\d+\.\d+)"/,
    `version = "${newVersion}"`
  )
  fs.writeFileSync(cargoTomlPath, updatedCargoToml)

  console.log(`✅ Synced version to Cargo.toml: ${newVersion}`)

  // Step 4️⃣: Commit both changes together
  console.log(cargoTomlPath);
  
  execSync(`git add package.json package-lock.json ${cargoTomlPath}`, { stdio: 'inherit' })
  execSync(`git commit -m "chore: bump version to ${newVersion}"`, {
    stdio: 'inherit',
  })

  console.log(`✅ Version bump committed: ${newVersion}`)
} catch (error) {
  console.error('❌ Error bumping version:', error.message)
  process.exit(1)
}
