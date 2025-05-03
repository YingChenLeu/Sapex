import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for contributions
const mockContributionData = [
  { name: 'Jan', contributions: 4 },
  { name: 'Feb', contributions: 7 },
  { name: 'Mar', contributions: 5 },
  { name: 'Apr', contributions: 10 },
  { name: 'May', contributions: 8 },
  { name: 'Jun', contributions: 12 },
  { name: 'Jul', contributions: 9 },
  { name: 'Aug', contributions: 11 },
  { name: 'Sep', contributions: 6 },
  { name: 'Oct', contributions: 14 },
  { name: 'Nov', contributions: 13 },
  { name: 'Dec', contributions: 15 }
];

// Contribution by category mock data
const contributionsByCategory = [
  { category: "Mathematics", count: 15 },
  { category: "Sciences", count: 8 },
  { category: "English", count: 6 },
  { category: "Programming", count: 12 },
  { category: "Foreign Language", count: 4 }
];

const Contributions = () => {
  const [totalContributions, setTotalContributions] = useState(0);

  useEffect(() => {
    // Calculate total contributions from mock data
    const total = mockContributionData.reduce((sum, item) => sum + item.contributions, 0);
    setTotalContributions(total);
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Total Contributions of Your School</h1>
      
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
            <CardDescription>Problems helped in the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">12</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Likes Received</CardTitle>
            <CardDescription>From students you've helped</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">42</p>
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
                data={mockContributionData}
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
              {contributionsByCategory.map((item) => (
                <div key={item.category} className="flex items-center justify-between">
                  <span>{item.category}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary" 
                        style={{ 
                          width: `${(item.count / Math.max(...contributionsByCategory.map(c => c.count))) * 100}%` 
                        }} 
                      />
                    </div>
                    <span className="text-sm">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contributions;