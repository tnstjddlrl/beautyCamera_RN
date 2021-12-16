import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import {
    Alert,
    View,
    BackHandler,
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    Text,
    Dimensions,
    TouchableWithoutFeedback,
    StyleSheet,
    Image,
    TextInput,
} from 'react-native';

if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { pid } from '../atoms/atom';

const chwidth = Dimensions.get('window').width

const check_img = require('../img/light/check.png')
const loca_img = require('../img/light/location_icon.png')
const back = require('../img/light/back.png')


const Login = () => {

    const navigation = useNavigation()

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

    const [id, setid] = useState('');
    const [pwd, setpwd] = useState('');

    const [atid, setAtid] = useRecoilState(pid);

    const storeDark = async (value) => {
        try {
            await AsyncStorage.setItem('@is_dark', value)
        } catch (e) {
            console.log(e)
        }
    }

    const request = async () => {
        console.log(id + pwd)
        await axios.get('https://ip0154.cafe24.com/restapi/index.php', {
            params: {
                type: 'login',
                id: id,
                pw: pwd
            },
            data: undefined
        }).catch((err) => {
            console.log(err)
        }).then(async (res) => {
            console.log({ res })
            console.log('리턴 : ' + res.data)
            if (res.data == 'login_fail') {
                Alert.alert('아이디 혹은 비밀번호 오류입니다!')
            } else if (res.data == 'login_suc') {
                setAtid(id)
                storeData(id)
                setTimeout(() => {
                    navigation.navigate('사진보기')
                }, 300);
            }

        })
    }

    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('@user_id', value)
        } catch (e) {
            console.log(e)
            Alert.alert('오류가 발생하였습니다.', '앱을 다시 시작해주세요.')

            setTimeout(() => {
                BackHandler.exitApp()
            }, 1500);
        }
    }



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(240,240,240)' }}>

            {/* 헤더 시작 */}
            <View style={{ width: '100%', height: 60, justifyContent: 'center' }}>

                <View style={{ width: chwidth, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 23, color: 'black', fontWeight: 'bold' }}>로그인</Text>
                </View>

            </View>
            {/* 헤더 끝 */}


            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                <Text style={{ fontSize: 18, marginTop: 10 }}>로그인을 진행해 주세요.</Text>
            </View>

            <View style={{ width: chwidth - 40, borderRadius: 15, backgroundColor: 'white', marginLeft: 20, marginTop: 40, elevation: 10, marginBottom: 20 }}>
                <View style={{ width: chwidth - 80, marginLeft: 20, marginTop: 20, justifyContent: 'center' }}>

                    {/* 아이디 */}
                    <Text style={{ fontSize: 18, marginTop: 10, color: 'black' }}>아이디</Text>
                    <View style={{ borderWidth: 1, borderColor: 'rgb(204,204,204)', height: 40, marginTop: 10, borderRadius: 3 }}>
                        <TextInput onChangeText={setid} value={id} style={{ height: 40, width: chwidth - 100, marginLeft: 10, color: 'black' }} placeholder={'아이디를 입력해주세요.'}></TextInput>
                    </View>

                    {/* 아이디끝 */}

                    {/* 비밀번호 */}
                    <Text style={{ fontSize: 18, marginTop: 20 }}>비밀번호</Text>
                    <View style={{ borderWidth: 1, borderColor: 'rgb(204,204,204)', height: 40, marginTop: 10, borderRadius: 3, marginBottom: 30 }}>
                        <TextInput textContentType={'password'} secureTextEntry={true} onChangeText={setpwd} value={pwd} style={{ height: 40, width: chwidth - 100, marginLeft: 10, color: 'black' }} placeholder={'비밀번호를 입력해주세요.'}></TextInput>
                    </View>

                    {/* 비밀번호끝 */}

                </View>
            </View>


            {/* 하단 버튼 시작 */}
            <View style={{ width: chwidth - 40, marginLeft: 20, height: 90, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                {/* <TouchableWithoutFeedback onPress={() => { navigation.navigate('회원가입') }}>
                    <View style={{ borderRadius: 10, borderWidth: 1, borderColor: 'rgb(30,40,245)', backgroundColor: 'white', width: chwidth / 2 - 30, height: 60, alignItems: 'center', justifyContent: 'center', elevation: 10, }}>
                        <Text style={{ fontSize: 23, color: 'rgb(30,40,245)', fontWeight: 'bold' }}>회원가입</Text>
                    </View>
                </TouchableWithoutFeedback> */}

                {/* 파랑버튼 */}
                <TouchableWithoutFeedback onPress={() => { request() }}>
                    <View style={{ borderRadius: 10, backgroundColor: 'rgb(30,40,245)', width: chwidth - 40, height: 60, alignItems: 'center', justifyContent: 'center', elevation: 10, }}>
                        <Text style={{ fontSize: 23, color: 'white', fontWeight: 'bold' }}>로그인</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>

            {/* 하단 버튼 끝 */}

        </SafeAreaView>
    )
}

export default Login