import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import { useState } from 'react';
import UserCard from '../UserCard';

const useStyle = makeStyles(theme => ({
    root: {
        width: "100%",
        textAlign: "center",
        marginTop: 50 
    },
    input: {
        width: 300,
        backgroundColor: 'white'
    },
    button: {
        fontSize: 12,
        height: 40,
        marginLeft: -10,
        borderRadius: 0,
    }
}));

function SearchForm() {
    const classes = useStyle();
    const [user, setUser] = useState([]);
    const [search, setSearch] = useState(false); // monitora o clique do botão

    const schema = yup.object().shape({
        repositorio: yup.string().required("Campo obrigatório")
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({resolver: yupResolver(schema)});

    function handleSearch(data) {
        data = data['repositorio'].split('/');
        axios.get(`https://api.github.com/repos/${data[0]}/${data[1]}`)
        .then(response => {
            reset();
            setUser([...user, response.data]);
            setSearch(true);
        }).catch(e => {
            console.log(e)
            if(e.response.status === 404) {
                   alert("Repositório não encontrado!")
            }
        })
    }
    
    return(
        <>
            <form onSubmit={handleSubmit(handleSearch)} className={classes.root}>
                <TextField 
                    label="usuario/repositorio"
                    variant="outlined"
                    size="small"
                    {...register("repositorio")}
                    error={!!errors.repositorio}
                    helperText={errors.repositorio?.message}
                    className={classes.input}
                />
                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    className={classes.button}>Pesquisar</Button>
            </form>
            
            { search && user.map(element => <UserCard data={element} />) }
        </>
    );
}

export default SearchForm;