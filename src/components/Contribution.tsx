import { useState, useEffect } from "react";
import { courseGroups } from "@/components/ui/courseData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getAuth } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useSidebar } from "../components/SideBar";

const Contributions = () => {
  const [monthlyCategoryCounts, setMonthlyCategoryCounts] = useState<
    Record<string, Record<string, number>>
  >({});
  const [totalContributions, setTotalContributions] = useState(0);
  const [monthlyContributions, setMonthlyContributions] = useState(0);

  useEffect(() => {
    const fetchContributions = async () => {
      const user = getAuth().currentUser;
      if (!user) return;

      const contributionsRef = collection(
        db,
        "users",
        user.uid,
        "contributions"
      );
      const snapshot = await getDocs(contributionsRef);

      const monthlyCounts: Record<string, Record<string, number>> = {};
      let total = 0;
      let monthlyTotal = 0;
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      snapshot.forEach((doc) => {
        const data = doc.data();
        const category = data.category;
        const timestamp = data.timestamp?.toDate?.();
        if (category && timestamp) {
          const month = `${timestamp.getFullYear()}-${String(
            timestamp.getMonth() + 1
          ).padStart(2, "0")}`;
          if (!monthlyCounts[month]) monthlyCounts[month] = {};
          monthlyCounts[month][category] =
            (monthlyCounts[month][category] || 0) + 1;

          total += 1;
          if (timestamp >= thirtyDaysAgo) monthlyTotal += 1;
        }
      });

      setMonthlyCategoryCounts(monthlyCounts);
      setTotalContributions(total);
      setMonthlyContributions(monthlyTotal);
    };

    fetchContributions();
  }, []);
  const { collapsed } = useSidebar();

  return (
    <div
      className={`container mx-auto p-6 ${
        collapsed ? "pl-[130]" : "pl-[180px]"
      } transition-all duration-300`}
    >
      <h1 className="text-3xl font-bold mb-6">Total Contributions</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Problems Helped</CardTitle>
            <CardDescription>All time contributions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalContributions}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>This Month</CardTitle>
            <CardDescription>
              Problems helped in the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{monthlyContributions}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Most Active Category</CardTitle>
            <CardDescription>
              Where you've helped the most this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              {(() => {
                const categorySums: Record<string, number> = {};
                Object.values(monthlyCategoryCounts).forEach((categories) => {
                  for (const [cat, count] of Object.entries(categories)) {
                    categorySums[cat] = (categorySums[cat] || 0) + count;
                  }
                });
                const sorted = Object.entries(categorySums).sort(
                  (a, b) => b[1] - a[1]
                );
                return sorted.length
                  ? `${sorted[0][0]} (${sorted[0][1]})`
                  : "No contributions";
              })()}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Contribution History</CardTitle>
            <CardDescription>Problems helped over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={Object.entries(monthlyCategoryCounts).map(
                  ([month, categories]) => ({
                    name: month,
                    contributions: Object.values(categories).reduce(
                      (a, b) => a + b,
                      0
                    ),
                  })
                )}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="contributions"
                  stroke="#9b87f5"
                  fill="#9b87f5"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contributions by Category</CardTitle>
            <CardDescription>Problem areas you've helped with</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.keys(courseGroups).map((category) => {
                const count = Object.values(monthlyCategoryCounts).reduce(
                  (sum, monthData) => {
                    return sum + (monthData[category] || 0);
                  },
                  0
                );

                const maxCount = Math.max(
                  1,
                  ...Object.keys(courseGroups).map((cat) =>
                    Object.values(monthlyCategoryCounts).reduce(
                      (sum, monthData) => sum + (monthData[cat] || 0),
                      0
                    )
                  )
                );

                return (
                  <div
                    key={category}
                    className="flex items-center justify-between"
                  >
                    <span>{category}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${(count / maxCount) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contributions;
