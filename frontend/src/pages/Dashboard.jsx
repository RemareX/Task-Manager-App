import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import './Dashboard.css';

export default function Dashboard() {



    const { logout } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [formData, setFormData] = useState({
        _id: "",
        title: "",
        description: "",
        status: "",
        dueDate: ""
    });
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortBy, setSortBy] = useState("dueDate");
    const [loading, setLoading] = useState(true);
    const API_URL = process.env.REACT_APP_API_URL;

    //Fetch tasks when Dashboard loads
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${API_URL}/tasks`, { headers: { Authorization: `Bearer ${token}` } });
            setTasks(res.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            if (formData._id) {
                // Update existing task
                await axios.put(`${API_URL}tasks/${formData._id}`, formData, { headers: { Authorization: `Bearer ${token}` } });
            } else {
                // Create new task
                await axios.post(`${API_URL}/tasks`, formData, { headers: { Authorization: `Bearer ${token}` } });
            }
            setFormData({
                title: "",
                description: "",
                status: "",
                dueDate: ""
            });
            fetchTasks();
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    const handleEdit = (task) => {
        setFormData({
            _id: task._id,
            title: task.title,
            description: task.description,
            status: task.status || "",
            dueDate: task.dueDate ? task.dueDate.split('T')[0] : ""
        });
    };

    const handleCancleEdit = () => {
        setFormData({
            _id: "",
            title: "",
            description: "",
            status: "",
            dueDate: ""
        });
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${API_URL}/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            fetchTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "Pending":
                return "status-pending";
            case "In Progress":
                return "status-inprogress";
            case "Completed":
                return "status-completed";
            default:
                return "";
        }
    };

    return (
        <div className="dashboard-container">
            {/* Header */}
            <header className="dashboard-header">
                <h1>📋 Task Manager</h1>
                <button className="logout-btn" onClick={logout}>Logout</button>
            </header>

            {/* Add Task Form*/}
            <form className="task-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Task Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Task Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate ? formData.dueDate.split('T')[0] : ""}
                    onChange={handleChange}
                    required
                />

                <div className="form-actions">
                    <button type="submit"> {formData._id ? '✏ Update Task' : '➕ Add Task'}</button>
                    {formData._id && (<button type="button" className="cancel-btn" onClick={handleCancleEdit}>❌ Cancle Edit</button>)}
                </div>
            </form>

            <div className="filters">
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="all">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>

                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="dueDate">Sort by Due Date</option>
                    <option value="createdAt">Sort by Created At</option>
                </select>
            </div>

            {/* Task List */}
            <ul className="task-list">
                {loading ? (
                    <p className="loading">Loading tasks...</p>
                ) : tasks.length > 0 ? (
                    tasks
                        .filter(task => statusFilter === 'all' || task.status === statusFilter).sort((a, b) => Date(a[sortBy]) - new Date(b[sortBy])).map((task) => (
                            <li key={task._id} className={`task-item ${getStatusClass(task.status)}`} >
                                <div>
                                    <strong>{task.title}</strong> {task.description && <p>{task.description}</p>} - <span className="status-text">{task.status}</span> {task.dueDate && (
                                        <small>
                                            {' '}Due: {new Date(task.dueDate).toLocaleDateString()}
                                        </small>
                                    )}
                                </div>
                                <div className="task-actions">
                                    <button onClick={() => handleEdit(task)}> ✏ Edit</button>

                                    <button className="delete-btn" onClick={() => handleDelete(task._id)}>🗑 Delete</button>
                                </div>
                            </li>
                        ))
                ) : (
                    <p className="no-tasks">No tasks available. Please add a task.</p>
                )}
            </ul>
        </div>
    );
}