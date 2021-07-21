import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const useStyle = makeStyles(theme => ({
    root: {
        width: "100%",
        height: "100vh",
        textAlign: "center",
        marginTop: 100 
    },
    input: {
        width: 300,
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

    const schema = yup.object().shape({
        repositorio: yup.string().required("Campo obrigatório")
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({resolver: yupResolver(schema)});

    function handleSearch(data) {
        console.log(data);
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