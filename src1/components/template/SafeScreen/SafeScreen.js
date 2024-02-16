import { SafeAreaView, StatusBar } from 'react-native';
import { useTheme } from '@/theme';
function SafeScreen({ children }) {
    const { layout, variant, navigationTheme } = useTheme();
    return (<SafeAreaView style={[
            layout.flex_1,
            { backgroundColor: navigationTheme.colors.background },
        ]}>
			<StatusBar barStyle={variant === 'dark' ? 'light-content' : 'dark-content'}/>
			{children}
		</SafeAreaView>);
}
export default SafeScreen;
