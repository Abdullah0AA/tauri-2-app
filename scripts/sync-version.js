import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Manually define __dirname for ES module compatibility
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const packageJsonPath = path.resolve(__dirname, '../package.json')
const cargoTomlPath = path.resolve(__dirname, '../src-tauri/Cargo.toml')

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
const packageVersion = packageJson.version

if (!packageVersion) {
  console.error('❌ Error: package.json does not have a version field.')
  process.exit(1)
}

// Read Cargo.toml
let cargoToml = fs.readFileSync(cargoTomlPath, 'utf8')

// Replace version in Cargo.toml
const newCargoToml = cargoToml.replace(
  /version = "(\d+\.\d+\.\d+)"/,
  `version = "${packageVersion}"`
)

// Write updated Cargo.toml
fs.writeFileSync(cargoTomlPath, newCargoToml)
console.log(`✅ Synced version to Cargo.toml: ${packageVersion}`)
