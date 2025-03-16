import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

// 📍 Define paths
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const packageJsonPath = path.resolve(__dirname, '../package.json')
const cargoTomlPath = path.resolve(__dirname, '../src-tauri/Cargo.toml')
const cargoLockPath = path.resolve(__dirname, '../src-tauri/Cargo.lock')

// 🛑 Check if Git working directory is clean
try {
  const status = execSync('git status --porcelain').toString().trim()
  if (status) {
    console.error('\n❌ Git working directory is not clean!')
    console.error(
      '👉 Please commit or stash your changes before bumping the version.\n'
    )
    process.exit(1)
  }
} catch (error) {
  console.error('\n❌ Error checking Git status:', error.message)
  process.exit(1)
}

// 🏷️ Get version bump type (patch, minor, major)
const bumpType = process.argv[2]
if (!['patch', 'minor', 'major'].includes(bumpType)) {
  console.error('\n❌ Error: You must specify "patch", "minor", or "major".\n')
  process.exit(1)
}

try {
  // 📦 Step 1: Bump package.json version (without git tag)
  execSync(`npm version ${bumpType} --no-git-tag-version`, { stdio: 'inherit' })

  // 🔍 Step 2: Read the new version from package.json
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  const newVersion = packageJson.version

  // 📝 Step 3: Update Cargo.toml with new version
  let cargoToml = fs.readFileSync(cargoTomlPath, 'utf8')
  const updatedCargoToml = cargoToml.replace(
    /version = "(\d+\.\d+\.\d+)"/,
    `version = "${newVersion}"`
  )
  fs.writeFileSync(cargoTomlPath, updatedCargoToml)

  console.log(`\n✅ Version synced: ${newVersion}`)

  // ✨ Final Step: Suggest commit commands
  console.log(
    '\n🚀 **Version bump complete!** Before tagging, commit & push your changes:'
  )
  console.log('\n👉 Run the following commands:')
  console.log(
    `   git add package.json package-lock.json src-tauri/Cargo.toml src-tauri/Cargo.lock`
  )
  console.log(`   git commit -m "chore: bump version to ${newVersion}"`)
  console.log(`   git push`)
  console.log(`   git tag v${newVersion}`)
  console.log(`   git push origin v${newVersion}\n`)
} catch (error) {
  console.error('\n❌ Error bumping version:', error.message)
  process.exit(1)
}
