import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaBook, FaDollarSign, FaUsers } from "react-icons/fa";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    LabelList,
    Label,
    Tooltip,
    PieChart, Pie, Sector,
    Legend
} from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink', 'black'];

// const colors = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', 'url(#pattern-checkers)'];

const AdminHome = ({ isAnimationActive = true }) => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            // console.log('data: stats', res.data);
            return res.data;
        }
    })

    const { data: chartData = [] } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/order-stats');
            return res.data;
        }
    })

    // #endregion
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
    };

    // custom shape bar chart 
    const TriangleBar = (BarShapeProps) => {
        const { x, y, width, height, index } = BarShapeProps;

        const color = colors[index % colors.length];

        return (
            <path
                strokeWidth={BarShapeProps.isActive ? 5 : 0}
                d={getPath(Number(x), Number(y), Number(width), Number(height))}
                stroke={color}
                fill={color}
                style={{
                    transition: 'stroke-width 0.3s ease-out',
                }}
            />
        );
    };

    const CustomColorLabel = (LabelProps) => {
        const fill = colors[(LabelProps.index ?? 0) % colors.length];
        return <Label {...LabelProps} fill={fill} />;
    };

    // CellPieExample
    const MyCustomPie = (PieSectorShapeProps) => <Sector {...PieSectorShapeProps} fill={colors[PieSectorShapeProps.index % colors.length]} />;

    const MyCustomLabel = (LabelProps) => (
        <Label {...LabelProps} fill={colors[(LabelProps.index ?? 0) % colors.length]} position="outside" offset={20} />
    );

    const pieChartData = chartData.map(data => {
        return { name: data.category, value: data.revenue };
    })


    return (
        <div>
            <h2 className="text-3xl">
                <span>Hi, Welcome </span>
                {
                    user?.displayName ? user.displayName : 'Back'
                }
            </h2>
            <div className="stats shadow">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaDollarSign className="text-3xl"></FaDollarSign>
                    </div>
                    <div className="stat-title">Revenue</div>
                    <div className="stat-value">${stats.revenue}</div>
                    <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUsers className="text-3xl"></FaUsers>
                    </div>
                    <div className="stat-title">Users</div>
                    <div className="stat-value">{stats.users}</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>


                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaBook className="text-3xl"></FaBook>
                    </div>
                    <div className="stat-title">Menu Items</div>
                    <div className="stat-value">{stats.menuItems}</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-8 w-8 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                            ></path>
                        </svg>
                    </div>
                    <div className="stat-title">Orders</div>
                    <div className="stat-value">{stats.orders}</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
            </div>
            <div className="flex">
                <div className="w-1/2">
                    <BarChart
                        style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
                        responsive
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 0,
                            left: 0,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip cursor={{ fillOpacity: 0.5 }} />
                        <XAxis dataKey="category" />
                        <YAxis width="auto" />
                        <Bar dataKey="totalItemsSold" fill="#8884d8" shape={TriangleBar} activeBar>
                            <LabelList content={CustomColorLabel} position="top" />
                        </Bar>

                    </BarChart>
                </div>
                <div className="w-1/2">
                    <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '70vh', aspectRatio: 1 }} responsive>
                        <defs>
                            <pattern id="pattern-checkers" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                                <rect className="checker" x="0" width="5" height="5" y="0" />
                                <rect className="checker" x="10" width="5" height="5" y="10" />
                            </pattern>
                        </defs>
                        <Pie data={pieChartData} isAnimationActive={isAnimationActive} shape={MyCustomPie}>
                            <LabelList content={MyCustomLabel} />
                        </Pie>
                        {/* <RechartsDevtools /> */}
                        <Legend></Legend>
                    </PieChart>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;