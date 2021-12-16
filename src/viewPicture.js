import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, BackHandler, Dimensions, SafeAreaView, Text, View } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useRecoilState } from 'recoil';
import { pid } from '../atoms/atom';

const chwidth = Dimensions.get('screen').width
const chheight = Dimensions.get('screen').height


const cameras = require('../img/camera.png')
const back = require('../img/back.png')


export default ViewPicture = () => {
    const navigation = useNavigation()
    const [uri, setUri] = useState('https://ip0154.cafe24.com/insideimg/test1/insideimg.png')
    const [atid, setAtid] = useRecoilState(pid);


    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log(atid)
            setUri(`https://ip0154.cafe24.com/insideimg/${atid}/insideimg.png`)
            setUri(`https://ip0154.cafe24.com/insideimg/${atid}/insideimg.png?random=${Math.random().toString(36).substring(7)}`)
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    const backAction = () => {
        Alert.alert("앱 종료", "앱을 종료하시겠습니까?", [
            {
                text: "취소",
                onPress: () => null,
                style: "cancel"
            },
            { text: "종료", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'gray' }}>

            {/* 헤더 시작 */}
            <View style={{ width: '100%', height: 60, justifyContent: 'center', backgroundColor: 'rgba(51, 51, 51, 0.6)' }}>

                <View style={{ marginLeft: 20, width: chwidth - 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    {/* < 시작 */}
                    <TouchableWithoutFeedback onPress={() => { console.log('뒤클릭'), navigation.navigate('사진찍기') }}>
                        <View style={{ width: 40, height: 40, borderRadius: 25, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', }}>
                            <AutoHeightImage source={cameras} width={70}></AutoHeightImage>
                        </View>
                    </TouchableWithoutFeedback>
                    {/* < 끝 */}

                    <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>현재 내부사진</Text>

                    <TouchableWithoutFeedback onPress={() => { navigation.navigate('로그인') }}>
                        <View style={{ height: 40, justifyContent: 'center' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>로그아웃</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

            </View>
            {/* 헤더 끝 */}
            <View style={{ justifyContent: 'center', alignItems: 'center', width: chwidth, position: 'absolute' }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 22, marginTop: chheight / 3 }}>사진을 등록해주세요!</Text>
            </View>
            <AutoHeightImage
                width={chwidth}
                source={{ uri: uri }}>
            </AutoHeightImage>
        </SafeAreaView>
    )
}