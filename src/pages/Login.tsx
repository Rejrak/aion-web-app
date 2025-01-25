import { useState} from "react";
import { getUserById, logoutUser } from "../services/firebaseAuth";
import { hashPassword, verifyPassword } from "../utils/CryptoUtils";
import { useNavigate } from "react-router-dom";
import { User } from "../interfaces/User";
import styled from "styled-components";
import { useUser } from "../context/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const AuthContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  background: #1B1E1F;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
  border-radius: 8px;
  text-align: center;
  font-family: Arial, sans-serif;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  background: #121212;
  color: #fff;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  border-color: #333;
  font-size: 16px;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 10px 0;
`;

const AdminCheckbox = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  margin: 10px 0;
  cursor: pointer;

  input {
    margin-right: 10px;
  }
`;

const Button = styled.button<{ logout?: boolean }>`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  color: #fff;
  background: ${(props) => (props.logout ? "#dc3545" : "#007bff")};
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover {
    background: ${(props) => (props.logout ? "#a71d2a" : "#0056b3")};
  }
`;

const EyeIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #aaa;

  &:hover {
    color: #fff;
  }
`;

const Message = styled.p<{ error?: boolean }>`
  color: ${(props) => (props.error ? "red" : "green")};
  font-size: 14px;
`;

interface LoginPageProps {
  onClick?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onClick }) => {
  const navigate = useNavigate();
  const { loginUserContext, logoutUserContext, user } = useUser();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const checkRequiredCredential = (): boolean => {
    if (!email) {
      setError("La mail è obbligatoria.");
      return false;
    }
    if (isAdmin && !password) {
      setError("La password è obbligatoria per gli amministratori.");
      return false;
    }
    return true;
  };
  
  const checkAdminPassword = (userPassword: string): boolean => {
    const hashedPassword = hashPassword(password);
    if (!verifyPassword(userPassword, hashedPassword)) {
      setError("Credenziali errate.");
      return false;
    }
    return true;
  };

  const checkUserRoleCredential = (userLogged: User): boolean => {
    if (!userLogged) {
      setError("Utente non trovato.");
      return false;
    }
    if (isAdmin && !userLogged.admin) {
      setError("Non sei un amministratore.");
      return false;
    }
    if (password === "" && userLogged.admin) {
      setError("Spunta la checkbox amministratore ed inserisci la password.");
      return false;
    }

    return true;
  };
  
  const handleSignIn = async () => {
    setError(null);

    if (!checkRequiredCredential()) return;

    try {
      const userLogged = await getUserById(email);
      const isStandardUser = !isAdmin && !userLogged.admin;

      if (isStandardUser) {
        loginUserContext(userLogged);
        navigate("/");
        return true;
      }
      
      if (!checkUserRoleCredential(userLogged)) return;
      if (!checkAdminPassword(userLogged.password)) return;
      if (userLogged !== null) {
        loginUserContext(userLogged);
      }
    } catch (error) {
      setError("Errore durante il login. Verifica le credenziali.");
    } 
    
    navigate("/");
  };

  const handleLogout = async () => {
    logoutUserContext();
    await logoutUser();
  };

  const passowrdComponent: JSX.Element = (
    <InputContainer>
      <Input type={showPassword ? "text" : "password"} placeholder="Inserisci la tua password" value={password} onChange={(e) => setPassword(e.target.value)} required={isAdmin}/>
      <EyeIcon icon={showPassword ? faEyeSlash : faEye} onClick={togglePasswordVisibility} />
    </InputContainer>
  );

  return (
    <div onMouseDown={onClick}>
    <AuthContainer>
      <h2>Gestione Autenticazione</h2>

      <Input type="text" placeholder="Inserisci il tuo nome utente" value={email} onChange={(e) => setEmail(e.target.value)} required={true}/>

      <AdminCheckbox>
        <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}/> Sono un amministratore
      </AdminCheckbox>

      {isAdmin &&  passowrdComponent }

      {error && <Message error>{error}</Message>}

      <Button onClick={handleSignIn}>Accedi</Button>
      <Button logout onClick={handleLogout}>Esci</Button>
    </AuthContainer>
    </div>
  );
};

export default LoginPage;
