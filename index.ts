import { setTimeout } from 'node:timers/promises';
import * as p from '@clack/prompts';
import color from 'picocolors';

const templates = {
    fabric: 'Fabric Only Template',
    'multi-loader-branches': 'Multi-loader Template (using branches)',
    'multi-loader-flat': 'Multi-loader Template (with flat structure)',
    'multi-loader-modstitch': 'Multi-loader Template (with Modstitch)',
    'multi-loader-sinytra': 'Multi-loader Template (with Sinytra Connector)',
}

function onCancel() {
    p.cancel('Operation cancelled.');
    process.exit(0);
}

async function main() {
    const spin = p.spinner();
    console.clear();

    await setTimeout(1000);

    p.intro(`${color.bgCyan(color.black(' create-stonecutter-mod '))}`);

    const metadata = await p.group({
        path: () => p.text({
            message: 'Where should we create your project?',
            placeholder: './sparkling-solid',
            validate: (value) => {
                if (!value) return 'Please enter a path.';
                if (value[0] !== '.') return 'Please enter a relative path.';
            },
        }),
        name: () => p.text({
            message: 'What is your mod\'s name?',
            placeholder: 'My Mod',
            validate: (value) => {
                if (!value || value.length === 0) return 'Name is required';
                if (value.length < 2) return 'Name must be at least 2 characters';
            },
        }),
        packagePath: ({ results }) => p.text({
            message: 'What is your mod\'s package path?',
            placeholder: results.name ? `com.example.${results.name.toLowerCase().replace(/\s+/g, '_')}` : 'com.example.mymod',
            validate: (value) => {
                if (!value || value.length === 0) return 'Package path is required';
                if (!/^[a-z]+(\.[a-z][a-z0-9_]*)+$/.test(value)) return 'Invalid package path format';
            },
        }),
        template: () => p.select({
            message: 'Select the desired template:',
            initialValue: 'fabric',
            options: Object.entries(templates).map(([value, label]) => ({ value, label })),
        })
    }, { onCancel });

    spin.start('Loading compatible versions...');
    await setTimeout(2000);
    spin.stop('Versions loaded.');

    const dependencies = await p.group({
        version: () => p.autocompleteMultiselect({
            message: 'Select the Minecraft versions to support:',
            options: [
                { value: '1.21.10', label: '1.21.10' },
                { value: '1.21.1', label: '1.21.1' },
                { value: '1.20.1', label: '1.20.1' },
                { value: '1.19.4', label: '1.19.4' },
            ],
            placeholder: 'Type to search...',
            maxItems: 5,
        }),
        wantsFabricAPI: () => p.confirm({
            message: 'Do you want to include Fabric API as a dependency?',
            initialValue: true,
        }),
    }, { onCancel });

    const summaryLines = [
        color.dim('Summary of your selections:'),
        `${color.bold('Project Path:')} ${metadata.path}`,
        `${color.bold('Mod Name:')} ${metadata.name}`,
        `${color.bold('Package Path:')} ${metadata.packagePath}`,
        `${color.bold('Chosen Template:')} ${metadata.template}`,
        `${color.bold('Minecraft Versions:')} ${dependencies.version.join(', ')}`,
        `${color.bold('Include Fabric API:')} ${dependencies.wantsFabricAPI ? 'Yes' : 'No'}`,
    ];

    const summary = summaryLines.join('\n');
    p.note(summary);

    const confirm = await p.confirm({
        message: 'Does everything look correct?',
        initialValue: true,
    });

    if (!confirm) {
        onCancel();
    }

    spin.start('Generating mod scaffold...');
    await setTimeout(3000);
    spin.stop('Mod scaffold generated successfully.');

    p.outro(`${color.bgGreen(color.black(' Success! '))} Your mod has been created.`);
}

main().catch(console.error);