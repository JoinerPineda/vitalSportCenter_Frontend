import { Search, UserPlus, Edit2, Trash2, Shield, User } from 'lucide-react';
import { useState } from 'react';

export function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const users = [
    { id: 1, name: 'Juan Carlos Rodríguez', email: 'juan.rodriguez@email.com', phone: '+57 312 456 7890', role: 'client', bookings: 12, status: 'active' },
    { id: 2, name: 'María López García', email: 'maria.lopez@email.com', phone: '+57 310 234 5678', role: 'client', bookings: 8, status: 'active' },
    { id: 3, name: 'Carlos Méndez', email: 'carlos.mendez@email.com', phone: '+57 311 987 6543', role: 'client', bookings: 15, status: 'active' },
    { id: 4, name: 'Ana Martínez', email: 'ana.martinez@email.com', phone: '+57 313 456 7890', role: 'client', bookings: 5, status: 'active' },
    { id: 5, name: 'Pedro González', email: 'admin@vitalsport.com', phone: '+57 314 567 8901', role: 'admin', bookings: 0, status: 'active' },
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-gray-900 text-3xl mb-2">Gestión de Usuarios</h1>
          <p className="text-gray-600">Administra los usuarios del sistema</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2"
        >
          <UserPlus className="w-5 h-5" />
          Nuevo Usuario
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por nombre o correo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
            <option>Todos los roles</option>
            <option>Clientes</option>
            <option>Administradores</option>
          </select>
          <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
            <option>Todos los estados</option>
            <option>Activos</option>
            <option>Inactivos</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-gray-700">Usuario</th>
                <th className="px-6 py-4 text-left text-gray-700">Contacto</th>
                <th className="px-6 py-4 text-left text-gray-700">Rol</th>
                <th className="px-6 py-4 text-left text-gray-700">Reservas</th>
                <th className="px-6 py-4 text-left text-gray-700">Estado</th>
                <th className="px-6 py-4 text-left text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        {user.role === 'admin' ? (
                          <Shield className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <User className="w-5 h-5 text-emerald-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-gray-900">{user.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{user.email}</p>
                    <p className="text-gray-600 text-sm">{user.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    {user.role === 'admin' ? (
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                        Administrador
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        Cliente
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-900">{user.bookings}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                      Activo
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <h2 className="text-gray-900 text-2xl mb-6">Agregar Nuevo Usuario</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Nombre completo</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Juan Pérez"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Correo electrónico</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="juan@email.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Teléfono</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="+57 312 456 7890"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Rol</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                  <option>Cliente</option>
                  <option>Administrador</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
