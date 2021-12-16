import {
    atom,
} from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncSetUserId = async (value) => {
    try {
        await AsyncStorage.setItem('@user_id', value)
    } catch (e) {
        console.log(e)
    }
}

const AsyncGetUserId = async () => {
    try {
        const value = await AsyncStorage.getItem('@user_id')
        if (value !== null) {
            return value
        } else {
            return 'first'
        }
    } catch (e) {
        console.log(e)
    }
}

export const pid = atom({
    key: 'pid',
    default: AsyncGetUserId(),
});