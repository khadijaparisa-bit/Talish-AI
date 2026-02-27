
import React from 'react';
import { 
  FileText, 
  Table, 
  Presentation, 
  Database, 
  PenTool, 
  Video, 
  LayoutDashboard, 
  Settings, 
  User,
  PlusCircle
} from 'lucide-react';
import { ToolType } from './types';

export interface ToolDefinition {
  id: ToolType;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
}

export const TOOLS: ToolDefinition[] = [
  {
    id: 'docs',
    name: 'Infinity Docs',
    description: 'Cloud-based smart documents with real-time editing.',
    icon: <FileText className="w-6 h-6" />,
    color: 'bg-blue-600',
    gradient: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'sheets',
    name: 'Infinity Sheets',
    description: 'Advanced data management and intelligent spreadsheets.',
    icon: <Table className="w-6 h-6" />,
    color: 'bg-green-600',
    gradient: 'from-green-600 to-emerald-700'
  },
  {
    id: 'slides',
    name: 'Infinity Slides',
    description: 'Impactful presentations with AI-assisted design.',
    icon: <Presentation className="w-6 h-6" />,
    color: 'bg-orange-600',
    gradient: 'from-orange-600 to-red-700'
  },
  {
    id: 'data',
    name: 'Infinity Data',
    description: 'No-code business apps and database management.',
    icon: <Database className="w-6 h-6" />,
    color: 'bg-cyan-600',
    gradient: 'from-cyan-600 to-blue-700'
  },
  {
    id: 'drawings',
    name: 'Infinity Drawings',
    description: 'Visual ideation and freehand drawing tools.',
    icon: <PenTool className="w-6 h-6" />,
    color: 'bg-red-600',
    gradient: 'from-red-600 to-pink-700'
  },
  {
    id: 'video',
    name: 'Infinity Video',
    description: 'Professional cloud video editing and production.',
    icon: <Video className="w-6 h-6" />,
    color: 'bg-purple-600',
    gradient: 'from-purple-600 to-indigo-800'
  }
];

export const RECENT_FILES = [
  { id: '1', name: 'Q4 Budget Plan', type: 'sheets', lastOpened: '2 hours ago', owner: 'You' },
  { id: '2', name: 'Product Launch Strategy', type: 'docs', lastOpened: 'Yesterday', owner: 'Jane Doe' },
  { id: '3', name: 'Client Presentation v2', type: 'slides', lastOpened: '3 days ago', owner: 'You' },
  { id: '4', name: 'Site Wireframe', type: 'drawings', lastOpened: '1 week ago', owner: 'You' },
  { id: '5', name: 'Inventory App', type: 'data', lastOpened: '2 weeks ago', owner: 'Admin' },
];
