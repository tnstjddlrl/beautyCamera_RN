import React, { useEffect, useRef, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Dimensions,
    TouchableWithoutFeedback,
    TouchableOpacity,
    BackHandler
} from 'react-native';

import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';
import AutoHeightImage from 'react-native-auto-height-image';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { pid } from '../atoms/atom';

const chwidth = Dimensions.get('screen').width
const chheight = Dimensions.get('screen').height

const cameras = require('../img/camera.png')
const back = require('../img/back.png')

export default TakePicture = () => {

    const [base, setBase] = useState('')
    const [date, setDate] = useState(new Date)
    const [dateString, setDateString] = useState('')
    const [atid, setAtid] = useRecoilState(pid);

    const camera = useRef()
    const navigation = useNavigation()

    useEffect(() => {
        setDateString(date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate())
        console.log(date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate());
    }, [])

    const backAction = () => {
        navigation.goBack()
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);

    const takePicture = async function (camera) {
        const options = { quality: 0.5, base64: true, width: 800, fixOrientation: true };
        const data = await camera.takePictureAsync(options);
        // setBase(data.base64)
        // console.log(data.base64);
        imgpost(data.base64)
        // imgpost(data.base64);
        // setTimeout(() => {
        //   navigation.navigate('제품위치')
        // }, 300);
    };

    function imgpost(img) {
        try {
            axios.post('https://ip0154.cafe24.com/restapi/post.php', {
                type: 'new_inside_picture',
                img: img,
                id: atid,
                imgdate: dateString,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(async (res) => {
                console.log(res.data)
                setTimeout(() => {
                    navigation.navigate('사진보기')
                }, 1500);
            }).catch((res) => {
                console.log(res);
            })
        } catch (error) {
            console.error(error)
        }
    }



    return (
        <SafeAreaView style={{ width: '100%', height: '100%', alignItems: "center", backgroundColor: 'white' }}>
            <RNCamera
                ref={camera}
                style={{ width: chwidth, height: '100%', alignSelf: "center", backgroundColor: 'white' }}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.auto}
                androidCameraPermissionOptions={{
                    title: '카메라 사용',
                    message: '카메라 권한이 필요합니다!',
                    buttonPositive: '확인',
                    buttonNegative: '취소',
                }}>
                {({ camera, status, recordAudioPermissionStatus }) => {
                    if (status !== 'READY') return <PendingView />;
                    return (
                        <View style={{ alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
                            <TouchableOpacity onPress={() => takePicture(camera)} style={styles.capture}>
                                <AutoHeightImage source={cameras} width={110}></AutoHeightImage>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            </RNCamera>

            {/* 헤더 시작 */}
            <View style={{ width: '100%', height: 60, justifyContent: 'center', position: 'absolute', backgroundColor: 'rgba(51, 51, 51,0.6)' }}>

                <View style={{ marginLeft: 20, width: chwidth - 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    {/* < 시작 */}
                    <TouchableWithoutFeedback onPress={() => { console.log('뒤클릭'), navigation.goBack() }}>
                        <View style={{ width: 40, height: 40, borderRadius: 25, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', }}>
                            <AutoHeightImage source={back} width={30}></AutoHeightImage>
                        </View>
                    </TouchableWithoutFeedback>
                    {/* < 끝 */}

                    <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>내부 사진을 찍어주세요</Text>

                    <View style={{ width: 40, height: 40 }}>
                    </View>

                </View>
            </View>
            {/* 헤더 끝 */}

        </SafeAreaView>
    )
}

const PendingView = () => (
    <View
        style={{
            flex: 1,
            backgroundColor: 'lightgreen',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
        <Text>Waiting</Text>
    </View>
);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        width: 60,
        height: 60,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: 'white',
        opacity: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },
});