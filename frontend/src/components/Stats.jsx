/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
import React, { useEffect, useState } from 'react'

const Stats = () => {

    const [stats, setStats] = useState({
        availableBalance: 0,
        pendingBalance: 0,
        totalCharges: 0,
    })
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        const fetchStats = async () =>{
            try {
                const response = await fetch('http://localhost:5000/stripe/api/stats');

                if(!response.ok){
                    throw new Error("Network response was not ok")
                }

                const data = await response.json();
                setStats(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch stats:', error);
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const formatCurrency = (value) => {
        return `${value.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        })}`
    };
  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-2 grid-cols-3 gap-8 my-8'>
          <div className='stats bg-primary text-primary-content'>
            <div className='stat'>
                <div className='stat-title text-base-100'>Available Balance</div>
                <div className='stat-value'>{loading ? 'loading....' : formatCurrency(stats.availableBalance)}</div>
            </div>
          </div>

          <div className='stats bg-secondary text-secondary-content'>
            <div className='stat'>
                <div className='stat-title text-base-100'>Pending Balance</div>
                <div className='stat-value'>{loading ? 'loading....' : formatCurrency(stats.pendingBalance)}</div>
            </div>
          </div>

          <div className='stats shadow bg-accent text-secondary-content'>
            <div className='stat'>
                <div className='stat-title text-base-100'>Total Purchases</div>
                <div className='stat-value'>{loading ? 'loading....' : formatCurrency(stats.totalCharges)}</div>
                <div className='stat-desc'>21% more than last month</div>
            </div>
          </div>
    </div>
  )
}

export default Stats
