export type UserRole = 'requester' | 'runner' | 'both';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  about?: string;
  phone?:string;
  avatar?: string;
  password?: string
  googleId?: string; // [ADDED]: For Google OAuth
  isVerified?: boolean; // [ADDED]: For email verification
  address?:string;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  rating: number;
  joinedDate: Date;
  completedErrands: number;
}

export interface Errand {
  id: string;
  title: string;
  description: string;
  category: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  payment: number;
  status: 'open' | 'assigned' | 'in-progress' | 'completed' | 'cancelled';
  urgency: 'low' | 'medium' | 'high';
  requester: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
  };
  runner?: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
  };
  createdAt: Date;
  deadline?: Date;
}

export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: Date;
  read: boolean;
  errandId?: string;
}

export interface Review {
  id: string;
  errandId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number;
  comment: string;
  timestamp: Date;
}

export interface ErrandApplicant {
  id: string;
  userId: string;
  name: string;
  avatar?: string;
  rating: number;
  completedErrands: number;
  appliedAt: Date;
  message?: string;
  status: 'pending' | 'accepted' | 'rejected';
}