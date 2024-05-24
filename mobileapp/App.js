import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import Onboarding from './components/Onboarding/Onboarding'
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import MainTab from './components/Navigations/Tabs';
import useFonts from './configs/Fonts';
import GlobalStyle from './styles/Style';
import BulletinDetail from './components/Activity/BulletinDetail';

const RootStack = createNativeStackNavigator();

export default function App() {
    const fontsLoaded = useFonts();
    return (
        <>
            {!fontsLoaded ? (
                <View style={GlobalStyle.Center}>
                    <ActivityIndicator size="large" color="#3e9ae4" />
                </View>
            ) : (
                <NavigationContainer>
                    <RootStack.Navigator>
                        {/* <RootStack.Screen name="Onboaring" options={{ headerShown: false }} component={Onboarding} /> */}
                        <RootStack.Screen name="MainTab" options={{ headerShown: false }} component={MainTab} />
                        {/* <RootStack.Screen
                            name="Signin"
                            options={{
                                title: 'Đăng nhập',
                                headerShown: false,
                            }}
                            component={Signin}
                        /> */}
                        {/* <RootStack.Screen
                            name="Signup"
                            options={{
                                title: 'Đăng ký',
                                headerShown: false,
                            }}
                            component={Signup}
                        /> */}
                         <RootStack.Screen name="BulletinDetail" options={{ headerShown: false }} component={BulletinDetail} />
                    </RootStack.Navigator>
                </NavigationContainer>
            )}
        </>
    );
}
