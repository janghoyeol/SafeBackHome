import 'react-native-url-polyfill/auto';
import {Link, useRouter} from 'expo-router';
import {View, Pressable, Text} from 'react-native';

const LoginPage = () => {
    const router = useRouter();

    const handleLogin = () => {
        router.replace('listen')
    }

    return (
        <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Pressable onPress = {handleLogin}>
                <Text>listen</Text>
            </Pressable>

            <Link href = "/HomeScreen" asChild>
                <Text>HomeScreen</Text>
            </Link>

            <Link href = "/gpt" asChild>
                <Text>Go Gpt</Text>
            </Link>

            <Link href = "/song" asChild>
                <Text>Song</Text>
            </Link>

            <Link href = "/log" asChild>
                <Text>Login</Text>
            </Link>
        </View>
    );
}

export default LoginPage