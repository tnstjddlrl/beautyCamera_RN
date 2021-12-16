import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useRecoilState } from 'recoil';
import { pid } from '../atoms/atom';

export default Loading = ({ navigation }) => {
    const [atid, setAtid] = useRecoilState(pid);

    useEffect(() => {
        if (atid != 'first') {
            navigation.navigate('사진보기')
        } else {
            navigation.navigate('로그인')
        }
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

        </SafeAreaView>
    )
}