import { TextField, Button } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function SearchForm() {

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
        <form onSubmit={handleSubmit(handleSearch)}>
            <TextField 
                label="usuario/repo"
                variant="outlined"
                size="small"
                {...register("repositorio")}
                error={!!errors.repositorio}
                helperText={errors.repositorio?.message}
            />
            <Button type="submit" variant="contained" color="primary">Pesquisar</Button>
        </form>
    );
}

export default SearchForm;