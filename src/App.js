import SearchForm from './components/SearchForm';
import Img from './assets/images/icon-github.png';
import styled from 'styled-components';

function App() {
    const Div = styled.div`
        header {
            display: flex;
            align-items: center;
            padding: 20px;
            color: #161B22;
        }
        .imgLogo {
            width: 40px;
            margin-right: 10px;
        }
        
    `
    return(
        <Div>
            <header>
                <img className="imgLogo" src={Img} alt="Github Icon"></img>
                <h1>Github Repositórios</h1>
            </header>

            <SearchForm />
        </Div>
    );
}

export default App;