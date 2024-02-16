import { config } from '@/theme/_config';
export const generateGutters = () => {
    return config.gutters.reduce((acc, curr) => {
        return Object.assign(acc, {
            [`margin_${curr}`]: {
                margin: curr,
            },
            [`marginBottom_${curr}`]: {
                marginBottom: curr,
            },
            [`marginTop_${curr}`]: {
                marginTop: curr,
            },
            [`marginRight_${curr}`]: {
                marginRight: curr,
            },
            [`marginLeft_${curr}`]: {
                marginLeft: curr,
            },
            [`marginVertical_${curr}`]: {
                marginVertical: curr,
            },
            [`marginHorizontal_${curr}`]: {
                marginHorizontal: curr,
            },
            [`padding_${curr}`]: {
                padding: curr,
            },
            [`paddingBottom_${curr}`]: {
                paddingBottom: curr,
            },
            [`paddingTop_${curr}`]: {
                paddingTop: curr,
            },
            [`paddingRight_${curr}`]: {
                paddingRight: curr,
            },
            [`paddingLeft_${curr}`]: {
                paddingLeft: curr,
            },
            [`paddingVertical_${curr}`]: {
                paddingVertical: curr,
            },
            [`paddingHorizontal_${curr}`]: {
                paddingHorizontal: curr,
            },
        });
    }, {});
};
export const staticGutterStyles = {};
