import classNames from 'classnames/bind';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import styles from './Chart.module.scss';

const cx = classNames.bind(styles);

const Chart = ({ aspect, title }) => {
    const data = [
        { name: 'January', Total: 1200 },
        { name: 'February', Total: 2100 },
        { name: 'March', Total: 800 },
        { name: 'April', Total: 1600 },
        { name: 'May', Total: 900 },
        { name: 'June', Total: 1700 },
    ];
    return (
        <div className={cx('chart')}>
            <div className={cx('title')}>{title}</div>
            <ResponsiveContainer width="100%" aspect={aspect}>
                <AreaChart width={730} height={250} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <CartesianGrid strokeDasharray="3 3" className={cx('chart-grid', 'stroke')} />
                    <Tooltip />
                    <Area type="monotone" dataKey="Total" fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
export default Chart;
