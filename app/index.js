import React, { useState } from 'react';
import { StatusBar, Text } from 'react-native';

const MyButton = () => {
    const [apiStatus, setApiStatus] = useState('未测试');
    const [isLoading, setIsLoading] = useState(false);
    const [lastResult, setLastResult] = useState('');
    
    // API配置
    const apiBaseUrl = 'http://192.1.1.253:5000';
    const loginEndpoint = '/users/authenticate';

    // API连接测试函数
    const testApiConnection = async () => {
        setIsLoading(true);
        setApiStatus('测试中...');
        setLastResult('');
        
        // 定义一系列可能的测试凭据
        const testCredentials = [
            { username: 'cmengjin', password: 'hsonline' },
            { username: 'cmengjin', password: 'password' },
            { username: 'cmengjin', password: 'hs2023' },
            { username: 'khwong', password: 'password' },
            { username: 'eunice', password: 'password' }
        ];
        
        console.log('开始API连接测试...');
        
        // 组装完整API URL
        const apiUrl = apiBaseUrl + loginEndpoint;
        
        console.log(`尝试API地址: ${apiUrl}`);
        setApiStatus(`测试中: ${apiUrl}`);
    };

    return (
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
    );
};

export default MyButton;