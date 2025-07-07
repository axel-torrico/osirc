const StatCard = ({ title, value, color, subtitle }) => (
  <div className="border-2 border-gray-600 rounded-xl p-6 hover:border-gray-500 transition-colors">
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <div className={`text-3xl font-bold ${color}`}>{value}</div>
    <p className="text-gray-400 text-sm mt-2">{subtitle}</p>
  </div>
);

export default StatCard;
