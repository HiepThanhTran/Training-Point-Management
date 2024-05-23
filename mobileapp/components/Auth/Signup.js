import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Keyboard, TouchableOpacity, View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import APIs, { endPoints } from '../../configs/APIs';
import GlobalStyle from '../../styles/Style';
import AuthStyle from './Style';

const Signup = () => {
    const [account, setAccount] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const fields = [
        {
            label: 'Mã số sinh viên',
            name: 'code',
            icon: 'badge-account',
            keyboardType: 'numeric',
        },
        {
            label: 'Email',
            name: 'email',
            icon: 'email',
            keyboardType: 'email-address',
        },
        {
            label: 'Mật khẩu',
            name: 'password',
            secureTextEntry: !passwordVisible,
            icon: passwordVisible ? 'eye-off' : 'eye',
        },
        {
            label: 'Xác nhận mật khẩu',
            name: 'confirm',
            secureTextEntry: !passwordVisible,
            icon: passwordVisible ? 'eye-off' : 'eye',
        },
    ];

    const signup = async () => {
        const errorMsgs = [
            { name: 'code', errorMsg: 'Mã số sinh viên không được trống' },
            { name: 'email', errorMsg: 'Email không được trống' },
            { name: 'password', errorMsg: 'Mật khẩu không được trống' },
            { name: 'confirm', errorMsg: 'Vui lòng xác nhận mật khẩu!' },
        ];

        for (let msg of errorMsgs) {
            if (!account[msg.name]) {
                setErrorVisible(true);
                setErrorMsg(msg.errorMsg);
                return;
            }
        }

        if (account['password'] !== account['confirm']) {
            setErrorVisible(true);
            setErrorMsg('Mật khẩu không khớp');
            return;
        }

        let form = new FormData();
        for (let key in account) if (key !== 'confirm') form.append(key, account[key]);

        setErrorMsg('');
        setLoading(true);
        setErrorVisible(false);
        try {
            let res = await APIs.post(endPoints['student-register'], form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.status === 201) navigation.navigate('Signin');
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                setErrorVisible(true);
                setErrorMsg(ex.response.data.detail);
            } else console.error(ex);
        } finally {
            setLoading(false);
        }
    };

    const updateAccount = (field, value) => {
        setAccount((current) => {
            return { ...current, [field]: value };
        });
    };

    const navigation = useNavigation();
    return (
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => Keyboard.dismiss()}>
            <View style={AuthStyle.Container}>
                <LinearGradient colors={['rgba(62,154,228,1)', 'rgba(62,154,228,0.8)']} style={{ flex: 1 }}>
                    <View style={AuthStyle.Header}>
                        <Text style={[AuthStyle.HeaderTitle, GlobalStyle.Bold]}>Đăng ký</Text>
                        <Text style={[AuthStyle.SubTitle, GlobalStyle.Bold]}>
                            Đăng ký để sử dụng hệ thống điểm rèn luyện sinh viên
                        </Text>
                    </View>

                    <View style={AuthStyle.Form}>
                        <HelperText type="error" visible={errorVisible} style={GlobalStyle.HelpText}>
                            {errorMsg}
                        </HelperText>
                        {fields.map((f) => (
                            <TextInput
                                key={f.name}
                                value={account[f.name]}
                                placeholder={f.label}
                                style={AuthStyle.Input}
                                keyboardType={f.keyboardType}
                                secureTextEntry={f.secureTextEntry}
                                cursorColor="#3e9ae4"
                                underlineColor="transparent"
                                activeUnderlineColor="transparent"
                                onChangeText={(value) => updateAccount(f.name, value)}
                                right={
                                    <TextInput.Icon
                                        icon={f.icon}
                                        onPress={
                                            f.name === 'password' || 'confirm'
                                                ? () => setPasswordVisible(!passwordVisible)
                                                : null
                                        }
                                    />
                                }
                            />
                        ))}

                        <Button
                            loading={loading}
                            icon="account"
                            textColor="white"
                            style={AuthStyle.Button}
                            onPress={signup}
                        >
                            <Text variant="headlineLarge" style={[AuthStyle.ButtonText, GlobalStyle.Bold]}>
                                Đăng ký
                            </Text>
                        </Button>

                        <View style={AuthStyle.Footer}>
                            <Text style={GlobalStyle.Bold}>Đã có tài khoản?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                                <Text style={[GlobalStyle.Bold, { color: '#1873bc' }, { marginLeft: 5 }]}>
                                    Đăng nhập
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        </TouchableOpacity>
    );
};

export default Signup;