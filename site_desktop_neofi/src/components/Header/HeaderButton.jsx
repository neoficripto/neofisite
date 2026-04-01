// EXPANDIR PARA CRIAR FUNCIONALIDADE
import style from './HeaderButton.module.css';

export default function HeaderButton({texto}){

    return (
        <p className={style.textoBotao}>{texto}</p>
    );
}