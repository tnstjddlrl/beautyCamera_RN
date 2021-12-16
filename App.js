import React, { Suspense, useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  BackHandler,
  Alert
} from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import takePicture from './src/takePicture';
import { RecoilRoot } from 'recoil';
import viewPicture from './src/viewPicture';
import loading from './src/loading';
import Login from './src/login';

const Stack = createStackNavigator();


export default APP = () => {
  return (
    <RecoilRoot>
      <Suspense fallback={<View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}><Text>로딩중...</Text></View>}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="로딩" component={loading} />
            <Stack.Screen name="로그인" component={Login} />
            <Stack.Screen name="사진보기" component={viewPicture} />
            <Stack.Screen name="사진찍기" component={takePicture} />
          </Stack.Navigator>
        </NavigationContainer>
      </Suspense>
    </RecoilRoot>
  )
}