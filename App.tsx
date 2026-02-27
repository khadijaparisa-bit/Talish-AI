
import React, { useState } from 'react';
import { TOOLS } from './constants';
import Dashboard from './components/Dashboard';
import AIAssistant from './components/AIAssistant';
import { LayoutDashboard, Settings, Menu, X, LogOut } from 'lucide-react';
import { ToolType } from './types';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolType>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    if (activeTool === 'dashboard') {
      return <Dashboard onToolSelect={setActiveTool} />;
    }
    
    const tool = TOOLS.find(t => t.id === activeTool);
    if (!tool) return null;

    return (
      <div className="flex-1 p-4 md:p-8 overflow-y-auto bg-gray-50 h-full">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 h-full flex flex-col overflow-hidden">
          <div className="h-16 border-b border-gray-100 flex items-center px-6 bg-gray-50/50">
             <span className={`font-semibold text-lg flex items-center gap-2 ${tool.color.replace('bg-', 'text-')}`}>
                {tool.icon} {tool.name}
             </span>
             <div className="ml-auto flex items-center gap-2">
                <div className="px-3 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-500">
                  Autosaved
                </div>
             </div>
          </div>
          <div className="flex-1 flex items-center justify-center flex-col gap-6 p-8">
             <div className={`p-8 rounded-full bg-opacity-10 ${tool.color.replace('bg-', 'bg-')} ${tool.color.replace('bg-', 'text-')}`}>
                {React.cloneElement(tool.icon as React.ReactElement, { className: "w-12 h-12" })}
             </div>
             <div className="text-center max-w-md">
               <h3 className="text-xl font-bold text-gray-900 mb-2">{tool.name} Workspace</h3>
               <p className="text-gray-500">
                 This is a placeholder for the {tool.name} application interface. 
                 The AI Assistant is available to help you with tasks in this context.
               </p>
             </div>
          </div>
        </div>
      </div>
    );
  };

  const currentToolName = activeTool === 'dashboard' ? 'Dashboard' : TOOLS.find(t => t.id === activeTool)?.name || 'App';

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-20 md:hidden backdrop-blur-sm" 
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:relative z-30 w-72 h-full bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="h-20 flex items-center px-6 border-b border-gray-100">
           <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
             Infinity
           </div>
           <button onClick={() => setIsSidebarOpen(false)} className="ml-auto md:hidden text-gray-400 hover:text-gray-600">
             <X size={24} />
           </button>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto no-scrollbar">
          <button
            onClick={() => { setActiveTool('dashboard'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeTool === 'dashboard' 
                ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <LayoutDashboard size={20} className={activeTool === 'dashboard' ? 'text-indigo-600' : 'text-gray-400'} />
            Dashboard
          </button>

          <div className="pt-6 pb-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
            Productivity Apps
          </div>

          {TOOLS.map(tool => (
            <button
              key={tool.id}
              onClick={() => { setActiveTool(tool.id); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTool === tool.id 
                  ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className={activeTool === tool.id ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}>
                {tool.icon}
              </span>
              {tool.name.replace('Infinity ', '')}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            <Settings size={20} className="text-gray-400" />
            Settings
          </button>
          <div className="mt-4 flex items-center gap-3 px-2 p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors border border-transparent hover:border-gray-100">
             <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-md ring-2 ring-white">
               AD
             </div>
             <div className="flex-1 min-w-0">
               <p className="text-sm font-semibold text-gray-900 truncate">Alex Doe</p>
               <p className="text-xs text-gray-500 truncate">alex@infinity.microsoft</p>
             </div>
             <LogOut size={16} className="text-gray-400" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-gray-50 relative">
        <header className="md:hidden h-16 bg-white border-b border-gray-200 flex items-center px-4 justify-between shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Menu size={24} />
            </button>
            <span className="font-semibold text-gray-900">{currentToolName}</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
            AD
          </div>
        </header>
        
        {renderContent()}
      </main>

      <AIAssistant context={`User is currently in ${currentToolName}.`} />
    </div>
  );
};

export default App;
