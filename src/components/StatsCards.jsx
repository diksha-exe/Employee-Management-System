import {
  Users,
  Building2,
  UserCheck,
  Wallet,
} from "lucide-react";

function StatsCards({ employees }) {
  const totalEmployees = employees.length;

  const departments = new Set(
    employees.map((employee) => employee.department)
  ).size;

  const totalSalary = employees.reduce(
    (total, employee) =>
      total + Number(employee.salary || 0),
    0
  );

  const averageSalary =
    totalEmployees > 0
      ? totalSalary / totalEmployees
      : 0;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const cards = [
    {
      title: "Total Employees",
      value: totalEmployees,
      icon: Users,
      description: "Active employee records",
    },
    {
      title: "Departments",
      value: departments,
      icon: Building2,
      description: "Across the organization",
    },
    {
      title: "Employees Added",
      value: totalEmployees,
      icon: UserCheck,
      description: "Currently registered",
    },
    {
      title: "Avg. Salary",
      value: formatCurrency(averageSalary),
      icon: Wallet,
      description: "Average annual salary",
    },
  ];

  return (
    <div className="stats-grid">

      {cards.map((card) => {

        const Icon = card.icon;

        return (
          <div className="stat-card" key={card.title}>

            <div className="stat-top">

              <div className="stat-icon">
                <Icon size={20} />
              </div>

            </div>

            <div className="stat-value">
              {card.value}
            </div>

            <div className="stat-title">
              {card.title}
            </div>

            <div className="stat-description">
              {card.description}
            </div>

          </div>
        );
      })}

    </div>
  );
}

export default StatsCards;