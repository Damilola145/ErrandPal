import { User, Errand, Message, Review, UserRole } from "../types";
import { ErrandApplicant } from '@/components/errands/ErrandApplicantsList';

// Mock Users
export const mockUsers: User[] = [
{
  id: "user1",
  name: "Alex Johnson",
  email: "alex@example.com",
  role: "requester",
  avatar: "https://ui.shadcn.com/avatars/01.png",
  location: {
    lat: 40.7128,
    lng: -74.0060,
    address: "New York, NY"
  },
  rating: 4.8,
  joinedDate: new Date(2023, 1, 15),
  completedErrands: 0
},
{
  id: "user2",
  name: "Sam Wilson",
  email: "sam@example.com",
  role: "runner",
  avatar: "https://ui.shadcn.com/avatars/02.png",
  location: {
    lat: 40.7148,
    lng: -74.0068,
    address: "New York, NY"
  },
  rating: 4.9,
  joinedDate: new Date(2023, 0, 5),
  completedErrands: 47
},
{
  id: "user3",
  name: "Jamie Lee",
  email: "jamie@example.com",
  role: "both",
  avatar: "https://ui.shadcn.com/avatars/03.png",
  location: {
    lat: 40.7120,
    lng: -74.0050,
    address: "New York, NY"
  },
  rating: 4.6,
  joinedDate: new Date(2023, 2, 20),
  completedErrands: 18
},
{
  id: "user4",
  name: "Taylor Swift",
  email: "taylor@example.com",
  role: "requester",
  avatar: "https://ui.shadcn.com/avatars/04.png",
  location: {
    lat: 34.0522,
    lng: -118.2437,
    address: "Los Angeles, CA"
  },
  rating: 4.7,
  joinedDate: new Date(2023, 3, 10),
  completedErrands: 0
},
{
  id: "user5",
  name: "Damilola Olonitola",
  email: "damilolaolonitola807@gmail.com",
  role: "runner",
  avatar: "https://ui.shadcn.com/avatars/05.png",
  location: {
    lat: 34.0530,
    lng: -118.2430,
    address: "Los Angeles, CA"
  },
  rating: 5.0,
  joinedDate: new Date(2022, 11, 15),
  completedErrands: 128
}];


// Mock Errands
export const mockErrands: Errand[] = [
{
  id: "errand1",
  title: "Grocery Shopping",
  description: "Need someone to pick up groceries from Whole Foods. List will be provided.",
  category: "Shopping",
  location: {
    lat: 40.7128,
    lng: -74.0060,
    address: "420 Park Ave, New York, NY"
  },
  payment: 25,
  status: "open",
  urgency: "medium",
  requester: {
    id: "user1",
    name: "Alex Johnson",
    avatar: "https://ui.shadcn.com/avatars/01.png",
    rating: 4.8
  },
  createdAt: new Date(2023, 5, 10, 14, 30)
},
{
  id: "errand2",
  title: "Package Pickup",
  description: "Need someone to pick up a package from the post office and deliver it to my address.",
  category: "Delivery",
  location: {
    lat: 40.7200,
    lng: -74.0100,
    address: "123 Main St, New York, NY"
  },
  payment: 15,
  status: "assigned",
  urgency: "high",
  requester: {
    id: "user1",
    name: "Alex Johnson",
    avatar: "https://ui.shadcn.com/avatars/01.png",
    rating: 4.8
  },
  runner: {
    id: "user2",
    name: "Sam Wilson",
    avatar: "https://ui.shadcn.com/avatars/02.png",
    rating: 4.9
  },
  createdAt: new Date(2023, 5, 11, 9, 15),
  deadline: new Date(2023, 5, 11, 17, 0)
},
{
  id: "errand3",
  title: "Dog Walking",
  description: "Need someone to walk my dog for 30 minutes this afternoon.",
  category: "Pet Care",
  location: {
    lat: 40.7150,
    lng: -74.0080,
    address: "789 Oak St, New York, NY"
  },
  payment: 20,
  status: "open",
  urgency: "low",
  requester: {
    id: "user4",
    name: "Taylor Swift",
    avatar: "https://ui.shadcn.com/avatars/04.png",
    rating: 4.7
  },
  createdAt: new Date(2023, 5, 10, 18, 45),
  deadline: new Date(2023, 5, 11, 16, 0)
},
{
  id: "errand4",
  title: "Ikea Furniture Assembly",
  description: "Need help assembling a bookshelf and desk from Ikea.",
  category: "Home Services",
  location: {
    lat: 34.0522,
    lng: -118.2437,
    address: "456 Hollywood Blvd, Los Angeles, CA"
  },
  payment: 60,
  status: "open",
  urgency: "medium",
  requester: {
    id: "user4",
    name: "Taylor Swift",
    avatar: "https://ui.shadcn.com/avatars/04.png",
    rating: 4.7
  },
  createdAt: new Date(2023, 5, 9, 10, 0),
  deadline: new Date(2023, 5, 12, 19, 0)
},
{
  id: "errand5",
  title: "Laundry Pickup & Delivery",
  description: "Need someone to pick up my laundry from the cleaners and deliver it to my apartment.",
  category: "Delivery",
  location: {
    lat: 34.0530,
    lng: -118.2450,
    address: "789 Sunset Blvd, Los Angeles, CA"
  },
  payment: 18,
  status: "completed",
  urgency: "medium",
  requester: {
    id: "user4",
    name: "Taylor Swift",
    avatar: "https://ui.shadcn.com/avatars/04.png",
    rating: 4.7
  },
  runner: {
    id: "user5",
    name: "Morgan Freeman",
    avatar: "https://ui.shadcn.com/avatars/05.png",
    rating: 5.0
  },
  createdAt: new Date(2023, 5, 8, 11, 30),
  deadline: new Date(2023, 5, 8, 18, 0)
}];

