import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import {View, Text, Image,  TouchableOpacity, Linking} from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png'

import styles from '../Detail/styles';

export default function Detail(){
    const navigation = useNavigation();
    const route = useRoute();

    const project = route.params.project;
    const message = `Olá ${project.name}, estou entrando em contato pois gostaria de ajudar no projeto ${project.title} com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(project.value)}`;

    function navigateBack(){
        navigation.goBack();
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: `Herói do projeto: ${project.title}}`,
            recipients: [project.email],
            body: message,
        });
    }

    function sendWhatsApp(){
        Linking.openURL(`whatsapp://send?phone=${project.whatsapp}&text=${message}`);        
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E82041" />
                </TouchableOpacity>
            </View>

            <View style={styles.project}>
                <Text style={[styles.projectProperty, {marginTop: 0}]}>Inovador:</Text>
                <Text style={styles.projectValue}>{project.name} de {project.city}/{project.uf}</Text>    

                <Text style={styles.projectProperty}>Projeto:</Text>
                <Text style={styles.projectValue}>{project.title}</Text>

                <Text style={styles.projectProperty}>Valor:</Text>
                <Text style={styles.projectValue}>
                    {Intl.NumberFormat('pt-BR', { 
                        style: 'currency', 
                        currency: 'BRL'
                    }).format(project.value)}
                </Text>                        
            </View>

            <View style={styles.contactBox}>
                    <Text style={styles.heroTitle}>Salve o dia!</Text>
                    <Text style={styles.heroTitle}>Seja o herói desse projeto.</Text>

                    <Text style={styles.heroDescription}>Entre em contato:</Text>

                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                            <Text style={styles.actionText}>WhatsApp</Text>
                        </TouchableOpacity>
                    
                        <TouchableOpacity style={styles.action} onPress={sendMail}>
                            <Text style={styles.actionText}>E-mail</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </View>

    );
}