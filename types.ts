
export type ToolType = 'docs' | 'sheets' | 'slides' | 'data' | 'drawings' | 'video' | 'dashboard';

export interface RecentFile {
  id: string;
  name: string;
  type: ToolType;
  lastOpened: string;
  owner: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface AppState {
  currentTool: ToolType;
  darkMode: boolean;
  user: {
    name: string;
    email: string;
    avatar: string;
  } | null;
}
