import { config } from '@/theme/_config';
import { hasProperty } from '@/types/guards/theme';
export default (variant) => {
    const { variants, ...defaultConfig } = config;
    const variantConfig = variant !== 'default' ? variants[variant] : null;
    const fontColors = {
        ...defaultConfig.fonts.colors,
        ...(variantConfig && hasProperty(variantConfig, 'fonts.colors')
            ? variantConfig.fonts.colors
            : {}),
    };
    const backgroundColors = {
        ...defaultConfig.backgrounds,
        ...(variantConfig && hasProperty(variantConfig, 'backgrounds')
            ? variantConfig.backgrounds
            : {}),
    };
    const borderColors = {
        ...defaultConfig.borders.colors,
        ...(variantConfig && hasProperty(variantConfig, 'borders.colors')
            ? variantConfig.borders.colors
            : {}),
    };
    const navigationColors = {
        ...defaultConfig.navigationColors,
        ...(variantConfig && hasProperty(variantConfig, 'navigationColors')
            ? variantConfig.navigationColors
            : {}),
    };
    const colors = {
        ...fontColors,
        ...backgroundColors,
        ...borderColors,
        ...navigationColors,
    };
    return {
        colors,
        fonts: {
            sizes: defaultConfig.fonts.sizes,
            colors: fontColors,
        },
        gutters: defaultConfig.gutters,
        backgrounds: backgroundColors,
        borders: {
            widths: defaultConfig.borders.widths,
            radius: defaultConfig.borders.radius,
            colors: borderColors,
        },
        navigationColors,
    };
};