// Mock Errand Applicants
export const mockErrandApplicants: ErrandApplicant[] = [
{
  id: "app1",
  userId: "user3",
  name: "Jamie Lee",
  avatar: "https://ui.shadcn.com/avatars/03.png",
  rating: 4.6,
  completedErrands: 18,
  appliedAt: new Date(2023, 5, 10, 15, 30),
  message: "I'm available all afternoon and have experience grocery shopping for others. I have my own car for transportation.",
  status: "pending"
},
{
  id: "app2",
  userId: "user5",
  name: "Morgan Freeman",
  avatar: "https://ui.shadcn.com/avatars/05.png",
  rating: 5.0,
  completedErrands: 128,
  appliedAt: new Date(2023, 5, 10, 16, 15),
  message: "I'm in the area and can pick up the groceries immediately. I have a cooler bag for any cold items.",
  status: "pending"
},
{
  id: "app3",
  userId: "user2",
  name: "Sam Wilson",
  avatar: "https://ui.shadcn.com/avatars/02.png",
  rating: 4.9,
  completedErrands: 47,
  appliedAt: new Date(2023, 5, 9, 11, 45),
  message: "I can help assemble your Ikea furniture. I've done many Ikea projects before and have my own tools.",
  status: "pending"
}];


// Mock Messages
export const mockMessages: Message[] = [
{
  id: "msg1",
  senderId: "user1",
  recipientId: "user2",
  content: "Hi, I wanted to check if you're still planning to pick up my package today?",
  timestamp: new Date(2023, 5, 11, 10, 30),
  read: true,
  errandId: "errand2"
},
{
  id: "msg2",
  senderId: "user2",
  recipientId: "user1",
  content: "Yes, I'm heading to the post office in about 30 minutes.",
  timestamp: new Date(2023, 5, 11, 10, 35),
  read: true,
  errandId: "errand2"
},
{
  id: "msg3",
  senderId: "user1",
  recipientId: "user2",
  content: "Great! The package slip is at the front desk. Let me know if you need anything else.",
  timestamp: new Date(2023, 5, 11, 10, 40),
  read: false,
  errandId: "errand2"
},
{
  id: "msg4",
  senderId: "user4",
  recipientId: "user5",
  content: "Thanks for completing the laundry delivery! Everything arrived perfectly.",
  timestamp: new Date(2023, 5, 8, 19, 15),
  read: true,
  errandId: "errand5"
},
{
  id: "msg5",
  senderId: "user5",
  recipientId: "user4",
  content: "You're welcome! Happy to help anytime.",
  timestamp: new Date(2023, 5, 8, 19, 30),
  read: true,
  errandId: "errand5"
}];


// Mock Reviews
export const mockReviews: Review[] = [
{
  id: "review1",
  errandId: "errand5",
  reviewerId: "user4",
  revieweeId: "user5",
  rating: 5,
  comment: "Morgan was punctual and handled my laundry with care. Excellent service!",
  timestamp: new Date(2023, 5, 8, 20, 0)
},
{
  id: "review2",
  errandId: "errand5",
  reviewerId: "user5",
  revieweeId: "user4",
  rating: 5,
  comment: "Taylor was very communicative and provided clear instructions. Great requester!",
  timestamp: new Date(2023, 5, 8, 20, 15)
}];

