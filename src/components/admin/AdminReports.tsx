import { DollarSign, TrendingUp, Users, Calendar, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export function AdminReports() {
  const stats = [
    { label: 'Ingresos Totales', value: '$5,240,000', change: '+12.5%', color: 'bg-emerald-500', icon: <DollarSign className="w-6 h-6 text-white" /> },
    { label: 'Reservas del Mes', value: '156', change: '+8.2%', color: 'bg-blue-500', icon: <Calendar className="w-6 h-6 text-white" /> },
    { label: 'Usuarios Activos', value: '423', change: '+15.3%', color: 'bg-purple-500', icon: <Users className="w-6 h-6 text-white" /> },
    { label: 'Tasa de Ocupación', value: '78%', change: '+5.1%', color: 'bg-orange-500', icon: <TrendingUp className="w-6 h-6 text-white" /> },
  ];

  const monthlyRevenue = [
    { month: 'Ene', ingresos: 3200000 },
    { month: 'Feb', ingresos: 3800000 },
    { month: 'Mar', ingresos: 4100000 },
    { month: 'Abr', ingresos: 3900000 },
    { month: 'May', ingresos: 4500000 },
    { month: 'Jun', ingresos: 4800000 },
    { month: 'Jul', ingresos: 5100000 },
    { month: 'Ago', ingresos: 4900000 },
    { month: 'Sep', ingresos: 5300000 },
    { month: 'Oct', ingresos: 5600000 },
    { month: 'Nov', ingresos: 5200000 },
    { month: 'Dic', ingresos: 5240000 },
  ];

  const bookingsBySport = [
    { name: 'Fútbol', value: 45 },
    { name: 'Tenis', value: 28 },
    { name: 'Baloncesto', value: 18 },
    { name: 'Vóleibol', value: 12 },
    { name: 'Pádel', value: 15 },
    { name: 'Otros', value: 8 },
  ];

  const occupancyByDay = [
    { day: 'Lun', ocupacion: 65 },
    { day: 'Mar', ocupacion: 72 },
    { day: 'Mié', ocupacion: 78 },
    { day: 'Jue', ocupacion: 85 },
    { day: 'Vie', ocupacion: 92 },
    { day: 'Sáb', ocupacion: 95 },
    { day: 'Dom', ocupacion: 88 },
  ];

  const topCourts = [
    { name: 'Cancha Fútbol Premium', bookings: 45, revenue: 3600000 },
    { name: 'Cancha Tenis Club Campestre', bookings: 38, revenue: 2280000 },
    { name: 'Baloncesto Arena Central', bookings: 32, revenue: 2240000 },
    { name: 'Pádel Sport Complex', bookings: 28, revenue: 1820000 },
    { name: 'Vóleibol Playa Palogrande', bookings: 25, revenue: 1250000 },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#6b7280'];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-gray-900 text-3xl mb-2">Reportes y Estadísticas</h1>
          <p className="text-gray-600">Analiza el rendimiento del centro deportivo</p>
        </div>
        <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2">
          <Download className="w-5 h-5" />
          Exportar Reporte
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                {stat.icon}
              </div>
              <span className="text-emerald-600 text-sm">{stat.change}</span>
            </div>
            <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
            <p className="text-gray-900 text-3xl">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Revenue */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-gray-900 text-xl mb-6">Ingresos Mensuales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => `$${value.toLocaleString('es-CO')} COP`}
              />
              <Line type="monotone" dataKey="ingresos" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bookings by Sport */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-gray-900 text-xl mb-6">Reservas por Deporte</h2>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={bookingsBySport}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {bookingsBySport.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Occupancy by Day */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-gray-900 text-xl mb-6">Ocupación por Día de la Semana</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={occupancyByDay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(value: number) => `${value}%`} />
              <Bar dataKey="ocupacion" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Courts */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-gray-900 text-xl mb-6">Canchas Más Reservadas</h2>
          <div className="space-y-4">
            {topCourts.map((court, idx) => (
              <div key={idx} className="flex items-center justify-between pb-4 border-b border-gray-200 last:border-0">
                <div className="flex-1">
                  <p className="text-gray-900 mb-1">{court.name}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{court.bookings} reservas</span>
                    <span>•</span>
                    <span>${court.revenue.toLocaleString('es-CO')} COP</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full"
                      style={{ width: `${(court.bookings / 50) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-gray-900 text-xl">Resumen Mensual por Cancha</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-gray-700">Cancha</th>
                <th className="px-6 py-4 text-left text-gray-700">Reservas</th>
                <th className="px-6 py-4 text-left text-gray-700">Horas Totales</th>
                <th className="px-6 py-4 text-left text-gray-700">Ocupación</th>
                <th className="px-6 py-4 text-left text-gray-700">Ingresos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topCourts.map((court, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{court.name}</td>
                  <td className="px-6 py-4 text-gray-900">{court.bookings}</td>
                  <td className="px-6 py-4 text-gray-900">{court.bookings * 1.5}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-emerald-500 h-2 rounded-full"
                          style={{ width: `${(court.bookings / 50) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-gray-900">{Math.round((court.bookings / 50) * 100)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    ${court.revenue.toLocaleString('es-CO')} COP
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
