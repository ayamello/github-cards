import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import { useState } from 'react';

const useStyle = makeStyles(theme => ({
    root: {
        width: "100%",
        height: "100vh",
        textAlign: "center",
        marginTop: 100 
    },
    input: {
        width: 300
    },
    button: {
        fontSize: 12,
        height: 40,
        marginLeft: -10,
        borderRadius: 0
    }
}));

function SearchForm() {
    const classes = useStyle();
    const [user, SetUser] = useState({});

    const schema = yup.object().shape({
        repositorio: yup.string().required("Campo obrigatório")
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({resolver: yupResolver(schema)});

    function handleSearch(data) {
        data = data['repositorio'].split('/');
        //console.log(data);
        axios.get(`https://api.github.com/repos/${data[0]}/${data[1]}`)
        .then(response => {
            SetUser(response.data)
        }).catch(e => console.log(e))
    }

    return(
        <form onSubmit={handleSubmit(handleSearch)} className={classes.root}>
            <TextField 
                label="usuario/repo"
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
    );
}

export default SearchForm;