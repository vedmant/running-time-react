export function hasProperty(configuration, property) {
    const parts = property.split('.');
    let currentObj = configuration;
    for (let i = 0; i < parts.length; i += 1) {
        const part = parts[i];
        if (!(part in currentObj)) {
            return false;
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        currentObj = currentObj[part];
    }
    return true;
}
