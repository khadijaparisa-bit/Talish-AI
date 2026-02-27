
import React from 'react';
import { TOOLS, RECENT_FILES } from '../constants';
import { Plus, Search, MoreVertical, Clock } from 'lucide-react';
import { ToolType } from '../types';

interface DashboardProps {
  onToolSelect: (toolId: ToolType) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onToolSelect }) => {
  return (
    <div className="flex-1 h-full overflow-y-auto bg-gray-50/50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Good Morning, Alex</h1>
            <p className="text-gray-500 mt-2 text-lg">Ready to create something amazing today?</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
             <div className="relative flex-1 md:w-80 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-indigo-600 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search files, tools..." 
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all shadow-sm"
                />
             </div>
             <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-sm hover:shadow-indigo-200 font-medium active:scale-95">
               <Plus size={20} />
               <span className="hidden sm:inline">Create</span>
             </button>
          </div>
        </header>

        {/* Quick Launch Grid */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 px-1">Quick Launch</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {TOOLS.map((tool) => (
              <button
                key={tool.id}
                onClick={() => onToolSelect(tool.id)}
                className="flex flex-col items-center gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-indigo-500/5 hover:border-indigo-100 transition-all group text-left h-full"
              >
                <div className={`w-14 h-14 rounded-xl ${tool.gradient} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {tool.icon}
                </div>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-indigo-700 text-center leading-tight">
                  {tool.name.replace('Infinity ', '')}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Recent Files Table */}
        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-lg font-semibold text-gray-900">Recent Files</h2>
            <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700 hover:underline">View All</button>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[40%]">Name</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[20%]">Owner</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[20%]">Last Opened</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right w-[10%]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {RECENT_FILES.map((file) => {
                    const tool = TOOLS.find(t => t.id === file.type);
                    return (
                      <tr key={file.id} className="hover:bg-indigo-50/30 transition-colors group cursor-pointer">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <div className={`p-2.5 rounded-lg ${tool?.color} bg-opacity-10 text-${tool?.color.replace('bg-', '')} flex-shrink-0`}>
                              {React.cloneElement(tool?.icon as React.ReactElement, { size: 18 })}
                            </div>
                            <span className="font-medium text-gray-900 group-hover:text-indigo-700 transition-colors">{file.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                           <div className="flex items-center gap-2">
                             <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] text-gray-600 font-bold">
                               {file.owner.charAt(0)}
                             </div>
                             <span className="text-sm text-gray-600">{file.owner}</span>
                           </div>
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-500">
                          <div className="flex items-center gap-1.5">
                            <Clock size={14} className="text-gray-400" />
                            {file.lastOpened}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors">
                            <MoreVertical size={18} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
