import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NovoProjeto(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const inovadorId = localStorage.getItem('inovadorId');

    async function handleNovoProjeto(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        }

        try{
            await api.post('projetos', data, {
                headers: {
                    Authorization: inovadorId,
                }
            })

            history.push('/profile');
        }catch(err){
            alert('Erro ao cadastrar o caso, tente novamente.');
        }

    }

    return (
        <div className="novo-projeto-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Seja um Inovador" />
                    
                    <h1>Cadastrar novo projeto</h1>
                    <p>Descreva o projeto detalhadamente para encontrar um investidor.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNovoProjeto}>
                    <input 
                        placeholder="Titulo do projeto" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição" 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em reais" 
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    
                    <button className="button" type="submit">Cadastrar</button>                    
                </form>
            </div>
        </div>
    )
}