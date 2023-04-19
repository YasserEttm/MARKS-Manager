import NavbarProf from './NavbarProf.js'
import logo from '../Assets/logo.png'
import './Home.css'
import { useContext } from 'react';
import { UserContext } from './UserContext.js';

function Home(){
    const logger = useContext(UserContext);
    console.log("im in HOME PROF ", logger);
    let name = logger.user.nom+ " " + logger.user.prenom;
    name = name.toUpperCase();

    return(
            <div className='homeStyle'>
                <NavbarProf />
                <div className='d-flex align-items-center justify-content-center welcome'>
                    WELCOME HOME <h3><span className='badge badge-primary mt-2 ml-4'>{name}</span></h3>
                </div>
                <div className='d-flex justify-content-center'>
                    <img className="img-fluid mt-5" src={logo} alt="Logo ENSA KHOURIBGA" height={300} width={700}/>
                </div>

            </div>
            
    );
}

export default Home;