import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile(){
    const [projetos, setProjetos] = useState([]);

    const history = useHistory();

    const inovadorId = localStorage.getItem('inovadorId');
    const inovadorName = localStorage.getItem('inovadorName');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: inovadorId,
            }
        }).then(response =>{
            setProjetos(response.data);
        })
    }, [inovadorId]);

    async function handleDeleteProjeto(id){
        try{
            await api.delete(`projetos/${id}`, {
                headers: {
                    Authorization: inovadorId,
                }
            });

            setProjetos(projetos.filter(projeto => projeto.id !== id));
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Seja um Inovador" />
                <span>Bem vindo, {inovadorName}</span>

                <Link className="button" to="/projetos/novo">Cadastrar novo Projeto</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Projetos cadastrados</h1>

            <ul>
                {projetos.map(projeto => (
                    <li key={projeto.id}>
                        <strong>PROJETO:</strong>
                        <p>{projeto.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{projeto.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(projeto.value)}</p>

                        <button onClick={() => handleDeleteProjeto(projeto.id)} type="button">
                            <FiTrash2 size={20} color="a8a8b3"/>
                        </button>
                    </li>     
                ))}           
            </ul>
        </div>
    );
}