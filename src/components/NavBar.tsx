import { Link } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../context/userContext";

const NavBarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
  padding: 15px 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: 'Arial', sans-serif;
  z-index: 1000;
`;

const NavBrand = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #fff;
  transition: all 0.3s ease-in-out;
  
  a {
    text-decoration: none;
    color: inherit;
    
    &:hover {
      color: #f9f871;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;

  .nav-link {
    font-size: 1.2rem;
    color: #fff;
    text-decoration: none;
    font-weight: 500;
    padding: 8px 20px;
    border-radius: 25px;
    transition: all 0.3s ease-in-out;
    background: rgba(255, 255, 255, 0.2);

    &:hover {
      background: rgba(255, 255, 255, 0.4);
    }
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 500;

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #4facfe;
    border: 2px solid #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  .logout-btn {
    background: #ff4757;
    border: none;
    color: white;
    padding: 8px 15px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease-in-out;
    
    &:hover {
      background: #e84118;
    }
  }
`;

const NavBar = () => {
  const { user, logoutUserContext } = useUser();

  return (
    <NavBarContainer>
      <NavBrand>
        <Link to="/">AionTest</Link>
      </NavBrand>

      <NavLinks>
        <Link to="/" className="nav-link">Home</Link>
      </NavLinks>

      {user ? (
        <UserInfo>
          <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
          <span>{user.name}</span>
          <button className="logout-btn" onClick={logoutUserContext}>Logout</button>
        </UserInfo>
      ) : (
        <Link to="/auth" className="nav-link">Login</Link>
      )}
    </NavBarContainer>
  );
};

export default NavBar;
