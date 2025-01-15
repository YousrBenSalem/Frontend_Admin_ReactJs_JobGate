import React from 'react';
import { FaUserAlt, FaUsers, FaRegHandshake, FaMoneyBillAlt, FaCheckCircle, FaTimesCircle, FaChartBar, FaHandsHelping } from 'react-icons/fa';
import { ProgressBar } from 'react-bootstrap';
const Layout = () => {
  const stats = {
    total_candidates: 120,
    accepted_candidates: 80,
    pending_candidates: 40,
    total_companies: 25,
    total_offers: 50,
    accepted_offers: 35,
    pending_offers: 15,
    total_interviews: 70,
    successful_interviews: 50,
    rejected_candidates: 10,
    total_revenue: 50000,
  };

  return (
  <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-8 bg-gray-50">

      {/* Total Candidates Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-500 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <FaUserAlt className="text-4xl text-blue-500" />
          <div className="text-xl font-semibold text-gray-700">Total Candidates</div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-2xl font-bold">{stats.total_candidates}</p>
          <ProgressBar now={(stats.total_candidates / 200) * 100} variant="success" />
        </div>
      </div>

      {/* Accepted Candidates Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-500 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <FaCheckCircle className="text-4xl text-green-500" />
          <div className="text-xl font-semibold text-gray-700">Accepted Candidates</div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-2xl font-bold">{stats.accepted_candidates}</p>
          <ProgressBar now={(stats.accepted_candidates / stats.total_candidates) * 100} variant="success" />
        </div>
      </div>

      {/* Pending Candidates Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-yellow-500 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <FaUsers className="text-4xl text-yellow-500" />
          <div className="text-xl font-semibold text-gray-700">Pending Candidates</div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-2xl font-bold">{stats.pending_candidates}</p>
          <ProgressBar now={(stats.pending_candidates / 100) * 100} variant="warning" />
        </div>
      </div>

      {/* Total Companies Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-500 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <FaUsers className="text-4xl text-indigo-500" />
          <div className="text-xl font-semibold text-gray-700">Total Companies</div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-2xl font-bold">{stats.total_companies}</p>
          <ProgressBar now={(stats.total_companies / 100) * 100} variant="warning" />

        </div>
      </div>

      {/* Total Offers Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-purple-500 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <FaRegHandshake className="text-4xl text-purple-500" />
          <div className="text-xl font-semibold text-gray-700">Total Offers</div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-2xl font-bold">{stats.total_offers}</p>
          <ProgressBar now={(stats.total_offers / 100) * 100} variant="info" />
        </div>
      </div>

      {/* Revenue Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-teal-500 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <FaMoneyBillAlt className="text-4xl text-teal-500" />
          <div className="text-xl font-semibold text-gray-700">Total Revenue</div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-2xl font-bold">${stats.total_revenue}</p>
          <ProgressBar now={(stats.total_revenue / 100000) * 100} variant="info" />
        </div>
      </div>

      {/* Rejected Candidates Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-500 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <FaTimesCircle className="text-4xl text-red-500" />
          <div className="text-xl font-semibold text-gray-700">Rejected Candidates</div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-2xl font-bold">{stats.rejected_candidates}</p>
          <ProgressBar now={(stats.rejected_candidates / stats.total_candidates) * 100} variant="danger" />
        </div>
      </div>

      {/* Interview Success Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-teal-600 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <FaChartBar className="text-4xl text-teal-600" />
          <div className="text-xl font-semibold text-gray-700">Successful Interviews</div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-2xl font-bold">{stats.successful_interviews}</p>
          <ProgressBar now={(stats.successful_interviews / stats.total_interviews) * 100} variant="success" />
        </div>
      </div>

      {/* Help Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-orange-500 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <FaHandsHelping className="text-4xl text-orange-500" />
          <div className="text-xl font-semibold text-gray-700">Offers Pending</div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-2xl font-bold">{stats.pending_offers}</p>
          <ProgressBar now={(stats.pending_offers / stats.total_offers) * 100} variant="warning" />
        </div>
      </div>

    </div>
  );
};

export default Layout;
