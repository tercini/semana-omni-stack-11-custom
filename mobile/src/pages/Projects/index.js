import React, {useState, useEffect} from 'react';
import { Feather } from '@expo/vector-icons';
import {useNavigation}  from '@react-navigation/native';
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png'

import styles from './styles';

export default function Projects(){
    const [projetos, setProjetos] = useState([]);
    const [total, setTotal] = useState(0);

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation =  useNavigation();

    function navigateToDetail(project){
        navigation.navigate('Detail', {project});
    }

    async function loadProjects(){
        if(loading){
            return;
        }

        if(total > 0 && projetos.length == total){
            return;
        }

        setLoading(true);

        const response = await api.get('projetos', {
            params: { page }
        });

        setProjetos([... projetos, ... response.data]);
        setTotal(response.headers['x-total-count'])
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() =>{
        loadProjects();
    }, []);

    return (
        <View style={styles.container} >
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} projetos</Text>                    
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos projetos abaixo e salve o dia</Text>

            <FlatList                 
                data={projetos} 
                style={styles.projectList}
                keyExtractor={project => String(project.id)}
                //showsVerticalScrollIndicator={false}
                onEndReached={loadProjects}
                onEndReachedThreshold={0.2}
                renderItem={({item: project}) => (
                    <View style={styles.project}>
                        <Text style={styles.projectProperty}>Inovador:</Text>
                        <Text style={styles.projectValue}>{project.name}</Text>
                        
                        <Text style={styles.projectProperty}>Projeto:</Text>
                        <Text style={styles.projectValue}>{project.title}</Text>

                        <Text style={styles.projectProperty}>Valor:</Text>
                        <Text style={styles.projectValue}>
                            {Intl.NumberFormat('pt-BR', { 
                                style: 'currency', 
                                currency: 'BRL'
                            }).format(project.value)}
                        </Text>

                        <TouchableOpacity 
                        style={styles.detailsButton}
                        onPress={ () => navigateToDetail(project)} 
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041"/>
                        </TouchableOpacity>
                    </View>
                )}
            />            
        </View>
    );
}