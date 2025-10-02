import { useState, useEffect } from "react";
import './index.css';
import './App.css';
import {
  Home,
  Calendar,
  Users,
  User,
  Info,
  Phone,
  Facebook,
  Instagram,
  Linkedin,
  Globe,
  Moon,
  Sun,
  LogOut,
  Settings,
  Search,
  Bell,
  Bookmark,
  ChevronDown,
  MapPin,
  Clock,
  Award,
  Heart,
  Share2,
  MessageCircle,
  Filter,
  X,
  ChevronRight,
  ExternalLink,
  Star,
  Mail,
  Map,
  Eye,
  Tag,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  Sparkles,
  CalendarDays,
  Trophy,
  Mic2,
  Palette,
  Code2,
  Gamepad2,
  Target,
  TrendingUp,
  Zap,
  Brain,
  Lock,
  UserPlus,
  Shield,
  Edit,
  Trash2,
  Plus,
  Menu,
  EyeOff,
  UserCheck,
  UserX,
  AlertCircle,
  Ban,
  CheckCircle2,
  BarChart3,
  FileText,
  Shield as ShieldIcon,
  Crown
} from "lucide-react";

// Import API functions
import { authAPI, eventsAPI, clubsAPI, adminAPI, studentsAPI } from './api';

// Authentication Components
function Login({ onLogin, onSwitchToSignup }) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await authAPI.login(credentials);
      const { token, ...userData } = response.data.data || response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      onLogin(userData);
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-md border border-gray-700/50 transform transition-all duration-300 hover:shadow-purple-500/10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-full transform hover:scale-110 transition-transform duration-300">
              <Lock className="text-white" size={32} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400">Sign in to access your ClubVerse account</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="your.email@college.edu"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute right-3 top-3.5 text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-purple-500 focus:ring-purple-400 border-gray-600 rounded bg-gray-700"
                disabled={isLoading}
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-400">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-purple-400 hover:text-purple-300">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3.5 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg disabled:opacity-50 transform hover:-translate-y-0.5"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <button
              onClick={onSwitchToSignup}
              className="text-purple-400 hover:text-purple-300 font-medium"
              disabled={isLoading}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function Signup({ onSignup, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    studentId: "",
    department: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await authAPI.register(formData);
      const { token, ...userData } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      onSignup(userData);
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-md border border-gray-700/50 transform transition-all duration-300 hover:shadow-purple-500/10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-full transform hover:scale-110 transition-transform duration-300">
              <UserPlus className="text-white" size={32} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-400">Join our ClubVerse community</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="your.email@college.edu"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Student ID</label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your student ID"
              value={formData.studentId}
              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Department</label>
            <select
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              required
              disabled={isLoading}
            >
              <option value="">Select your department</option>
              <option value="cs">Computer Science</option>
              <option value="it">Information Technology</option>
              <option value="ece">Electronics & Communication</option>
              <option value="mech">Mechanical Engineering</option>
              <option value="civil">Civil Engineering</option>
              <option value="eee">Electrical Engineering</option>
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 text-purple-500 focus:ring-purple-400 border-gray-600 rounded bg-gray-700"
              required
              disabled={isLoading}
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
              I agree to the <a href="#" className="text-purple-400 hover:text-purple-300">terms and conditions</a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3.5 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg mt-4 disabled:opacity-50 transform hover:-translate-y-0.5"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-purple-400 hover:text-purple-300 font-medium"
              disabled={isLoading}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// Admin Management Component
function AdminManagement({ admins, onAddAdmin, onEditAdmin, onDeleteAdmin }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "admin",
    permissions: ["events", "clubs"]
  });

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      role: "admin",
      permissions: ["events", "clubs"]
    });
    setEditingAdmin(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAdmin) {
      onEditAdmin(editingAdmin._id, formData);
    } else {
      onAddAdmin({
        ...formData,
        id: Date.now(),
        dateAdded: new Date().toLocaleDateString()
      });
    }
    setShowAddForm(false);
    resetForm();
  };

  const handleEdit = (admin) => {
    setEditingAdmin(admin);
    setFormData({
      name: admin.user?.name || admin.name || "",
      email: admin.user?.email || admin.email || "",
      role: admin.role,
      permissions: admin.permissions || ["events", "clubs"]
    });
    setShowAddForm(true);
  };

  const togglePermission = (permission) => {
    const updatedPermissions = formData.permissions.includes(permission)
      ? formData.permissions.filter(p => p !== permission)
      : [...formData.permissions, permission];

    setFormData({ ...formData, permissions: updatedPermissions });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Manage Administrators</h2>
        <button
          onClick={() => {
            resetForm();
            setShowAddForm(true);
          }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:from-purple-700 hover:to-blue-700 transition-all transform hover:-translate-y-0.5"
        >
          <Plus size={18} className="mr-2" />
          Add Admin
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-gray-700 p-6 rounded-xl mb-6 border border-gray-600">
          <h3 className="text-xl font-bold mb-4 text-white">
            {editingAdmin ? "Edit" : "Add New"} Administrator
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Role</label>
              <select
                className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              >
                <option value="admin">Administrator</option>
                <option value="moderator">Moderator</option>
                <option value="support">Support Staff</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Permissions</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {["events", "clubs", "students", "reports"].map((permission) => (
                  <label key={permission} className="flex items-center text-gray-300">
                    <input
                      type="checkbox"
                      checked={formData.permissions.includes(permission)}
                      onChange={() => togglePermission(permission)}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-gray-700"
                    />
                    <span className="ml-2 text-sm capitalize">{permission}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  resetForm();
                }}
                className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700"
              >
                {editingAdmin ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Admins List */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-3 text-left text-sm font-medium text-gray-300">Name</th>
              <th className="p-3 text-left text-sm font-medium text-gray-300">Email</th>
              <th className="p-3 text-left text-sm font-medium text-gray-300">Role</th>
              <th className="p-3 text-left text-sm font-medium text-gray-300">Permissions</th>
              <th className="p-3 text-left text-sm font-medium text-gray-300">Date Added</th>
              <th className="p-3 text-left text-sm font-medium text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id} className="border-t border-gray-700 hover:bg-gray-700/50">
                <td className="p-3 text-white">{admin.user?.name || admin.name}</td>
                <td className="p-3 text-gray-300">{admin.user?.email || admin.email}</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-purple-900/30 text-purple-300 text-xs rounded-full capitalize">
                    {admin.role}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-1">
                    {admin.permissions?.map((permission) => (
                      <span key={permission} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full capitalize">
                        {permission}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-3 text-gray-300">{new Date(admin.dateAdded).toLocaleDateString()}</td>
                <td className="p-3">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(admin)}
                      className="p-1 text-blue-400 hover:bg-blue-900/30 rounded"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete ${admin.user?.name || admin.name}?`)) {
                          onDeleteAdmin(admin._id);
                        }
                      }}
                      className="p-1 text-red-400 hover:bg-red-900/30 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Student Management Component
function StudentManagement({ students, onBlockStudent, onUnblockStudent, onDeleteStudent }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" ||
      (statusFilter === "active" && !student.isBlocked) ||
      (statusFilter === "blocked" && student.isBlocked);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Manage Students</h2>
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search students..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Students</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-3 text-left text-sm font-medium text-gray-300">Student ID</th>
              <th className="p-3 text-left text-sm font-medium text-gray-300">Name</th>
              <th className="p-3 text-left text-sm font-medium text-gray-300">Email</th>
              <th className="p-3 text-left text-sm font-medium text-gray-300">Department</th>
              <th className="p-3 text-left text-sm font-medium text-gray-300">Status</th>
              <th className="p-3 text-left text-sm font-medium text-gray-300">Events Registered</th>
              <th className="p-3 text-left text-sm font-medium text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student._id} className="border-t border-gray-700 hover:bg-gray-700/50">
                <td className="p-3 font-medium text-white">{student.studentId}</td>
                <td className="p-3">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-2">
                      <User size={14} className="text-blue-400" />
                    </div>
                    <span className="text-white">{student.name}</span>
                  </div>
                </td>
                <td className="p-3 text-gray-300">{student.email}</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full capitalize">
                    {student.department}
                  </span>
                </td>
                <td className="p-3">
                  {student.isBlocked ? (
                    <span className="px-2 py-1 bg-red-900/30 text-red-300 text-xs rounded-full flex items-center w-fit">
                      <Ban size={12} className="mr-1" /> Blocked
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-green-900/30 text-green-300 text-xs rounded-full flex items-center w-fit">
                      <CheckCircle2 size={12} className="mr-1" /> Active
                    </span>
                  )}
                </td>
                
                <td className="p-3 text-gray-300">
                  {student.appliedEvents ? student.appliedEvents.length : student.eventsRegistered || 0}
                </td>
                <td className="p-3">
                  <div className="flex space-x-2">
                    {student.isBlocked ? (
                      <button
                        onClick={() => onUnblockStudent(student._id)}
                        className="px-3 py-1 bg-green-700 text-white text-sm rounded-lg hover:bg-green-600 flex items-center transform hover:-translate-y-0.5"
                      >
                        <UserCheck size={14} className="mr-1" /> Unblock
                      </button>
                    ) : (
                      <button
                        onClick={() => onBlockStudent(student._id)}
                        className="px-3 py-1 bg-red-700 text-white text-sm rounded-lg hover:bg-red-600 flex items-center transform hover:-translate-y-0.5"
                      >
                        <UserX size={14} className="mr-1" /> Block
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete ${student.name}? This will remove all their data.`)) {
                          onDeleteStudent(student._id);
                        }
                      }}
                      className="p-1 text-red-400 hover:bg-red-900/30 rounded transform hover:-translate-y-0.5"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <UserX size={48} className="mx-auto mb-4 text-gray-600" />
          <p>No students found matching your criteria</p>
        </div>
      )}
    </div>
  );
}