// Applicant functions
export const getErrandApplicants = (errandId: string): Promise<ErrandApplicant[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Filter applicants for the specific errand
      // For now we'll just return mockups for errand1 and errand4
      if (errandId === "errand1") {
        resolve([mockErrandApplicants[0], mockErrandApplicants[1]]);
      } else if (errandId === "errand4") {
        resolve([mockErrandApplicants[2]]);
      } else {
        resolve([]);
      }
    }, 600);
  });
};

export const applyForErrand = (errandId: string, userId: string, message: string): Promise<ErrandApplicant> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Find the user
      const user = mockUsers.find((u) => u.id === userId);
      if (!user) {
        throw new Error("User not found");
      }

      // Create a new applicant
      const newApplicant: ErrandApplicant = {
        id: `app${mockErrandApplicants.length + 1}`,
        userId: user.id,
        name: user.name,
        avatar: user.avatar,
        rating: user.rating,
        completedErrands: user.completedErrands,
        appliedAt: new Date(),
        message,
        status: "pending"
      };

      // Add to mock applicants
      mockErrandApplicants.push(newApplicant);
      resolve(newApplicant);
    }, 700);
  });
};

export const updateApplicantStatus = (
applicantId: string,
status: 'accepted' | 'rejected')
: Promise<ErrandApplicant> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const applicantIndex = mockErrandApplicants.findIndex((a) => a.id === applicantId);
      if (applicantIndex === -1) {
        reject(new Error("Applicant not found"));
        return;
      }

      const updatedApplicant = {
        ...mockErrandApplicants[applicantIndex],
        status
      };

      mockErrandApplicants[applicantIndex] = updatedApplicant;
      resolve(updatedApplicant);
    }, 700);
  });
};

// Simulate API calls

// Auth functions
export const loginUser = (email: string, password: string): Promise<User | null> => {
  return new Promise(() => {
    setTimeout(() => {
      const user = mockUsers.find((u) => u.email === email && (password === ""));
      if (!user) {
        throw new Error('Invalid email or password');
      }
      if (!user.isVerified && password !== '') {
        throw new Error('Please verify your email');
      }

      return user;
    }, 800);
  });
};

export const registerUser = (userData: Partial<User> & {password: string;}): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser: User = {
        id: `user${mockUsers.length + 1}`,
        name: userData.name || "",
        email: userData.email || "",
        role: userData.role || "both",
        password: userData.password || undefined,
        rating: 0,
        joinedDate: new Date(),
        completedErrands: 0,
      };

      // In a real app, we would save this user to a database
      mockUsers.push(newUser);
      resolve (newUser);
    }, 800);
  });
};

// Errand functions
export const getErrands = (filters?: {
  status?: Errand['status'];
  category?: string;
  userId?: string;
  userRole?: 'requester' | 'runner';
}): Promise<Errand[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredErrands = [...mockErrands];

      if (filters) {
        if (filters.status) {
          filteredErrands = filteredErrands.filter((e) => e.status === filters.status);
        }
        if (filters.category) {
          filteredErrands = filteredErrands.filter((e) => e.category === filters.category);
        }
        if (filters.userId && filters.userRole === 'requester') {
          filteredErrands = filteredErrands.filter((e) => e.requester.id === filters.userId);
        }
        if (filters.userId && filters.userRole === 'runner') {
          filteredErrands = filteredErrands.filter((e) => e.runner?.id === filters.userId);
        }
      }

      resolve(filteredErrands);
    }, 800);
  });
};

export const getErrandById = (id: string): Promise<Errand | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const errand = mockErrands.find((e) => e.id === id);
      resolve(errand || null);
    }, 500);
  });
};

export const createErrand = (errandData: Partial<Errand>): Promise<Errand> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newErrand: Errand = {
        id: `errand${mockErrands.length + 1}`,
        title: errandData.title || "",
        description: errandData.description || "",
        category: errandData.category || "Other",
        location: errandData.location || {
          lat: 0,
          lng: 0,
          address: ""
        },
        payment: errandData.payment || 0,
        status: "open",
        urgency: errandData.urgency || "medium",
        requester: errandData.requester || {
          id: "",
          name: "",
          rating: 0
        },
        createdAt: new Date()
      };

      mockErrands.push(newErrand);
      resolve(newErrand);
    }, 800);
  });
};

