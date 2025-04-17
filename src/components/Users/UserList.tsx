import React, { useState, useEffect } from "react";
import { User } from "../../interfaces/User";
import { getUsers } from "../../services/firebaseUsers";
import "./UserList.css"; // Assicurati che questo file CSS esista

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        getUsers()
            .then((data) => {
                setUsers(data);
                setFilteredUsers(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching users:", err);
                setError(err instanceof Error ? err.message : "Unknown error");
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const filtered = users.filter((user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchTerm, users]);

    const getInitials = (name: string) => {
        const nameParts = name.trim().split(" ");
        return nameParts.map(part => part[0].toUpperCase()).slice(0, 2).join("");
    };

    return (
        <div className="user-list-container">
            <input
                type="text"
                placeholder="Cerca un utente..."
                className="search-bar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {loading ? (
                <p>Caricamento utenti...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div className="user-grid">
                    {filteredUsers.map((user) => (
                        <div key={user.userId} className="user-card">
                            <div className="user-icon">{getInitials(user.name)}</div>
                            <div className="user-name">{user.name}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserList;
