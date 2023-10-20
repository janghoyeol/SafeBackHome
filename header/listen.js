import {useRouter} from 'expo-router';
import {View, Text} from 'react-native';

const ListenPage = () => {
    const router = useRouter();

    return (
        <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>LoginScreen</Text>
        </View>
    );
}

export default ListenPage