export const updateErrandStatus = (id: string, status: Errand['status'], runnerId?: string): Promise<Errand | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const errandIndex = mockErrands.findIndex((e) => e.id === id);
      if (errandIndex === -1) {
        resolve(null);
        return;
      }

      const updatedErrand = { ...mockErrands[errandIndex], status };

      if (status === 'assigned' && runnerId) {
        const runner = mockUsers.find((u) => u.id === runnerId);
        if (runner) {
          updatedErrand.runner = {
            id: runner.id,
            name: runner.name,
            avatar: runner.avatar,
            rating: runner.rating
          };
        }
      }

      mockErrands[errandIndex] = updatedErrand;
      resolve(updatedErrand);
    }, 800);
  });
};

// Message functions
export const getMessages = (userId: string, errandId?: string): Promise<Message[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredMessages = mockMessages.filter(
        (m) => m.senderId === userId || m.recipientId === userId
      );

      if (errandId) {
        filteredMessages = filteredMessages.filter((m) => m.errandId === errandId);
      }

      resolve(filteredMessages);
    }, 600);
  });
};

export const sendMessage = (messageData: Partial<Message>): Promise<Message> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newMessage: Message = {
        id: `msg${mockMessages.length + 1}`,
        senderId: messageData.senderId || "",
        recipientId: messageData.recipientId || "",
        content: messageData.content || "",
        timestamp: new Date(),
        read: false,
        errandId: messageData.errandId
      };

      mockMessages.push(newMessage);
      resolve(newMessage);
    }, 500);
  });
};

// Review functions
export const getReviews = (userId: string): Promise<Review[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userReviews = mockReviews.filter(
        (r) => r.revieweeId === userId
      );
      resolve(userReviews);
    }, 600);
  });
};

export const createReview = (reviewData: Partial<Review>): Promise<Review> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newReview: Review = {
        id: `review${mockReviews.length + 1}`,
        errandId: reviewData.errandId || "",
        reviewerId: reviewData.reviewerId || "",
        revieweeId: reviewData.revieweeId || "",
        rating: reviewData.rating || 0,
        comment: reviewData.comment || "",
        timestamp: new Date()
      };

      mockReviews.push(newReview);
      resolve(newReview);
    }, 700);
  });
};

// User functions
export const getUserById = (id: string): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUsers.find((u) => u.id === id);
      resolve(user || null);
    }, 500);
  });
};

export const updateUserProfile = (id: string, updatedData: Partial<User>): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userIndex = mockUsers.findIndex((u) => u.id === id);
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      const updatedUser = { ...mockUsers[userIndex], ...updatedData };
      mockUsers[userIndex] = updatedUser;
      return (updatedUser);
    }, 800);
  });
};

// Helper functions for getting current location
export const getCurrentLocation = (): Promise<{lat: number;lng: number;address: string;}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock getting user's location
      resolve({
        lat: 40.7128,
        lng: -74.0060,
        address: "New York, NY"
      });
    }, 1000);
  });
};

// Categories
export const errandCategories = [
"Shopping",
"Delivery",
"Home Services",
"Pet Care",
"Tech Help",
"Food Pickup",
"Cleaning",
"Moving Help",
"Yard Work",
"Other"];



let verificationCodes: { [email: string]: string } = {}; // [ADDED]: Mock storage for codes

export async function sendVerificationEmail(email: string): Promise<void> {
  const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
  verificationCodes[email] = code;
  console.log(`Verification code for ${email}: ${code}`); // Simulate sending (log to console)
  // In real app: Use Nodemailer/SendGrid to email the code
}

export async function verifyEmailCode(email: string, code: string): Promise<boolean> {
  const storedCode = verificationCodes[email];
  if (storedCode === code) {
    delete verificationCodes[email]; // Clear after verification
    // Update user in mockUsers: find user by email and set isVerified = true
    const user = mockUsers.find(u => u.email === email);
    if (user) {
      user.isVerified = true;
    }
    return true;
  }
  return false;
}

export async function resendVerificationEmail(email: string): Promise<void> {
  return sendVerificationEmail(email); // Reuse send function
}

/*
// Update registerUser to include isVerified: false for new users
export async function registerUser(userData: Partial<User> & { password: string }) {
  // ... existing logic
  const newUser = { ...userData, isVerified: false, googleId: userData.googleId }; // [ADDED]
  // ...
}*/

/*

// Update loginUser to check isVerified
export async function loginUser(email: string, password: string) {
  // ... existing logic
  const user = mockUsers.find(u => u.email === email && (password === "" || u.password === password)); // Handle Google (empty password)
  if (user && !user.isVerified && password !== "") { // Don't require for Google if already verified
    return null;
  }
  return user;
}*/
