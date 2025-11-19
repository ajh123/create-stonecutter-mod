# create-stonecutter-mod

`create-stonecutter-mod` is a **work-in-progress CLI tool** for scaffolding multi-platform, multi-version Minecraft mods using **Stonecutter**. It provides an interactive interface to configure mod metadata, target platforms, supported Minecraft versions, and optional dependencies.

> ⚠️ **Important:** This tool is not yet published on npm and does **not currently generate mod code**. It only collects configuration via the CLI.

For Forge support, it relies on **Sinytra Connector**, allowing mods written for Fabric to be translated to Forge at runtime.

## Planned Features

* Interactive CLI powered by [@clack/prompts](https://www.npmjs.com/package/@clack/prompts)
* Configurable project path, mod name, and package path
* Multi-version Minecraft support
* Optional Fabric API integration
* Target platform selection: Fabric or Forge like (via Sinytra Connector)
* Spinner animations and summary display

## Installation (Local Development)

Since the tool is not published, you can run it locally:

```bash
git clone https://github.com/ajh123/create-stonecutter-mod.git
cd create-stonecutter-mod
npm install
npm run start
```

> You can optionally link it locally for CLI usage:

```bash
npm link
create-stonecutter-mod
```

## Usage

Run the generator:

```bash
npm run start
# or if linked:
create-stonecutter-mod
```

The CLI walks you through:

1. **Project path** – where your mod would be created
2. **Mod name** – the display name of your mod
3. **Package path** – the Java package path for your code
4. **Target platform** – Fabric or Forge (via Sinytra Connector)
5. **Supported Minecraft versions**
6. **Optional Fabric API dependency**

At the end, a summary of your selections is displayed.

> ⚠️ Currently, **no mod files or scaffolds are generated**. File generation is planned for future releases.

## Contributing

Contributions are welcome! To help implement actual mod scaffolding:

1. Fork the repository
2. Create a branch for your feature/fix
3. Submit a pull request with a detailed description

## License

MIT License
