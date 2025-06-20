module.exports = {
    register: (program) => {
        program
            .command('build-docs', { isDefault: true })
            .alias('bd')
            .description('Build the documentation')
            .summary('Build the documentation for the project')
            .argument('[<patterns...>]', 'Patterns to match files for documentation generation')
            .option('-v, --verbose', 'Enable verbose output')
            .action((patterns, options) => {
                // Command logic here
                console.log('Building documentation...');
                if (options.verbose) {
                    console.log('Verbose mode enabled');
                }
                console.log('Patterns:', patterns);
            });
    }
};