// Admin Dashboard Component
function AdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("events");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    club: "",
    image: ""
  });
  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);

  // Load data based on active tab
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        if (activeTab === "events") {
          const response = await eventsAPI.getAll();
          setEvents(response.data.events);
        } else if (activeTab === "clubs") {
          const response = await clubsAPI.getAll();
          setClubs(response.data);
        } else if (activeTab === "admins") {
          const response = await adminAPI.getAdmins();
          setAdmins(response.data);
        } else if (activeTab === "students") {
          const response = await adminAPI.getStudents();
          setStudents(response.data.students);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [activeTab]);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      club: "",
      image: ""
    });
    setEditingItem(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (activeTab === "events") {
        if (editingItem) {
          const response = await eventsAPI.update(editingItem._id, formData);
          setEvents(events.map(event =>
            event._id === editingItem._id ? response.data : event
          ));
        } else {
          const response = await eventsAPI.create(formData);
          setEvents([...events, response.data]);
        }
      } else {
        if (editingItem) {
          const response = await clubsAPI.update(editingItem._id, formData);
          setClubs(clubs.map(club =>
            club._id === editingItem._id ? response.data : club
          ));
        } else {
          const response = await clubsAPI.create(formData);
          setClubs([...clubs, response.data]);
        }
      }

      setShowAddForm(false);
      resetForm();
    } catch (error) {
      console.error("Error saving item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || item.name,
      description: item.description,
      date: item.date || "",
      time: item.time || "",
      location: item.location || "",
      club: item.club || item.category || "",
      image: item.image || item.logo || ""
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        if (activeTab === "events") {
          await eventsAPI.delete(id);
          setEvents(events.filter(event => event._id !== id));
        } else {
          await clubsAPI.delete(id);
          setClubs(clubs.filter(club => club._id !== id));
        }
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  // Admin management functions
  const handleAddAdmin = async (newAdmin) => {
    try {
      // Find user by email to get their ID
      const usersResponse = await adminAPI.getStudents({ search: newAdmin.email });
      const user = usersResponse.data.students.find(u => u.email === newAdmin.email);

      if (!user) {
        alert("User not found with this email");
        return;
      }

      const response = await adminAPI.createAdmin({
        userId: user._id,
        permissions: newAdmin.permissions,
        role: newAdmin.role
      });

      setAdmins([...admins, response.data]);
    } catch (error) {
      console.error("Error adding admin:", error);
      alert(error.response?.data?.message || "Failed to add admin");
    }
  };

  const handleEditAdmin = async (id, updatedAdmin) => {
    try {
      const response = await adminAPI.updateAdmin(id, updatedAdmin);
      setAdmins(admins.map(admin =>
        admin._id === id ? response.data : admin
      ));
    } catch (error) {
      console.error("Error updating admin:", error);
      alert(error.response?.data?.message || "Failed to update admin");
    }
  };

  const handleDeleteAdmin = async (id) => {
    try {
      await adminAPI.deleteAdmin(id);
      setAdmins(admins.filter(admin => admin._id !== id));
    } catch (error) {
      console.error("Error deleting admin:", error);
      alert(error.response?.data?.message || "Failed to delete admin");
    }
  };

  // Student management functions
  const handleBlockStudent = async (id) => {
    try {
      await adminAPI.blockStudent(id);
      setStudents(students.map(student =>
        student._id === id ? { ...student, isBlocked: true } : student
      ));
    } catch (error) {
      console.error("Error blocking student:", error);
      alert(error.response?.data?.message || "Failed to block student");
    }
  };

  const handleUnblockStudent = async (id) => {
    try {
      await adminAPI.unblockStudent(id);
      setStudents(students.map(student =>
        student._id === id ? { ...student, isBlocked: false } : student
      ));
    } catch (error) {
      console.error("Error unblocking student:", error);
      alert(error.response?.data?.message || "Failed to unblock student");
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await adminAPI.deleteStudent(id);
      setStudents(students.filter(student => student._id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
      alert(error.response?.data?.message || "Failed to delete student");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg border-b border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg transform hover:scale-105 transition-transform duration-300">
              <Shield className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">ClubVerse Admin</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full hover:bg-gray-700 relative transform hover:-translate-y-0.5 transition-all"
              >
                <Bell size={20} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transform hover:scale-110">
                    {notifications}
                  </span>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                  <div className="p-3 border-b border-gray-700">
                    <h3 className="font-semibold text-white">Notifications</h3>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    <div className="p-3 hover:bg-gray-700 cursor-pointer border-b border-gray-700">
                      <p className="text-sm text-white">New event registration received</p>
                      <p className="text-xs text-gray-400">2 minutes ago</p>
                    </div>
                    <div className="p-3 hover:bg-gray-700 cursor-pointer border-b border-gray-700">
                      <p className="text-sm text-white">Club membership request pending</p>
                      <p className="text-xs text-gray-400">15 minutes ago</p>
                    </div>
                    <div className="p-3 hover:bg-gray-700 cursor-pointer">
                      <p className="text-sm text-white">System update completed successfully</p>
                      <p className="text-xs text-gray-400">1 hour ago</p>
                    </div>
                  </div>
                  <div className="p-3 border-t border-gray-700">
                    <button className="text-sm text-purple-400 hover:text-purple-300 w-full text-center">
                      Mark all as read
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <span className="text-gray-300">Welcome, {user.name}</span>
            <button
              onClick={onLogout}
              className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-red-700 hover:to-orange-700 transition-all transform hover:-translate-y-0.5"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex border-b border-gray-700 overflow-x-auto">
          {["events", "clubs", "admins", "students", "analytics"].map((tab) => (
            <button
              key={tab}
              className={`py-3 px-6 font-medium whitespace-nowrap capitalize ${activeTab === tab ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-400 hover:text-gray-300"}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "analytics" ? <BarChart3 size={18} className="inline mr-2" /> : null}
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-6">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        ) : activeTab === "admins" ? (
          <AdminManagement
            admins={admins}
            onAddAdmin={handleAddAdmin}
            onEditAdmin={handleEditAdmin}
            onDeleteAdmin={handleDeleteAdmin}
          />
        ) : activeTab === "students" ? (
          <StudentManagement
            students={students}
            onBlockStudent={handleBlockStudent}
            onUnblockStudent={handleUnblockStudent}
            onDeleteStudent={handleDeleteStudent}
          />
        ) : activeTab === "analytics" ? (
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">Platform Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-purple-700/30 to-blue-700/30 p-5 rounded-xl border border-purple-500/20 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center">
                  <Users className="text-purple-400 mr-3" size={24} />
                  <div>
                    <p className="text-sm text-gray-400">Total Students</p>
                    <p className="text-2xl font-bold text-white">{students.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-700/30 to-teal-700/30 p-5 rounded-xl border border-green-500/20 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center">
                  <Calendar className="text-green-400 mr-3" size={24} />
                  <div>
                    <p className="text-sm text-gray-400">Total Events</p>
                    <p className="text-2xl font-bold text-white">{events.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-700/30 to-cyan-700/30 p-5 rounded-xl border border-blue-500/20 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center">
                  <Users className="text-blue-400 mr-3" size={24} />
                  <div>
                    <p className="text-sm text-gray-400">Total Clubs</p>
                    <p className="text-2xl font-bold text-white">{clubs.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-orange-700/30 to-red-700/30 p-5 rounded-xl border border-orange-500/20 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center">
                  <ShieldIcon className="text-orange-400 mr-3" size={24} />
                  <div>
                    <p className="text-sm text-gray-400">Admins</p>
                    <p className="text-2xl font-bold text-white">{admins.length}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-700/50 p-5 rounded-xl border border-gray-600">
              <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-purple-900/30 p-2 rounded-full mr-3">
                      <UserPlus size={16} className="text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-white">New student registered</p>
                      <p className="text-xs text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-green-900/30 p-2 rounded-full mr-3">
                      <Calendar size={16} className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-white">New event created</p>
                      <p className="text-xs text-gray-400">5 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-blue-900/30 p-2 rounded-full mr-3">
                      <Users size={16} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-white">New club created</p>
                      <p className="text-xs text-gray-400">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {activeTab === "events" ? "Events" : "Clubs"} Management
              </h2>
              <button
                onClick={() => {
                  resetForm();
                  setShowAddForm(true);
                }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:from-purple-700 hover:to-blue-700 transition-all transform hover:-translate-y-0.5"
              >
                <Plus size={18} className="mr-2" />
                Add {activeTab === "events" ? "Event" : "Club"}
              </button>
            </div>

            {/* Add/Edit Form */}
            {showAddForm && (
              <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 mb-6">
                <h3 className="text-xl font-bold mb-4 text-white">
                  {editingItem ? "Edit" : "Add New"} {activeTab.slice(0, -1)}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Title</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        {activeTab === "events" ? "Club" : "Category"}
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={formData.club}
                        onChange={(e) => setFormData({ ...formData, club: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Description</label>
                    <textarea
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      disabled={isLoading}
                    ></textarea>
                  </div>

                  {activeTab === "events" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Date</label>
                        <input
                          type="date"
                          className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Time</label>
                        <input
                          type="time"
                          className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Location</label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Image URL</label>
                    <input
                      type="url"
                      className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        resetForm();
                      }}
                      className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700"
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 transform hover:-translate-y-0.5"
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : editingItem ? "Update" : "Create"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* List */}
            <div className="grid grid-cols-1 gap-4">
              {(activeTab === "events" ? events : clubs).map((item) => (
                <div key={item._id} className="bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700 flex transform hover:-translate-y-0.5 transition-transform duration-300">
                  <div className="w-20 h-20 rounded-xl overflow-hidden mr-4">
                    <img src={item.image || item.logo} alt={item.title || item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-white">{item.title || item.name}</h3>
                    <p className="text-gray-400 text-sm mb-2">{item.club || item.description}</p>
                    {activeTab === "events" && (
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-3">{new Date(item.date).toLocaleDateString()}</span>
                        <span>{item.location}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 text-blue-400 hover:bg-blue-900/30 rounded-lg transform hover:-translate-y-0.5"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 text-red-400 hover:bg-red-900/30 rounded-lg transform hover:-translate-y-0.5"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {(activeTab === "events" ? events : clubs).length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Calendar size={48} className="mx-auto mb-4 text-gray-600" />
                <p>No {activeTab} found. Create your first one!</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// DSW Dashboard Component
function DSWDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    club: "",
    image: ""
  });
  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState(5);
  const [showNotifications, setShowNotifications] = useState(false);

  // Load data based on active tab
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        if (activeTab === "events") {
          const response = await eventsAPI.getAll();
          setEvents(response.data.events);
        } else if (activeTab === "clubs") {
          const response = await clubsAPI.getAll();
          setClubs(response.data);
        } else if (activeTab === "admins") {
          const response = await adminAPI.getAdmins();
          setAdmins(response.data);
        } else if (activeTab === "students") {
          const response = await adminAPI.getStudents();
          setStudents(response.data.students);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [activeTab]);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      club: "",
      image: ""
    });
    setEditingItem(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (activeTab === "events") {
        if (editingItem) {
          const response = await eventsAPI.update(editingItem._id, formData);
          setEvents(events.map(event =>
            event._id === editingItem._id ? response.data : event
          ));
        } else {
          const response = await eventsAPI.create(formData);
          setEvents([...events, response.data]);
        }
      } else {
        if (editingItem) {
          const response = await clubsAPI.update(editingItem._id, formData);
          setClubs(clubs.map(club =>
            club._id === editingItem._id ? response.data : club
          ));
        } else {
          const response = await clubsAPI.create(formData);
          setClubs([...clubs, response.data]);
        }
      }

      setShowAddForm(false);
      resetForm();
    } catch (error) {
      console.error("Error saving item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || item.name,
      description: item.description,
      date: item.date || "",
      time: item.time || "",
      location: item.location || "",
      club: item.club || item.category || "",
      image: item.image || item.logo || ""
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        if (activeTab === "events") {
          await eventsAPI.delete(id);
          setEvents(events.filter(event => event._id !== id));
        } else {
          await clubsAPI.delete(id);
          setClubs(clubs.filter(club => club._id !== id));
        }
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  // Admin management functions
  const handleAddAdmin = async (newAdmin) => {
    try {
      // Find user by email to get their ID
      const usersResponse = await adminAPI.getStudents({ search: newAdmin.email });
      const user = usersResponse.data.students.find(u => u.email === newAdmin.email);

      if (!user) {
        alert("User not found with this email");
        return;
      }

      const response = await adminAPI.createAdmin({
        userId: user._id,
        permissions: newAdmin.permissions,
        role: newAdmin.role
      });

      setAdmins([...admins, response.data]);
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  const handleEditAdmin = async (id, updatedAdmin) => {
    try {
      const response = await adminAPI.updateAdmin(id, updatedAdmin);
      setAdmins(admins.map(admin =>
        admin._id === id ? response.data : admin
      ));
    } catch (error) {
      console.error("Error updating admin:", error);
    }
  };

  const handleDeleteAdmin = async (id) => {
    try {
      await adminAPI.deleteAdmin(id);
      setAdmins(admins.filter(admin => admin._id !== id));
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  // Student management functions
  const handleBlockStudent = async (id) => {
    try {
      await adminAPI.blockStudent(id);
      setStudents(students.map(student =>
        student._id === id ? { ...student, isBlocked: true } : student
      ));
    } catch (error) {
      console.error("Error blocking student:", error);
    }
  };

  const handleUnblockStudent = async (id) => {
    try {
      await adminAPI.unblockStudent(id);
      setStudents(students.map(student =>
        student._id === id ? { ...student, isBlocked: false } : student
      ));
    } catch (error) {
      console.error("Error unblocking student:", error);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await adminAPI.deleteStudent(id);
      setStudents(students.filter(student => student._id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg border-b border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg transform hover:scale-105 transition-transform duration-300">
              <Crown className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">ClubVerse DSW</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full hover:bg-gray-700 relative transform hover:-translate-y-0.5 transition-all"
              >
                <Bell size={20} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transform hover:scale-110">
                    {notifications}
                  </span>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                  <div className="p-3 border-b border-gray-700">
                    <h3 className="font-semibold text-white">Notifications</h3>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    <div className="p-3 hover:bg-gray-700 cursor-pointer border-b border-gray-700">
                      <p className="text-sm text-white">New admin approval required</p>
                      <p className="text-xs text-gray-400">10 minutes ago</p>
                    </div>
                    <div className="p-3 hover:bg-gray-700 cursor-pointer border-b border-gray-700">
                      <p className="text-sm text-white">System maintenance scheduled</p>
                      <p className="text-xs text-gray-400">1 hour ago</p>
                    </div>
                    <div className="p-3 hover:bg-gray-700 cursor-pointer border-b border-gray-700">
                      <p className="text-sm text-white">New event registration received</p>
                      <p className="text-xs text-gray-400">2 hours ago</p>
                    </div>
                    <div className="p-3 hover:bg-gray-700 cursor-pointer border-b border-gray-700">
                      <p className="text-sm text-white">Club membership request pending</p>
                      <p className="text-xs text-gray-400">5 hours ago</p>
                    </div>
                    <div className="p-3 hover:bg-gray-700 cursor-pointer">
                      <p className="text-sm text-white">Weekly report generated</p>
                      <p className="text-xs text-gray-400">1 day ago</p>
                    </div>
                  </div>
                  <div className="p-3 border-t border-gray-700">
                    <button className="text-sm text-purple-400 hover:text-purple-300 w-full text-center">
                      Mark all as read
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <span className="text-gray-300">Welcome, {user.name}</span>
            <button
              onClick={onLogout}
              className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-red-700 hover:to-orange-700 transition-all transform hover:-translate-y-0.5"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex border-b border-gray-700 overflow-x-auto">
          {["overview", "events", "clubs", "admins", "students", "analytics", "reports"].map((tab) => (
            <button
              key={tab}
              className={`py-3 px-6 font-medium whitespace-nowrap capitalize ${activeTab === tab ? "text-pink-400 border-b-2 border-pink-400" : "text-gray-400 hover:text-gray-300"}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "analytics" ? <BarChart3 size={18} className="inline mr-2" /> : 
               tab === "reports" ? <FileText size={18} className="inline mr-2" /> : null}
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-6">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
          </div>
        ) : activeTab === "overview" ? (
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">DSW Control Panel</h2>
              <p className="text-gray-400 mb-6">
                As the Dean of Student Welfare, you have full control over the platform, including managing administrators and overseeing all activities.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-purple-700/30 to-blue-700/30 p-5 rounded-xl border border-purple-500/20 transform hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center">
                    <Users className="text-purple-400 mr-3" size={24} />
                    <div>
                      <p className="text-sm text-gray-400">Total Students</p>
                      <p className="text-2xl font-bold text-white">{students.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-700/30 to-teal-700/30 p-5 rounded-xl border border-green-500/20 transform hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center">
                    <Calendar className="text-green-400 mr-3" size={24} />
                    <div>
                      <p className="text-sm text-gray-400">Total Events</p>
                      <p className="text-2xl font-bold text-white">{events.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-700/30 to-cyan-700/30 p-5 rounded-xl border border-blue-500/20 transform hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center">
                    <Users className="text-blue-400 mr-3" size={24} />
                    <div>
                      <p className="text-sm text-gray-400">Total Clubs</p>
                      <p className="text-2xl font-bold text-white">{clubs.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-pink-700/30 to-red-700/30 p-5 rounded-xl border border-pink-500/20 transform hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center">
                    <ShieldIcon className="text-pink-400 mr-3" size={24} />
                    <div>
                      <p className="text-sm text-gray-400">Admins</p>
                      <p className="text-2xl font-bold text-white">{admins.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-purple-900/30 p-2 rounded-full mr-3">
                        <UserPlus size={16} className="text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm text-white">New student registered</p>
                        <p className="text-xs text-gray-400">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-green-900/30 p-2 rounded-full mr-3">
                        <Calendar size={16} className="text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm text-white">New event created</p>
                        <p className="text-xs text-gray-400">5 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-blue-900/30 p-2 rounded-full mr-3">
                        <Users size={16} className="text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-white">New club created</p>
                        <p className="text-xs text-gray-400">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setActiveTab("admins")}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-lg text-white hover:from-purple-700 hover:to-blue-700 transition-all transform hover:-translate-y-0.5"
                  >
                    <div className="flex flex-col items-center">
                      <ShieldIcon size={24} className="mb-2" />
                      <span className="text-sm">Manage Admins</span>
                    </div>
                  </button>
                  <button 
                    onClick={() => setActiveTab("students")}
                    className="bg-gradient-to-r from-green-600 to-teal-600 p-4 rounded-lg text-white hover:from-green-700 hover:to-teal-700 transition-all transform hover:-translate-y-0.5"
                  >
                    <div className="flex flex-col items-center">
                      <Users size={24} className="mb-2" />
                      <span className="text-sm">Manage Students</span>
                    </div>
                  </button>
                  <button 
                    onClick={() => setActiveTab("events")}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 rounded-lg text-white hover:from-blue-700 hover:to-cyan-700 transition-all transform hover:-translate-y-0.5"
                  >
                    <div className="flex flex-col items-center">
                      <Calendar size={24} className="mb-2" />
                      <span className="text-sm">Manage Events</span>
                    </div>
                  </button>
                  <button 
                    onClick={() => setActiveTab("clubs")}
                    className="bg-gradient-to-r from-orange-600 to-red-600 p-4 rounded-lg text-white hover:from-orange-700 hover:to-red-700 transition-all transform hover:-translate-y-0.5"
                  >
                    <div className="flex flex-col items-center">
                      <Users size={24} className="mb-2" />
                      <span className="text-sm">Manage Clubs</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === "admins" ? (
          <AdminManagement
            admins={admins}
            onAddAdmin={handleAddAdmin}
            onEditAdmin={handleEditAdmin}
            onDeleteAdmin={handleDeleteAdmin}
          />
        ) : activeTab === "students" ? (
          <StudentManagement
            students={students}
            onBlockStudent={handleBlockStudent}
            onUnblockStudent={handleUnblockStudent}
            onDeleteStudent={handleDeleteStudent}
          />
        ) : activeTab === "analytics" ? (
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">Platform Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-purple-700/30 to-blue-700/30 p-5 rounded-xl border border-purple-500/20 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center">
                  <Users className="text-purple-400 mr-3" size={24} />
                  <div>
                    <p className="text-sm text-gray-400">Total Students</p>
                    <p className="text-2xl font-bold text-white">{students.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-700/30 to-teal-700/30 p-5 rounded-xl border border-green-500/20 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center">
                  <Calendar className="text-green-400 mr-3" size={24} />
                  <div>
                    <p className="text-sm text-gray-400">Total Events</p>
                    <p className="text-2xl font-bold text-white">{events.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-700/30 to-cyan-700/30 p-5 rounded-xl border border-blue-500/20 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center">
                  <Users className="text-blue-400 mr-3" size={24} />
                  <div>
                    <p className="text-sm text-gray-400">Total Clubs</p>
                    <p className="text-2xl font-bold text-white">{clubs.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-pink-700/30 to-red-700/30 p-5 rounded-xl border border-pink-500/20 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center">
                  <ShieldIcon className="text-pink-400 mr-3" size={24} />
                  <div>
                    <p className="text-sm text-gray-400">Admins</p>
                    <p className="text-2xl font-bold text-white">{admins.length}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-700/50 p-5 rounded-xl border border-gray-600">
              <h3 className="text-xl font-bold text-white mb-4">Platform Usage</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Event Registrations</p>
                  <p className="text-2xl font-bold text-white">1,243</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Club Memberships</p>
                  <p className="text-2xl font-bold text-white">892</p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Active Users</p>
                  <p className="text-2xl font-bold text-white">1,045</p>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === "reports" ? (
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-700/50 p-5 rounded-xl border border-gray-600 transform hover:-translate-y-0.5 transition-transform duration-300 cursor-pointer">
                <div className="flex items-center mb-3">
                  <FileText className="text-blue-400 mr-2" size={20} />
                  <h3 className="font-semibold text-white">Student Activity Report</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">Detailed report on student participation in events and clubs</p>
                <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1 rounded text-sm hover:from-blue-700 hover:to-cyan-700">
                  Generate Report
                </button>
              </div>
              
              <div className="bg-gray-700/50 p-5 rounded-xl border border-gray-600 transform hover:-translate-y-0.5 transition-transform duration-300 cursor-pointer">
                <div className="flex items-center mb-3">
                  <FileText className="text-green-400 mr-2" size={20} />
                  <h3 className="font-semibold text-white">Event Performance Report</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">Analysis of event attendance and engagement metrics</p>
                <button className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-3 py-1 rounded text-sm hover:from-green-700 hover:to-teal-700">
                  Generate Report
                </button>
              </div>
              
              <div className="bg-gray-700/50 p-5 rounded-xl border border-gray-600 transform hover:-translate-y-0.5 transition-transform duration-300 cursor-pointer">
                <div className="flex items-center mb-3">
                  <FileText className="text-purple-400 mr-2" size={20} />
                  <h3 className="font-semibold text-white">Club Activity Report</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">Overview of club memberships and activities</p>
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded text-sm hover:from-purple-700 hover:to-pink-700">
                  Generate Report
                </button>
              </div>
              
              <div className="bg-gray-700/50 p-5 rounded-xl border border-gray-600 transform hover:-translate-y-0.5 transition-transform duration-300 cursor-pointer">
                <div className="flex items-center mb-3">
                  <FileText className="text-yellow-400 mr-2" size={20} />
                  <h3 className="font-semibold text-white">Financial Report</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">Budget allocation and expenditure analysis</p>
                <button className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-3 py-1 rounded text-sm hover:from-yellow-700 hover:to-orange-700">
                  Generate Report
                </button>
              </div>
              
              <div className="bg-gray-700/50 p-5 rounded-xl border border-gray-600 transform hover:-translate-y-0.5 transition-transform duration-300 cursor-pointer">
                <div className="flex items-center mb-3">
                  <FileText className="text-red-400 mr-2" size={20} />
                  <h3 className="font-semibold text-white">System Usage Report</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">Platform usage statistics and user engagement</p>
                <button className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-3 py-1 rounded text-sm hover:from-red-700 hover:to-pink-700">
                  Generate Report
                </button>
              </div>
              
              <div className="bg-gray-700/50 p-5 rounded-xl border border-gray-600 transform hover:-translate-y-0.5 transition-transform duration-300 cursor-pointer">
                <div className="flex items-center mb-3">
                  <FileText className="text-cyan-400 mr-2" size={20} />
                  <h3 className="font-semibold text-white">Monthly Summary</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">Comprehensive monthly activity summary</p>
                <button className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-3 py-1 rounded text-sm hover:from-cyan-700 hover:to-blue-700">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {activeTab === "events" ? "Events" : "Clubs"} Management
              </h2>
              <button
                onClick={() => {
                  resetForm();
                  setShowAddForm(true);
                }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg flex items-center hover:from-purple-700 hover:to-pink-700 transition-all transform hover:-translate-y-0.5"
              >
                <Plus size={18} className="mr-2" />
                Add {activeTab === "events" ? "Event" : "Club"}
              </button>
            </div>

            {/* Add/Edit Form */}
            {showAddForm && (
              <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 mb-6">
                <h3 className="text-xl font-bold mb-4 text-white">
                  {editingItem ? "Edit" : "Add New"} {activeTab.slice(0, -1)}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Title</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        {activeTab === "events" ? "Club" : "Category"}
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={formData.club}
                        onChange={(e) => setFormData({ ...formData, club: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Description</label>
                    <textarea
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      disabled={isLoading}
                    ></textarea>
                  </div>

                  {activeTab === "events" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Date</label>
                        <input
                          type="date"
                          className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Time</label>
                        <input
                          type="time"
                          className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Location</label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Image URL</label>
                    <input
                      type="url"
                      className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        resetForm();
                      }}
                      className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700"
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transform hover:-translate-y-0.5"
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : editingItem ? "Update" : "Create"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* List */}
            <div className="grid grid-cols-1 gap-4">
              {(activeTab === "events" ? events : clubs).map((item) => (
                <div key={item._id} className="bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700 flex transform hover:-translate-y-0.5 transition-transform duration-300">
                  <div className="w-20 h-20 rounded-xl overflow-hidden mr-4">
                    <img src={item.image || item.logo} alt={item.title || item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-white">{item.title || item.name}</h3>
                    <p className="text-gray-400 text-sm mb-2">{item.club || item.description}</p>
                    {activeTab === "events" && (
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-3">{new Date(item.date).toLocaleDateString()}</span>
                        <span>{item.location}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 text-blue-400 hover:bg-blue-900/30 rounded-lg transform hover:-translate-y-0.5"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 text-red-400 hover:bg-red-900/30 rounded-lg transform hover:-translate-y-0.5"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {(activeTab === "events" ? events : clubs).length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Calendar size={48} className="mx-auto mb-4 text-gray-600" />
                <p>No {activeTab} found. Create your first one!</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Student Dashboard Component
function StudentDashboard({ user, onLogout, events, clubs, setClubs, setEvents, appliedEvents, setAppliedEvents, upcomingEvents }) {
  const [activeTab, setActiveTab] = useState("home");
  const [darkMode, setDarkMode] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedEvents, setSavedEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [viewAllEvents, setViewAllEvents] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifications, setNotifications] = useState(2);
  const [showNotifications, setShowNotifications] = useState(false);
  // Recommendation system state
const [userProfile, setUserProfile] = useState({
  name: user.name,
  interests: user.interests || [],
  hobbies: user.hobbies || [],
  skills: user.skills || [],
  preferredActivities: user.preferredActivities || [],
  commitmentLevel: user.commitmentLevel || "medium"
});
const [recommendations, setRecommendations] = useState([]);
const [showInterestSelector, setShowInterestSelector] = useState(false);
const [recommendationType, setRecommendationType] = useState('all');
const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);

  const navItems = [
  { name: "home", icon: <Home size={20} />, label: "Home" },
  { name: "events", icon: <Calendar size={20} />, label: "Events" },
  { name: "clubs", icon: <Users size={20} />, label: "Clubs" },
  { name: "recommendations", icon: <Sparkles size={20} />, label: "For You" },
  { name: "applied", icon: <CheckCircle size={20} />, label: "Applied" },
  { name: "profile", icon: <User size={20} />, label: "Profile" },
];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSaveEvent = async (id) => {
    try {
      await eventsAPI.save(id);

      // Update local state
      const updatedEvents = events.map(event => {
        if (event._id === id) {
          const isCurrentlySaved = savedEvents.includes(id);
          return {
            ...event,
            isSaved: !isCurrentlySaved
          };
        }
        return event;
      });

      setEvents(updatedEvents);

      // Update saved events list
      if (savedEvents.includes(id)) {
        setSavedEvents(savedEvents.filter(eventId => eventId !== id));
      } else {
        setSavedEvents([...savedEvents, id]);
      }
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
  };

  const handleRegister = (event) => {
    setSelectedEvent(event);
    setShowRegistrationForm(true);
  };

  const handleSubmitRegistration = async (e) => {
    e.preventDefault();
    try {
      await eventsAPI.register(selectedEvent._id);
      alert("Registration submitted successfully!");

      // Refresh applied events
      const response = await studentsAPI.getAppliedEvents();
      setAppliedEvents(response.data);

      setShowRegistrationForm(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error("Error registering for event:", error);
      alert("Registration failed. Please try again.");
    }
  };

  // Filter events based on search query
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.club.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayEvents = viewAllEvents ? filteredEvents : filteredEvents.slice(0, 4);
  // Recommendation system data and functions
const availableInterests = [
  { id: 'technology', name: 'Technology', icon: <Code2 size={20} />, color: 'from-blue-500 to-cyan-500' },
  { id: 'arts', name: 'Arts & Design', icon: <Palette size={20} />, color: 'from-purple-500 to-pink-500' },
  { id: 'music', name: 'Music', icon: <Mic2 size={20} />, color: 'from-green-500 to-teal-500' },
  { id: 'sports', name: 'Sports & Fitness', icon: <Trophy size={20} />, color: 'from-orange-500 to-red-500' },
  { id: 'gaming', name: 'Gaming', icon: <Gamepad2 size={20} />, color: 'from-pink-500 to-rose-500' },
  { id: 'social', name: 'Social Impact', icon: <Users size={20} />, color: 'from-emerald-500 to-green-500' }
];

const calculateRecommendations = () => {
  setIsLoadingRecommendations(true);
  
  setTimeout(() => {
    const scored = clubs.map(club => {
      let score = 0;
      let reasons = [];

      // Interest matching (40% weight)
      const interestMatch = userProfile.interests.some(interest => 
        club.category === interest || club.name.toLowerCase().includes(interest)
      );
      if (interestMatch) {
        score += 40;
        reasons.push("Matches your interests");
      }

      // Activity matching (30% weight) - based on club description and type
      const descriptionMatch = userProfile.hobbies.some(hobby =>
        club.description.toLowerCase().includes(hobby.toLowerCase())
      );
      if (descriptionMatch) {
        score += 30;
        reasons.push("Matches your hobbies");
      }

      // Member count bonus (20% weight)
      const memberCount = club.members?.length || Math.floor(Math.random() * 200) + 20;
      const memberScore = Math.min(memberCount / 100 * 20, 20);
      score += memberScore;

      if (memberCount > 80) {
        reasons.push("Active community");
      }

      // Random factor for demonstration (10% weight)
      score += Math.random() * 10;

      // Boost score if not already a member
      if (!club.isMember) {
        score += 5;
        reasons.push("New opportunity");
      }

      return {
        ...club,
        matchScore: Math.round(Math.max(score, 30 + Math.random() * 40)),
        reasons: reasons.slice(0, 3),
        memberCount: memberCount
      };
    });

    // Filter and sort recommendations
    let filtered = scored.filter(club => !club.isMember && club.matchScore > 40);
    
    if (recommendationType !== 'all') {
      filtered = filtered.filter(club => club.category === recommendationType);
    }

    setRecommendations(filtered.sort((a, b) => b.matchScore - a.matchScore).slice(0, 8));
    setIsLoadingRecommendations(false);
  }, 1000);
};

const addInterest = (interestId) => {
  if (!userProfile.interests.includes(interestId)) {
    const updatedProfile = {
      ...userProfile,
      interests: [...userProfile.interests, interestId]
    };
    setUserProfile(updatedProfile);
  }
};

const removeInterest = (interestId) => {
  const updatedProfile = {
    ...userProfile,
    interests: userProfile.interests.filter(id => id !== interestId)
  };
  setUserProfile(updatedProfile);
};

const getInterestById = (id) => {
  return availableInterests.find(interest => interest.id === id);
};

const getMatchColor = (score) => {
  if (score >= 85) return 'text-green-400';
  if (score >= 70) return 'text-yellow-400';
  if (score >= 55) return 'text-orange-400';
  return 'text-red-400';
};

const getMatchLabel = (score) => {
  if (score >= 85) return 'Excellent Match';
  if (score >= 70) return 'Good Match';
  if (score >= 55) return 'Fair Match';
  return 'Poor Match';
};

// Trigger recommendations calculation when interests change
useEffect(() => {
  if (userProfile.interests.length > 0) {
    calculateRecommendations();
  }
}, [userProfile.interests, recommendationType, clubs]);

  // handle join Club
  // handle join Club
const handleJoinClub = async (clubId) => {
  try {
    const response = await clubsAPI.join(clubId);
    alert(response.data.message || 'Successfully joined club!');

    // Reload clubs to get updated membership status
    const clubsResponse = await clubsAPI.getAll();
    setClubs(clubsResponse.data);
    
    // Recalculate recommendations
    if (userProfile.interests.length > 0) {
      calculateRecommendations();
    }
  } catch (error) {
    console.error('Error joining club:', error);
    alert(error.response?.data?.message || 'Failed to join club. Please try again.');
  }
};

const handleLeaveClub = async (clubId) => {
  try {
    const response = await clubsAPI.leave(clubId);
    alert(response.data.message || 'Successfully left club!');

    // Reload clubs to get updated membership status  
    const clubsResponse = await clubsAPI.getAll();
    setClubs(clubsResponse.data);
    
    // Recalculate recommendations
    if (userProfile.interests.length > 0) {
      calculateRecommendations();
    }
  } catch (error) {
    console.error('Error leaving club:', error);
    alert(error.response?.data?.message || 'Failed to leave club. Please try again.');
  }
};

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex">
      {/* Sidebar */}
      <div className="w-20 md:w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-center md:justify-start">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg transform hover:scale-105 transition-transform duration-300 shadow-lg">
              <Users className="text-white" size={24} />
            </div>
            <h1 className="hidden md:block text-xl font-bold ml-3 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              ClubVerse
            </h1>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center justify-center md:justify-start py-3 px-4 rounded-xl transition-all ${activeTab === item.name
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white"}`}
                >
                  {item.icon}
                  <span className="hidden md:block ml-3">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center md:justify-start py-3 px-4 rounded-xl text-gray-400 hover:bg-gray-700 hover:text-white transition-all"
          >
            <LogOut size={20} />
            <span className="hidden md:block ml-3">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className={`bg-gray-800 border-b border-gray-700 sticky top-0 z-40 transition-all ${scrolled ? "py-2" : "py-3"}`}>
          <div className="container mx-auto px-6 flex justify-between items-center">
            <div className="md:hidden">
              <button className="p-2 rounded-full hover:bg-gray-700">
                <Menu size={20} />
              </button>
            </div>

            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search events, clubs..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-full hover:bg-gray-700 relative transform hover:-translate-y-0.5 transition-all"
                >
                  <Bell size={20} />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transform hover:scale-110">
                      {notifications}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                    <div className="p-3 border-b border-gray-700">
                      <h3 className="font-semibold text-white">Notifications</h3>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      <div className="p-3 hover:bg-gray-700 cursor-pointer border-b border-gray-700">
                        <p className="text-sm text-white">Your event registration was approved</p>
                        <p className="text-xs text-gray-400">2 minutes ago</p>
                      </div>
                      <div className="p-3 hover:bg-gray-700 cursor-pointer">
                        <p className="text-sm text-white">New event matches your interests</p>
                        <p className="text-xs text-gray-400">1 hour ago</p>
                      </div>
                    </div>
                    <div className="p-3 border-t border-gray-700">
                      <button className="text-sm text-purple-400 hover:text-purple-300 w-full text-center">
                        Mark all as read
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-gray-700 transform hover:-translate-y-0.5 transition-all"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:from-purple-700 hover:to-blue-700 transition-all shadow-md transform hover:-translate-y-0.5"
                >
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <User size={16} />
                  </div>
                  <span className="hidden md:block">{user.name}</span>
                  <ChevronDown size={16} />
                </button>
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 shadow-xl rounded-lg py-2 z-50">
                    <a href="#" className="block px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 transition-colors text-white"><User size={16} /> <span>My Profile</span></a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 transition-colors text-white"><Bookmark size={16} /> <span>Saved Events</span></a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 transition-colors text-white"><Settings size={16} /> <span>Settings</span></a>
                    <div className="border-t border-gray-700 my-1"></div>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 transition-colors text-red-400" onClick={onLogout}><LogOut size={16} /> <span>Logout</span></a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="container mx-auto px-6 py-6">
          {activeTab === "home" && !selectedEvent && !showRegistrationForm && (
            <div>
              {/* Hero Section */}
              <header className="relative text-white text-center py-16 md:py-24 shadow-lg overflow-hidden rounded-xl mb-8 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-indigo-900/20 z-0"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center mix-blend-overlay z-0"></div>
                <div className="container mx-auto px-6 relative z-10">
                  <div className="flex justify-center mb-6">
                    <div className="bg-white/10 backdrop-blur-md p-3 rounded-full">
                      <Sparkles className="text-yellow-300" size={28} />
                    </div>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">Welcome to ClubVerse</h2>
                  <p className="text-xl max-w-2xl mx-auto mb-10">Discover and connect with amazing clubs, events, and opportunities in your college!</p>
                  <button
                    onClick={() => setActiveTab("events")}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:-translate-y-1 text-lg"
                  >
                    Explore Events
                  </button>
                </div>
              </header>

              {/* Featured Events Section */}
              <section className="mb-12">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-3xl font-bold">Featured Events</h2>
                    <p className="text-gray-400 mt-2">Discover the most exciting events happening on campus</p>
                  </div>
                  <button
                    onClick={() => setViewAllEvents(!viewAllEvents)}
                    className="flex items-center text-purple-400 hover:text-purple-300"
                  >
                    {viewAllEvents ? "View Less" : "View All Events"}
                    <ChevronRight size={20} />
                  </button>
                </div>

                {filteredEvents.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Calendar size={48} className="mx-auto mb-4 text-gray-600" />
                    <p>No events found. Check back later for upcoming events!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayEvents.map((event) => (
                      <div key={event._id} className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 group border border-gray-700">
                        <div className="relative h-48 overflow-hidden">
                          <img src={event.image || "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                          <div className="absolute top-4 right-4">
                            <button
                              onClick={() => toggleSaveEvent(event._id)}
                              className={`p-2 rounded-full ${event.isSaved ? 'bg-red-500 text-white' : 'bg-gray-800/90 text-gray-300'} shadow-md hover:scale-110 transition-all`}
                            >
                              <Heart size={18} fill={event.isSaved ? "currentColor" : "none"} />
                            </button>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                            <h3 className="font-bold text-lg">{event.title}</h3>
                            <p className="text-sm flex items-center">
                              <MapPin size={14} className="mr-1" />
                              {event.location}
                            </p>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-sm text-gray-400 flex items-center">
                              <CalendarDays size={14} className="mr-1" />
                              {new Date(event.date).toLocaleDateString()}
                            </span>
                            <span className="text-xs bg-purple-900/30 text-purple-300 px-2 py-1 rounded-full">
                              {event.club}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{event.description}</p>
                          <div className="flex justify-between items-center">
                            <button
                              onClick={() => handleViewDetails(event)}
                              className="text-purple-400 hover:text-purple-300 text-sm font-medium"
                            >
                              View Details
                            </button>
                            <span className="text-sm text-gray-400 flex items-center">
                              <Eye size={14} className="mr-1" />
                              {event.interested?.length || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Upcoming Events Section */}
              <section className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-3xl p-8 mb-12 border border-gray-700">
                <h2 className="text-3xl font-bold mb-8 text-center">Your Upcoming Events</h2>

                {upcomingEvents.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Clock size={48} className="mx-auto mb-4 text-gray-600" />
                    <p>No upcoming events. Register for events to see them here!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {upcomingEvents.slice(0, 2).map((event) => {
                      const eventDate = new Date(event.date);
                      const today = new Date();
                      const daysLeft = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));

                      return (
                        <div key={event._id} className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex border border-gray-700">
                          <div className="w-1/3">
                            <img src={event.image || "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"} alt={event.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="w-2/3 p-5">
                            <h3 className="font-bold text-lg mb-2 text-white">{event.title}</h3>
                            <div className="flex items-center text-sm text-gray-400 mb-2">
                              <Calendar size={14} className="mr-1" />
                              {new Date(event.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center text-sm text-gray-400 mb-4">
                              <MapPin size={14} className="mr-1" />
                              {event.location}
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm bg-blue-900/30 text-blue-300 px-2 py-1 rounded-full">
                                {daysLeft} days left
                              </span>
                              <button
                                onClick={() => handleViewDetails(event)}
                                className="text-purple-400 hover:text-purple-300 text-sm"
                              >
                                View Details
                              </button>
                            </div>
                            </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>

              {/* Clubs Section */}
              <section className="mb-12">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold mb-4">Explore Clubs</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">Join any of our vibrant clubs to pursue your interests, develop skills, and connect with like-minded students</p>
                </div>

                {clubs.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Users size={48} className="mx-auto mb-4 text-gray-600" />
                    <p>No clubs available at the moment. Check back later!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clubs.slice(0, 6).map((club) => (
                      <div key={club._id} className={`bg-gradient-to-br ${club.color || "from-purple-600 to-blue-600"} rounded-2xl shadow-lg overflow-hidden text-white transform transition-all hover:scale-105 border border-transparent`}>
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="bg-white/20 p-3 rounded-xl">
                              {club.category === "technology" && <Code2 size={24} />}
                              {club.category === "arts" && <Palette size={24} />}
                              {club.category === "sports" && <Trophy size={24} />}
                              {club.category === "music" && <Mic2 size={24} />}
                              {!["technology", "arts", "sports", "music"].includes(club.category) && <Users size={24} />}
                            </div>
                            <span className="text-sm bg-white/20 px-2 py-1 rounded-full">{club.members?.length || 0} members</span>
                          </div>
                          <h3 className="font-bold text-xl mb-2">{club.name}</h3>
                          <p className="text-sm mb-4 opacity-90">{club.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">{club.events?.length || 0} events</span>
                            {club.isMember ? (
                              <button
                                onClick={() => handleLeaveClub(club._id)}
                                className="text-sm bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full transition-colors transform hover:-translate-y-0.5"
                              >
                                Leave Club
                              </button>
                            ) : (
                              <button
                                onClick={() => handleJoinClub(club._id)}
                                className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors transform hover:-translate-y-0.5"
                              >
                                Join
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
              {/* Recommended Clubs Section */}
{userProfile.interests.length > 0 && recommendations.length > 0 && (
  <section className="mb-12">
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg mr-3">
          <Sparkles size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Recommended for You</h2>
          <p className="text-gray-400 mt-2">Clubs that match your interests and hobbies</p>
        </div>
      </div>
      <button
        onClick={() => setActiveTab("recommendations")}
        className="flex items-center text-purple-400 hover:text-purple-300"
      >
        View All
        <ChevronRight size={20} />
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recommendations.slice(0, 3).map((club) => (
        <div key={club._id} className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 border border-gray-700 relative">
          <div className="absolute top-4 right-4 z-10">
            <div className={`bg-black/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold ${getMatchColor(club.matchScore)}`}>
              {club.matchScore}% Match
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`bg-gradient-to-r ${club.color || "from-purple-600 to-blue-600"} p-3 rounded-xl text-white`}>
                {club.category === "technology" && <Code2 size={24} />}
                {club.category === "arts" && <Palette size={24} />}
                {club.category === "sports" && <Trophy size={24} />}
                {club.category === "music" && <Mic2 size={24} />}
                {club.category === "gaming" && <Gamepad2 size={24} />}
                {!["technology", "arts", "sports", "music", "gaming"].includes(club.category) && <Users size={24} />}
              </div>
              <span className="text-sm bg-gray-700 text-gray-300 px-2 py-1 rounded-full">{club.memberCount || club.members?.length || 0} members</span>
            </div>
            
            <h3 className="font-bold text-xl mb-2 text-white">{club.name}</h3>
            <p className="text-gray-400 text-sm mb-4">{club.description}</p>

            <div className="mb-4">
              <div className="flex flex-wrap gap-1 mb-2">
                {club.reasons.map((reason, index) => (
                  <span key={index} className="text-xs bg-purple-900/30 text-purple-300 px-2 py-1 rounded-full">
                    {reason}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleJoinClub(club._id)}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:-translate-y-0.5 text-sm font-medium"
            >
              Join Club
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>
)}

{/* Interest Setup Prompt */}
{userProfile.interests.length === 0 && (
  <section className="mb-12">
    <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-3xl p-8 text-center border border-gray-700">
      <div className="flex justify-center mb-4">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-full">
          <Sparkles size={32} className="text-white" />
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">Get Personalized Club Recommendations</h2>
      <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
        Tell us about your interests and hobbies to discover clubs that perfectly match your passions
      </p>
      <button
        onClick={() => setActiveTab("recommendations")}
        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:-translate-y-0.5 font-medium"
      >
        Setup My Interests
      </button>
    </div>
  </section>
)}
            </div>
          )}

          {/* Events Tab */}
          {activeTab === "events" && !selectedEvent && !showRegistrationForm && (
            <div>
              <h1 className="text-3xl font-bold mb-2">All Events</h1>
              <p className="text-gray-400 mb-8">Browse and register for upcoming events</p>

              {filteredEvents.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Calendar size={48} className="mx-auto mb-4 text-gray-600" />
                  <p>No events found. Check back later for upcoming events!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map((event) => (
                    <div key={event._id} className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 group border border-gray-700">
                      <div className="relative h-48 overflow-hidden">
                        <img src={event.image || "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        <div className="absolute top-4 right-4">
                          <button
                            onClick={() => toggleSaveEvent(event._id)}
                            className={`p-2 rounded-full ${event.isSaved ? 'bg-red-500 text-white' : 'bg-gray-800/90 text-gray-300'} shadow-md hover:scale-110 transition-all`}
                          >
                            <Heart size={18} fill={event.isSaved ? "currentColor" : "none"} />
                          </button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                          <h3 className="font-bold text-lg">{event.title}</h3>
                          <p className="text-sm flex items-center">
                            <MapPin size={14} className="mr-1" />
                            {event.location}
                          </p>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm text-gray-400 flex items-center">
                            <CalendarDays size={14} className="mr-1" />
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                          <span className="text-xs bg-purple-900/30 text-purple-300 px-2 py-1 rounded-full">
                            {event.club}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{event.description}</p>
                        <div className="flex justify-between items-center">
                          <button
                            onClick={() => handleViewDetails(event)}
                            className="text-purple-400 hover:text-purple-300 text-sm font-medium"
                          >
                            View Details
                          </button>
                          <span className="text-sm text-gray-400 flex items-center">
                            <Eye size={14} className="mr-1" />
                            {event.interested?.length || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Clubs Tab */}
          {activeTab === "clubs" && !selectedEvent && !showRegistrationForm && (
            <div>
              <h1 className="text-3xl font-bold mb-2">College Clubs</h1>
              <p className="text-gray-400 mb-8">Discover and join clubs that match your interests</p>

              {clubs.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Users size={48} className="mx-auto mb-4 text-gray-600" />
                  <p>No clubs available at the moment. Check back later!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {clubs.map((club) => (
                    <div key={club._id} className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 border border-gray-700">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`bg-gradient-to-r ${club.color || "from-purple-600 to-blue-600"} p-3 rounded-xl text-white`}>
                            {club.category === "technology" && <Code2 size={24} />}
                            {club.category === "arts" && <Palette size={24} />}
                            {club.category === "sports" && <Trophy size={24} />}
                            {club.category === "music" && <Mic2 size={24} />}
                            {!["technology", "arts", "sports", "music"].includes(club.category) && <Users size={24} />}
                          </div>
                          <span className="text-sm bg-gray-700 text-gray-300 px-2 py-1 rounded-full">{club.members?.length || 0} members</span>
                        </div>
                        <h3 className="font-bold text-xl mb-2 text-white">{club.name}</h3>
                        <p className="text-gray-400 text-sm mb-4">{club.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">{club.events?.length || 0} events</span>
                          {club.isMember ? (
                            <button
                              onClick={() => handleLeaveClub(club._id)}
                              className="bg-red-600 text-white px-4 py-2 rounded-full text-sm hover:bg-red-700 transition-all transform hover:-translate-y-0.5"
                            >
                              Leave Club
                            </button>
                          ) : (
                            <button
                              onClick={() => handleJoinClub(club._id)}
                              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm hover:from-purple-700 hover:to-blue-700 transition-all transform hover:-translate-y-0.5"
                            >
                              Join Club
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {/* Recommendations Tab */}
{activeTab === "recommendations" && !selectedEvent && !showRegistrationForm && (
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-full mr-3">
          <Brain size={28} />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Smart Club Recommendations
        </h1>
      </div>
      <p className="text-gray-400 text-lg">
        Discover clubs tailored to your interests, hobbies, and preferences
      </p>
    </div>

    {/* User Profile Setup */}
    <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Your Interests</h2>
        <button
          onClick={() => setShowInterestSelector(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:-translate-y-0.5 flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Add Interests
        </button>
      </div>

      {/* Selected Interests */}
      <div className="flex flex-wrap gap-3 mb-4">
        {userProfile.interests.map(interestId => {
          const interest = getInterestById(interestId);
          if (!interest) return null;
          return (
            <div
              key={interestId}
              className={`bg-gradient-to-r ${interest.color} px-4 py-2 rounded-full flex items-center text-white font-medium`}
            >
              {interest.icon}
              <span className="ml-2">{interest.name}</span>
              <button
                onClick={() => removeInterest(interestId)}
                className="ml-2 hover:bg-white/20 rounded-full p-1"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>

      {userProfile.interests.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Sparkles size={48} className="mx-auto mb-4" />
          <p>Add your interests to get personalized club recommendations</p>
        </div>
      )}
    </div>

    {/* Interest Selector Modal */}
    {showInterestSelector && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-2xl p-6 max-w-2xl w-full border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Select Your Interests</h3>
            <button
              onClick={() => setShowInterestSelector(false)}
              className="p-2 hover:bg-gray-700 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {availableInterests.map(interest => (
              <button
                key={interest.id}
                onClick={() => addInterest(interest.id)}
                disabled={userProfile.interests.includes(interest.id)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  userProfile.interests.includes(interest.id)
                    ? 'border-green-500 bg-green-900/30'
                    : 'border-gray-600 hover:border-purple-500 hover:bg-gray-700'
                }`}
              >
                <div className={`bg-gradient-to-r ${interest.color} p-2 rounded-lg mb-2 w-fit mx-auto`}>
                  {interest.icon}
                </div>
                <p className="font-medium text-sm">{interest.name}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    )}

    {/* Filter Options */}
    {userProfile.interests.length > 0 && (
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Filter size={20} className="text-gray-400" />
          <select
            value={recommendationType}
            onChange={(e) => setRecommendationType(e.target.value)}
            className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Categories</option>
            {availableInterests.map(interest => (
              <option key={interest.id} value={interest.id}>
                {interest.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="text-sm text-gray-400">
          {recommendations.length} recommendations found
        </div>
      </div>
    )}

    {/* Loading State */}
    {isLoadingRecommendations && (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
        <p className="text-gray-400">Analyzing your preferences...</p>
      </div>
    )}

    {/* Recommendations Grid */}
    {!isLoadingRecommendations && recommendations.length > 0 && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {recommendations.map(club => (
          <div
            key={club._id}
            className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all transform hover:-translate-y-1"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-gradient-to-r ${club.color || "from-purple-600 to-blue-600"} p-3 rounded-xl text-white`}>
                  {club.category === "technology" && <Code2 size={24} />}
                  {club.category === "arts" && <Palette size={24} />}
                  {club.category === "sports" && <Trophy size={24} />}
                  {club.category === "music" && <Mic2 size={24} />}
                  {club.category === "gaming" && <Gamepad2 size={24} />}
                  {!["technology", "arts", "sports", "music", "gaming"].includes(club.category) && <Users size={24} />}
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${getMatchColor(club.matchScore)}`}>
                    {club.matchScore}%
                  </div>
                  <div className={`text-xs ${getMatchColor(club.matchScore)}`}>
                    {getMatchLabel(club.matchScore)}
                  </div>
                </div>
              </div>

              <h3 className="font-bold text-xl mb-2 text-white">{club.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{club.description}</p>

              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500 text-sm flex items-center">
                  <Users size={14} className="mr-1" />
                  {club.memberCount || club.members?.length || 0} members
                </span>
                <span className="text-gray-500 text-sm">
                  {club.events?.length || 0} events
                </span>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-sm mb-2 text-white">Why we recommend this:</h4>
                <div className="flex flex-wrap gap-1">
                  {club.reasons.map((reason, index) => (
                    <span
                      key={index}
                      className="text-xs bg-purple-900/30 text-purple-300 px-2 py-1 rounded-full"
                    >
                      {reason}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button 
                  onClick={() => handleJoinClub(club._id)}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:-translate-y-0.5 text-sm font-medium"
                >
                  Join Club
                </button>
                <button className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-all text-sm">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* No Recommendations */}
    {!isLoadingRecommendations && userProfile.interests.length > 0 && recommendations.length === 0 && (
      <div className="text-center py-12">
        <Search size={48} className="mx-auto mb-4 text-gray-600" />
        <p className="text-gray-500 mb-2">No clubs found for your current interests</p>
        <p className="text-gray-600 text-sm">Try adding more interests or adjusting your filters</p>
      </div>
    )}

    {/* Algorithm Explanation */}
    {recommendations.length > 0 && (
      <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold mb-4 flex items-center text-white">
          <Brain size={24} className="mr-2 text-purple-400" />
          How We Calculate Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="bg-blue-900/30 p-3 rounded-lg mb-2">
              <Target size={24} className="mx-auto text-blue-400" />
            </div>
            <h4 className="font-medium mb-1 text-white">Interest Match</h4>
            <p className="text-gray-400">40% weight based on your selected interests</p>
          </div>
          <div className="text-center">
            <div className="bg-green-900/30 p-3 rounded-lg mb-2">
              <Zap size={24} className="mx-auto text-green-400" />
            </div>
            <h4 className="font-medium mb-1 text-white">Activity Match</h4>
            <p className="text-gray-400">30% weight from matching hobbies and skills</p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-900/30 p-3 rounded-lg mb-2">
              <TrendingUp size={24} className="mx-auto text-yellow-400" />
            </div>
            <h4 className="font-medium mb-1 text-white">Community Size</h4>
            <p className="text-gray-400">20% weight from active membership</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-900/30 p-3 rounded-lg mb-2">
              <Star size={24} className="mx-auto text-purple-400" />
            </div>
            <h4 className="font-medium mb-1 text-white">Personalization</h4>
            <p className="text-gray-400">10% weight from your activity patterns</p>
          </div>
        </div>
      </div>
    )}
  </div>
)}

          {/* Applied Events Tab */}
          {activeTab === "applied" && !selectedEvent && !showRegistrationForm && (
            <div>
              <h1 className="text-3xl font-bold mb-2">Your Applied Events</h1>
              <p className="text-gray-400 mb-8">Track the status of your event applications</p>

              {appliedEvents.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Calendar size={48} className="mx-auto mb-4 text-gray-600" />
                  <p>You haven't applied to any events yet. Browse events and apply to see them here!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {appliedEvents.map((appliedEvent) => (
                    <div key={appliedEvent._id} className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex border border-gray-700">
                      <div className="w-1/4">
                        <img src={appliedEvent.event?.image || "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"} alt={appliedEvent.event?.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="w-3/4 p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-bold text-xl text-white">{appliedEvent.event?.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm ${appliedEvent.status === 'approved' ? 'bg-green-900/30 text-green-300' : 'bg-yellow-900/30 text-yellow-300'}`}>
                            {appliedEvent.status === 'approved' ? 'Approved' : 'Pending'}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center text-gray-400">
                            <Calendar size={16} className="mr-2" />
                            {new Date(appliedEvent.event?.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-gray-400">
                            <Clock size={16} className="mr-2" />
                            {appliedEvent.event?.time}
                          </div>
                          <div className="flex items-center text-gray-400">
                            <MapPin size={16} className="mr-2" />
                            {appliedEvent.event?.location}
                          </div>
                          <div className="flex items-center text-gray-400">
                            <Users size={16} className="mr-2" />
                            {appliedEvent.event?.club}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">
                            Applied on: {new Date(appliedEvent.applicationDate).toLocaleDateString()}
                          </span>
                          <button
                            onClick={() => handleViewDetails(appliedEvent.event)}
                            className="text-purple-400 hover:text-purple-300"
                          >
                            View Details
                          </button>
                        </div>
                      </div>

                    
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && !selectedEvent && !showRegistrationForm && (
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
              <p className="text-gray-400 mb-8">Manage your account information and preferences</p>

              <div className="bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-700">
                <div className="flex items-center mb-8">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center mr-6">
                    <User size={32} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                    <p className="text-gray-400">{user.email}</p>
                    <p className="text-gray-400 capitalize">{user.department} Department</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-700/50 p-4 rounded-xl">
                    <h3 className="font-semibold text-white mb-2">Student Information</h3>
                    <div className="space-y-2">
                      <p className="text-gray-400"><span className="font-medium">Student ID:</span> {user.studentId}</p>
                      <p className="text-gray-400"><span className="font-medium">Department:</span> {user.department}</p>
                      <p className="text-gray-400"><span className="font-medium">Member Since:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="bg-gray-700/50 p-4 rounded-xl">
                    <h3 className="font-semibold text-white mb-2">Activity Summary</h3>
                    <div className="space-y-2">
                      <p className="text-gray-400"><span className="font-medium">Events Applied:</span> {appliedEvents.length}</p>
                      <p className="text-gray-400"><span className="font-medium">Clubs Joined:</span> {clubs.filter(c => c.isMember).length}</p>
                      <p className="text-gray-400"><span className="font-medium">Events Saved:</span> {savedEvents.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700/50 p-4 rounded-xl mb-8">
                  <h3 className="font-semibold text-white mb-4">Account Settings</h3>
                  <div className="space-y-4">
                    <button className="w-full text-left py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors text-white">
                      Edit Profile Information
                    </button>
                    <button className="w-full text-left py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors text-white">
                      Change Password
                    </button>
                    <button className="w-full text-left py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors text-white">
                      Notification Preferences
                    </button>
                    <button className="w-full text-left py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors text-white">
                      Privacy Settings
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-2 rounded-lg hover:from-red-700 hover:to-orange-700 transition-all transform hover:-translate-y-0.5">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Event Detail View */}
          {selectedEvent && !showRegistrationForm && (
            <div className="max-w-6xl mx-auto">
              <button
                onClick={() => setSelectedEvent(null)}
                className="flex items-center text-purple-400 hover:text-purple-300 mb-6"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Events
              </button>

              <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
                <div className="relative h-80">
                  <img
                    src={selectedEvent.image || "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h1 className="text-3xl font-bold mb-2">{selectedEvent.title}</h1>
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="flex items-center">
                        <MapPin size={18} className="mr-1" />
                        {selectedEvent.location}
                      </span>
                      <span className="flex items-center">
                        <Calendar size={18} className="mr-1" />
                        {new Date(selectedEvent.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Clock size={18} className="mr-1" />
                        {selectedEvent.time}
                      </span>
                      <span className="bg-purple-900/30 text-purple-300 px-3 py-1 rounded-full text-sm">
                        {selectedEvent.club}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSaveEvent(selectedEvent._id)}
                    className={`absolute top-6 right-6 p-3 rounded-full ${selectedEvent.isSaved ? 'bg-red-500 text-white' : 'bg-gray-800/90 text-gray-300'} shadow-md hover:scale-110 transition-all`}
                  >
                    <Heart size={20} fill={selectedEvent.isSaved ? "currentColor" : "none"} />
                  </button>
                </div>

                <div className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <h2 className="text-2xl font-bold mb-4 text-white">About This Event</h2>
                      <p className="text-gray-400 mb-6">{selectedEvent.description}</p>

                      <h3 className="text-xl font-bold mb-4 text-white">Event Highlights</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                        {selectedEvent.highlights && selectedEvent.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle size={18} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-gray-400">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="lg:col-span-1">
                      <div className="bg-gray-700 rounded-xl p-6 mb-6 border border-gray-600">
                        <h3 className="text-xl font-bold mb-4 text-white">Event Details</h3>
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <Calendar className="text-purple-400 mr-3" size={20} />
                            <div>
                              <p className="font-medium text-white">Date & Time</p>
                              <p className="text-gray-400">{new Date(selectedEvent.date).toLocaleDateString()} • {selectedEvent.time}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="text-purple-400 mr-3" size={20} />
                            <div>
                              <p className="font-medium text-white">Location</p>
                              <p className="text-gray-400">{selectedEvent.location}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Users className="text-purple-400 mr-3" size={20} />
                            <div>
                              <p className="font-medium text-white">Organizer</p>
                              <p className="text-gray-400">{selectedEvent.club}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Eye className="text-purple-400 mr-3" size={20} />
                            <div>
                              <p className="font-medium text-white">Interested</p>
                              <p className="text-gray-400">{selectedEvent.interested?.length || 0} people are attending</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRegister(selectedEvent)}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3.5 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg transform hover:-translate-y-0.5"
                      >
                        Register Now
                      </button>

                      <button className="w-full mt-4 flex items-center justify-center text-gray-400 hover:text-purple-400">
                        <Share2 size={18} className="mr-2" />
                        Share Event
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Registration Form */}
          {showRegistrationForm && (
            <div className="max-w-4xl mx-auto">
              <button
                onClick={() => setShowRegistrationForm(false)}
                className="flex items-center text-purple-400 hover:text-purple-300 mb-6"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Event
              </button>

              <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
                <h1 className="text-3xl font-bold mb-2 text-white">Register for {selectedEvent.title}</h1>
                <p className="text-gray-400 mb-8">Please fill out the form below to complete your registration</p>

                <form onSubmit={handleSubmitRegistration} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">First Name</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Last Name</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Email Address</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="your.email@example.com"
                      defaultValue={user.email}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="+91 39459 56730"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Branch/Department</label>
                      <select
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        defaultValue={user.department || ""}
                      >
                        <option value="">Select your branch</option>
                        <option value="cs">Computer Science</option>
                        <option value="it">Information Technology</option>
                        <option value="ece">Electronics & Communication</option>
                        <option value="mech">Mechanical Engineering</option>
                        <option value="civil">Civil Engineering</option>
                        <option value="eee">Electrical Engineering</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Academic Year</label>
                      <select
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Select your year</option>
                        <option value="1">First Year</option>
                        <option value="2">Second Year</option>
                        <option value="3">Third Year</option>
                        <option value="4">Fourth Year</option>
                        <option value="5">Fifth Year</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Why are you interested in this event?</label>
                    <textarea
                      rows="3"
                      className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Share your motivation for attending this event..."
                    ></textarea>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      required
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-gray-700"
                      id="terms"
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
                      I agree to the terms and conditions and privacy policy
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3.5 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all shadow-md transform hover:-translate-y-0.5"
                  >
                    Submit Registration
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Main App Component
export default function CollegeClubConnect() {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [appliedEvents, setAppliedEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load user from localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Load data when user is logged in
  useEffect(() => {
    if (user) {
      loadInitialData();
    }
  }, [user]);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      const [eventsResponse, clubsResponse, appliedResponse] = await Promise.all([
        eventsAPI.getAll(),
        clubsAPI.getAll(),
        studentsAPI.getAppliedEvents()
      ]);

      setEvents(eventsResponse.data.events);
      setClubs(clubsResponse.data);
      setAppliedEvents(appliedResponse.data);

      // Filter upcoming events (next 30 days)
      const today = new Date();
      const nextMonth = new Date();
      nextMonth.setDate(today.getDate() + 30);

      const upcoming = eventsResponse.data.events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= today && eventDate <= nextMonth;
      });

      setUpcomingEvents(upcoming);
    } catch (error) {
      console.error("Error loading initial data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleSignup = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setEvents([]);
    setClubs([]);
    setAppliedEvents([]);
    setUpcomingEvents([]);
  };

  // Show authentication screens if not logged in
  if (!user) {
    return isLogin ? (
      <Login onLogin={handleLogin} onSwitchToSignup={() => setIsLogin(false)} />
    ) : (
      <Signup onSignup={handleSignup} onSwitchToLogin={() => setIsLogin(true)} />
    );
  }

  // Show admin dashboard for admin users
  if (user.role === "admin") {
    return (
      <AdminDashboard
        user={user}
        onLogout={handleLogout}
      />
    );
  }

  // Show DSW dashboard for DSW users
  if (user.role === "dsw") {
    return (
      <DSWDashboard
        user={user}
        onLogout={handleLogout}
      />
    );
  }

  // For regular students, show the student dashboard
  return (
  <StudentDashboard
    user={user}
    onLogout={handleLogout}
    events={events}
    clubs={clubs}
    setClubs={setClubs}
    setEvents={setEvents}
    appliedEvents={appliedEvents}
    setAppliedEvents={setAppliedEvents}
    upcomingEvents={upcomingEvents}
  />
);
}