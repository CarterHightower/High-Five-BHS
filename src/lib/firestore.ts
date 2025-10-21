import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  increment
} from 'firebase/firestore';
import { db } from './firebase';

// Teacher types
export interface Teacher {
  id: string;
  name: string;
  email: string;
  slug: string;
  averageRating: number;
  totalReviews: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  teacherId: string;
  userId: string;
  userName: string;
  rating: number;
  course: string;
  gradeLevel: string;
  period: string;
  grade: string;
  body: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Teacher functions
export async function getAllTeachers(): Promise<Teacher[]> {
  try {
    const teachersSnapshot = await getDocs(collection(db, 'teachers'));
    return teachersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Teacher));
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return [];
  }
}

export async function getTeacherBySlug(slug: string): Promise<Teacher | null> {
  try {
    const teachersRef = collection(db, 'teachers');
    const q = query(teachersRef, where('slug', '==', slug));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    } as Teacher;
  } catch (error) {
    console.error('Error fetching teacher by slug:', error);
    return null;
  }
}

export async function searchTeachers(searchTerm: string): Promise<Teacher[]> {
  try {
    const teachersSnapshot = await getDocs(collection(db, 'teachers'));
    const allTeachers = teachersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Teacher));
    
    // Filter teachers by name (case-insensitive)
    const filteredTeachers = allTeachers.filter(teacher =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return filteredTeachers;
  } catch (error) {
    console.error('Error searching teachers:', error);
    return [];
  }
}

// Review functions
export async function getReviewsForTeacher(teacherId: string): Promise<Review[]> {
  try {
    const reviewsRef = collection(db, 'reviews');
    const q = query(
      reviewsRef, 
      where('teacherId', '==', teacherId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Review));
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}

export async function submitReview(reviewData: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    // Add the review
    const reviewRef = await addDoc(collection(db, 'reviews'), {
      ...reviewData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // Update teacher's average rating and total reviews
    const teacherRef = doc(db, 'teachers', reviewData.teacherId);
    const teacherDoc = await getDoc(teacherRef);
    
    if (teacherDoc.exists()) {
      const teacherData = teacherDoc.data();
      const currentTotal = teacherData.totalReviews || 0;
      const currentAverage = teacherData.averageRating || 0;
      
      // Calculate new average
      const newTotal = currentTotal + 1;
      const newAverage = ((currentAverage * currentTotal) + reviewData.rating) / newTotal;
      
      await updateDoc(teacherRef, {
        totalReviews: newTotal,
        averageRating: Math.round(newAverage * 10) / 10, // Round to 1 decimal
        updatedAt: serverTimestamp(),
      });
    }

    return reviewRef.id;
  } catch (error) {
    console.error('Error submitting review:', error);
    throw error;
  }
}

export async function getUserReviews(userId: string): Promise<Review[]> {
  try {
    const reviewsRef = collection(db, 'reviews');
    const q = query(
      reviewsRef, 
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Review));
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    return [];
  }
}
